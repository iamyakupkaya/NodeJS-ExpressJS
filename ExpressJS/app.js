const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json()); // it is necessary to post. that means express have a body also in body have a json so split it.

const users = [
  {
    id: 1,
    name: "Yakup",
    surname: "Kaya",
    age: 27,
  },
  {
    id: 2,
    name: "Muhammed",
    surname: "Kaya",
    age: 25,
  },
  {
    id: 3,
    name: "Fatma",
    surname: "Kaya",
    age: 32,
  },
];

/* XXXXXXXXXXXXXXXXXXXXXX | GET | XXXXXXXXXXXXXXXXXXXXXX*/

app.get("/", (req, res) => {
  res.send("<h1 style='color:purple'>Welcome Home Page With Express</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1 style='color:blue'>Welcome About ME Page With Express</h1>");
});

app.get("/users", (request, response) => {
  console.log("Query:", request.query);
  if (request.query.reverse === "true") {
    response.send(users.reverse());
  } else {
    response.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  console.log("Değer");
  console.log("users: " + typeof users[1].id); //number
  console.log("params: " + typeof req.params.id); //string
  /*  res.send(
    users.filter((value) => {
      return value.id.toString() === req.params.id.toString();
    })
  ); */

  const user = users.find(
    (value) => value.id.toString() === req.params.id.toString()
  ); // this will return a value which finds first
  console.log("our user:", user);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("Could not find a user.!");
  }
});

/* XXXXXXXXXXXXXXXXXXXXXX | POST | XXXXXXXXXXXXXXXXXXXXXXXX*/

app.post("/users", (request, response) => {
  //Using Joi to validate data
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    surname: Joi.string().min(2).max(30).required(),
    age: Joi.number().integer().max(199).required(),
  });

  const schemaResult = schema.validate(request.body);
  console.log(Boolean(schemaResult.error)); // this return a value and if conditions dont provide, it return value and error area.
  console.log(schemaResult);
  if (!schemaResult.error) {
    const newUser = {
      id: users.length + 1,
      name: request.body.name,
      surname: request.body.surname,
      age: request.body.age,
    };
    if (
      users.find((user) => user.name.toString() === newUser.name.toString())
    ) {
      console.log("This user is already using");
      // can't add same user name like same id from database :)
    } else {
      users.push(newUser);
      response.send(newUser);
    }
  } else {
    console.log("Please entry your information correctly");
    response.status(400).send(schemaResult.error.details[0].message);
  }
});

app.listen(3000, () =>
  console.log("Server is listening with 3000 port number")
);
