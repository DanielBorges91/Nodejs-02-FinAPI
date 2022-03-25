const express = require("express");
const {v4: uuidV4} = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!"});
  }

  customers.push({
    id: uuidV4(),
    name,
    cpf,
    statement: []
  });

  return response.status(201).json(customers);

});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if(!customer) {
    return response.status(400).json({ error: "Customer not found!"});
  }

  return response.json(customer.statement);
});

app.listen(3333, () => console.log("🚀 Server started on port 3333!"));