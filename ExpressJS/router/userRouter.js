const express = require("express");
const router = express.Router();
const Joi = require("joi");

/* XXXXXXXXXXXXXXXXXXXXXX | LOCAL API | XXXXXXXXXXXXXXXXXXXXXX */
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

router.get("/", (request, response) => {
  if (request.query.reverse === "true") {
    response.send(users.reverse());
  } else {
    response.send(users);
  }
});

router.get("/:id", (req, res) => {
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

const getSchema = () => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    surname: Joi.string().min(2).max(30).required(),
    age: Joi.number().integer().max(199).required(),
  });

  return schema;
};

const getRequestBody = (request) => {
  return {
    name: request.body.name,
    surname: request.body.surname,
    age: request.body.age,
  };
};

/* XXXXXXXXXXXXXXXXXXXXXX | POST | XXXXXXXXXXXXXXXXXXXXXXXX*/

router.post("/", (request, response) => {
  //Using Joi to validate data
  const schema = getSchema();

  const schemaResult = schema.validate(request.body);
  console.log(Boolean(schemaResult.error)); // this return a value and if conditions dont provide, it return value and error area.
  console.log(schemaResult);
  if (!schemaResult.error) {
    const newUser = {
      id: users.length + 1,
      ...getRequestBody(request),
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

/* XXXXXXXXXXXXXXXXXXXXXX | PUT | XXXXXXXXXXXXXXXXXXXXXXXX*/

router.put("/:id", (request, response) => {
  // writing with id means that which user will be updated.

  const updatedUser = users.find(
    (user) => user.id === parseInt(request.params.id)
  );
  if (!updatedUser) {
    response
      .status(404)
      .send(`Couldn't find user with ${response.params.id} id number`);
  } else {
    const schema = getSchema();

    const schemaResult = schema.validate(request.body);

    if (!schemaResult.error) {
      updatedUser.name = request.body.name;
      updatedUser.surname = request.body.surname;
      updatedUser.age = request.body.age;
      response.send(updatedUser);
    } else {
      console.log("Please entry your information correctly");
      response.status(400).send(schemaResult.error.details[0].message);
    }
  }
});

/* XXXXXXXXXXXXXXXXXXXXXX | DELETE | XXXXXXXXXXXXXXXXXXXXXXXX*/

router.delete("/:id", (request, response) => {
  const deleteUser = users.find(
    (user) => user.id === parseInt(request.params.id)
  );

  if (deleteUser) {
    const indexUser = users.indexOf(deleteUser);
    users.splice(indexUser, 1); // start indexuser and delete just 1 element. So it deletes the specific element which given index
    response.send(indexUser);
  } else {
    response.status(404).send("Could not find user of " + deleteUser);
  }
});

// router değerine dışarıdan erişmemiz gerekecek o yüzden export edelim
module.exports = router;
