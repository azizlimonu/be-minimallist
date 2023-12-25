const Customer = require('../models/customer');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/cjwt');

const registerCustomer = async function (req, res) {
  let data = req.body;
  let existingCustomer = await Customer.find({ email: data.email });
  if (existingCustomer.length >= 1) {
    res.status(200).send({ message: 'The email already exists.' });
  } else {
    bcrypt.hash(data.password, null, null, async function (err, hash) {
      if (err) {
        res.status(200).send({ message: 'Error during encryption.' });
      } else {
        data.password = hash;
        let customer = await Customer.create(data);
        res.status(200).send(customer);
      }
    });
  }
}

const loginCustomer = async function (req, res) {
  const data = req.body;
  const customers = await Customer.find({ email: data.email });

  if (customers.length >= 1) {
    if (customers[0].state) {
      bcrypt.compare(data.password, customers[0].password, async function (err, check) {
        if (check) {
          res.status(200).send({
            token: jwt.createToken(customers[0]),
            customer: customers[0]
          });
        } else {
          res.status(200).send({ data: undefined, message: 'Incorrect password.' });
        }
      });
    } else {
      res.status(200).send({ data: undefined, message: 'Account Offline.' });
    }
  } else {
    res.status(200).send({ data: undefined, message: 'Email not found.' });
  }
}

module.exports = {
  registerCustomer,
  loginCustomer
}