import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create User
export function createUser(req, res) {
  try {
    //Only admins can create another admin
    if (req.body.role === "admin") {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admin can create another admin user" });
      }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashedPassword,
      role: req.body.role || "user", // default to "user"
      isBlock: req.body.isBlock || false,
      img: req.body.img || null
    });

    newUser.save()
      .then(() => {
        res.json({ message: 'User created successfully' });
      })
      .catch((err) => {
        res.status(400).json({ message: 'Error creating user', error: err });
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Login User
export function loginUser(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          img: user.img
        },
        process.env.JWT_SECRET || "cbc-batch-five#@2025", // use .env
        { expiresIn: "7d" }

      );
      /*const token = jwt.sign(
  payload,
  process.env.JWT_SECRET || "cbc-batch-five#@2025",
  { expiresIn: "7d" } // instead of "1h"
);*/

      res.json({ message: "Login successful", token });
    })
    .catch(err => {
      console.error("Error logging in:", err);
      res.status(500).json({ message: "Error logging in", error: err.message });
    });
}

// Check Admin
export function isAdmin(req) {
  if (!req.user== null){
     return false;
}
  if (req.user.role !== 'admin') {
    return false;
  }
  return true;
}   