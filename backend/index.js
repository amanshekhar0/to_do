const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const UserModel = require("./models/user.js");
const TodoModel = require("./models/totos.js")
const app = express();
app.use(express.json());
app.use(cors());


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_KEY);
  console.log("Connected to MongoDB");
}


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post("/register", (req, res) => {
  console.log(req.body);
  UserModel.create(req.body)
    .then((user) => {
      console.log(user); 
      res.send(user)
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});
app.post("/todo", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task: task })
    .then((todo) => { 
      res.json(todo); 
    })
    .catch((err) => {
      console.error(err);
      res.json(err); 
    });
});
app.get("/todo", (req, res) => {
  TodoModel.find()
    .then((todos) => {
      res.json(todos);  
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching tasks");
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("logged");
        } else {
          res.json("passoward galat hai bhai");
        }
      } else {
        res.json("no user found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send("Error logging in");
    });
});


app.get("/register", (req, res) => {
  UserModel.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});


app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Task deleted successfully");
    })
    .catch((err) => {
      console.error(err);
      res.send("Error deleting task");
    });
});


app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
