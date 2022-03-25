const express = require("express");
const {v4: uuidV4} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { name, cpf } = request.body;
  const id = uuidV4();

  customers.push({
    name,
    cpf,
    id,
    statement: []
  });

  return response.status(201).send();

});

app.listen(3333, () => console.log("🚀 Server started on port 3333!"));