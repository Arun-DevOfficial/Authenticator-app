const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../Config/Database");
const bcrypt = require("bcrypt");

// Middleware for parsing request data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Apply CORS middleware to the entire router
router.use(cors());

// Store the valid users
router.post("/register", (req, res) => {
  // Destructuring the request body
  const { username, email, password } = req.body;

  // Hash the password before storing it into the DB
  const saltRounds = 10; // Salt rounds to add unique text to the password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const values = [username, email, hash];

    // INSERT QUERY
    const sql =
      "INSERT INTO login (username, email, password) VALUES (?, ?, ?)";

    // Query Process
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ Message: "INVALID PROCESS.." });
      }
      return res.json({ Message: "User registered successfully." });
    });
  });
});

//authentication of login users..
router.post("/login", (req, res) => {
  const email = req.body.email;
  const providedPassword = req.body.password;

  // SELECT QUERY to find a user with the provided email in the "login" table
  const selectUserQuery = "SELECT * FROM login WHERE email = ?";

  // QUERY PROCESS to check if the user exists with the provided email
  db.query(selectUserQuery, [email], (err, userData) => {
    if (err) {
      // Database error
      return res.status(500).json({ Error: "Login error in server.." });
    }

    if (!userData || userData.length === 0) {
      // No user found with the provided email
      return res.status(400).json({ Error: "Invalid User" });
    }

    const hashedPassword = userData[0].password;

    // Use bcrypt to compare the provided password with the hashed password
    bcrypt.compare(providedPassword, hashedPassword, (err, result) => {
      if (err) {
        // Password compare error
        return res.status(404).json({ Error: "Password compare error" });
      }

      if (result) {
        // Passwords match, user is authenticated
        return res.status(200).json({ Message: "Login successful" });
      } else {
        // Passwords do not match
        return res.status(404).json({ Error: "Password not matched!" });
      }
    });
  });
});

//update the user details
router.post("/profile", (req, res) => {
  const { age, gender, dob, mobile } = req.body;

  if (!age || !gender || !dob || !mobile) {
    return res.status(400).json({ Message: "Missing required fields." });
  }

  //Insert query
  const sql = "INSERT INTO userinfo(Age,Gender,DoB,Mobile) VALUES (?, ?, ?,?)";

  db.query(sql, [age, gender, dob, mobile], (err) => {
    if (err) {
      return res.status(400).json({ Message: "INVALID PROCESS.." });
    }
    return res.status(200).json({ Message: "Successfully Stored Data" });
  });
});

module.exports = router;
