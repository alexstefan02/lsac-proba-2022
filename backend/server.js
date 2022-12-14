require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const Meme = require("./models/meme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("./models/user");
const multer = require('multer')

let allAccounts = [];
const errorLongDescription = {
  description: ["the field has over 2500 characters"],
};
let idUserLoggedIn = ''
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const Storage = multer.diskStorage({
  destination:'uploads',
  filename:(req,file,cb) => {
    cb(null,file.originalname);
  },
})

const upload = multer({
  storage:Storage
}).single('testImage')


app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.post("/register", async (req, res) => {
  let badRegistrationError = {},
    isError = false,
    email = req.body.email;
  try {
    if (req.body.password === undefined) {
      badRegistrationError.password = "is missing";
      isError = true;
    }
    if (email === undefined) {
      badRegistrationError.email = "is missing";
      isError = true;
    }
    if (req.body.username === undefined) {
      badRegistrationError.username = "is missing";
      isError = true;
    }
    if (isError) return res.status(400).json(badRegistrationError);
    let badSyntaxError = {},
      isSyntaxError = false;
    const passwordLen = req.body.password.length;
    const usernameLen = req.body.username.length;
    if (passwordLen < 8 || passwordLen > 32) {
      badSyntaxError.password = [
        "the field is not between 8 and 32 characters",
      ];
      isSyntaxError = true;
    }
    if (usernameLen < 8 || usernameLen > 32) {
      badSyntaxError.username = [
        "the field is not between 8 and 32 characters",
      ];
      isSyntaxError = true;
    }
    if (!email.endsWith("@stud.acs.upb.ro")) {
      badSyntaxError.email = [
        "the field must be a valid email ",
        "the field must end in @stud.acs.upb.ro",
      ];
      isSyntaxError = true;
    }
    if (isSyntaxError) return res.status(401).json(badSyntaxError);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
    allAccounts.push(newUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.post("/login", async (req, res) => {
  const user = allAccounts.find((user) => user.email === req.body.email);
  let badAuthentificationError = {},
    isError = false;
  if (req.body.email === undefined) {
    badAuthentificationError.email = "is required";
    isError = true;
  }
  if (req.body.password === undefined) {
    badAuthentificationError.password = "is required";
    isError = true;
  }
  if (isError) return res.status(400).json(badAuthentificationError);
  if (user == null) {
    return res.status(400).json({
      message: "Wrong email or password",
    });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ token: accessToken });
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});

function authentificateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({
      message: "The user should be logged in to create or modify a meme",
    });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    idUserLoggedIn = user._id
    next();
  });
}
//getting all
app.get("/memes", async (req, res) => {
  try {
    const memes = await Meme.find();
    res.json(memes);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//getting one
app.get("/memes/:id", getMeme, (req, res) => {
  console.log(res.meme);
  res.send(res.meme);
});
//creating one
app.post("/memes", authentificateToken, async (req, res) => {
  const meme = new Meme({
    description: req.body.description,
    userID: idUserLoggedIn
  });
  if (meme.description.length > 2500)
    return res.status(401).json(errorLongDescription);
  try {
    const newMeme = await meme.save();
    res.status(201).json(newMeme);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
//updating one
app.patch("/memes/:id", getMeme, authentificateToken, async (req, res) => {
  if(res.meme.userID !== idUserLoggedIn)
    return res.status(403).json({
      message: "You can modify only your memes"
    })
  if (req.body.description != null) {
    if (req.body.description.length > 2500)
      return res.status(401).json(errorLongDescription);
    res.meme.description = req.body.description;
  }
  try {
    const updatedMeme = await res.meme.save();
    res.json(updatedMeme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//deleting one
app.delete("/memes/:id", getMeme, async (req, res) => {
  try {
    await res.meme.remove();
    res.json({ message: "Deleted meme" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMeme(req, res, next) {
  let meme;
  try {
    meme = await Meme.findById(req.params.id);
    if (meme == null) {
      return res.status(404).json("Cannot find meme");
    }
  } catch (err) {
    return res.status(500).json({ message: "Cannot find meme" });
  }
  res.meme = meme;
  next();
}

app.listen(3000, () => console.log("Server has started"));
