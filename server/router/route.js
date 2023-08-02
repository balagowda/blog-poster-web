const express = require("express");

const router = new express.Router();
const connection = require("../db/connection");
const bcrypt = require("bcryptjs");
const secretKey = process.env.KEY;
const jwt = require('jsonwebtoken');
// const multer = require('multer');

// const upload = multer();

//---------------- User Register -------------------
router.post("/register", async(req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "Fill all the feild" });
  }

  try {
    connection.query(
      `SELECT * FROM user WHERE email = ${email}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(422).json({ error: "User already registerd" });
        }
      }
    );

    if (password !== cpassword) {
      res.status(422).json({ error: "Password doesn't matches" });
    } else {
      const password1 = await bcrypt.hash(password, 12);
      const cpassword1 = await bcrypt.hash(cpassword, 12);

      connection.query(
        "INSERT INTO user SET ?",
        {
          fname: fname,
          email: email,
          password: password1,
          cpassword: cpassword1,
        },
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(422).json({ status: 422, data: err });
          } else {
            res.status(201).json({ status: 201, data: result });
          }
        }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
});


//----------- Token Generator -----------------
function generateAuthToken(user) {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign({ _id: user.cid }, secretKey);
      const query = `UPDATE user SET token = '${token}' WHERE cid=${user.cid}`;

      connection.query(query,(err, results) => {
        if (err) {
          console.log('Error while saving token to the database:', err);
          reject(err);
        } else {
          resolve(token);
        }
      });
    } catch (error) {
      console.log('Error while generating token:', error);
      reject(error);
    }
  });
}



// ------------- User login ---------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Fill all the feild" });
  }

  try {
    connection.query(
      `SELECT * FROM user WHERE email = '${email}'`,
      async(err, result) => {
        if (err) {
          res.status(422).json({ error: "User not found" });
        } 
        else if(!result){
          res.status(422).json({ error: "User not found" });
        }
        else {
          const isMatch = await bcrypt.compare(password, result[0].password);
          if (!isMatch) {
            res.status(422).json({ error: "Invalid details" });
          } else {
            const res1 = await generateAuthToken(result[0]);
            res.status(201).json({ message: result[0] ,token:res1});
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});


// ------------- User logOut ---------------------
router.post("/logout", (req, res) => {
  const { cid } = req.body;

  try {
    const query = `UPDATE user SET token = '${null}' WHERE cid=${cid}`;

    connection.query(query,(err, results) => {
      if (err) {
        console.log('Error while saving token to the database:', err);
      } else if(!results){
        res.status(422).json({ error: "User not found" });
      }
      else{
        res.status(201).json({ message: "logout success" });
      }
    });
  } catch (error) {
    console.log('Error while generating token:', error);
  }
});

// --------------- User Data ------------------

router.post("/getaccount", (req, res) => {
  const { token } = req.body;
  // console.log(token);

  try {
    const query = `SELECT * FROM user WHERE token = '${token}'`;

    connection.query(query,(err, results) => {
      if (err) {
        console.log('Error while fetching the database:', err);
      } else if(!results){
        res.status(422).json({ error: "User not found" });
      }
      else{
        res.status(201).json({ message: results });
      }
    });
  } catch (error) {
    console.log('Error while generating token:', error);
  }
});


/*---------------- post data ---------------------------*/

router.post('/post',(req,res)=>{
  const totalData = req.body;
  console.log(totalData);
});


module.exports = router;
