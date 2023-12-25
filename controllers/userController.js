const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registerAdminUser = async function (req, res) {
  try {
    let data = req.body;

    // Hash the password asynchronously
    const hashedPassword = await hashAsync('123456', null, null);

    // Update the data with the hashed password
    data.password = hashedPassword;

    // Create the user in the database
    let user = await User.create(data);

    res.status(200).send({ data: user });
  } catch (error) {
    res.status(200).send({ data: undefined, message: 'An error occurred during the registration process.' });
  }
  // if (req.user) {
  //     let data = req.body;
  //     let users = await User.find({ email: data.email });

  //     if (users.length >= 1) {
  //         res.status(200).send({ data: undefined, message: 'A user with that email already exists.' });
  //     } else {
  //         bcrypt.hash('123456', null, null, async function (err, hash) {
  //             if (err) {
  //                 res.status(200).send({ data: undefined, message: 'Password encryption failed.' });
  //             } else {
  //                 data.password = hash;
  //                 let user = await User.create(data);
  //                 res.status(200).send({ data: user });
  //             }
  //         });
  //     }
  // } else {
  //     res.status(500).send({ data: undefined, message: 'ErrorToken' });
  // }
}

const loginUser = async function (req, res) {
  const data = req.body;
  const users = await User.find({ email: data.email });

  if (users.length >= 1) {
    if (users[0].state) {
      bcrypt.compare(data.password, users[0].password, async function (err, check) {
        if (check) {
          res.status(200).send({
            token: jwt.createToken(users[0]),
            user: users[0]
          });
        } else {
          res.status(200).send({ data: undefined, message: 'Incorrect password.' });
        }
      });
    } else {
      res.status(200).send({ data: undefined, message: 'Account is offline.' });
    }
  } else {
    res.status(200).send({ data: undefined, message: 'Email not found.' });
  }
}

const listAdminUsers = async function (req, res) {
  if (req.user) {
    let filter = req.params['filter'];
    let users = await User.find({
      $or: [
        { names: new RegExp(filter, 'i') },
        { lastNames: new RegExp(filter, 'i') },
        { email: new RegExp(filter, 'i') },
      ]
    });
    res.status(200).send(users);
  } else {
    res.status(500).send({ data: undefined, message: 'ErrorToken' });
  }
}

const getAdminUser = async function (req, res) {
  if (req.user) {
    let id = req.params['id'];

    try {
      let user = await User.findById({ _id: id });
      res.status(200).send(user);
    } catch (error) {
      res.status(200).send(undefined);
    }
  } else {
    res.status(500).send({ data: undefined, message: 'ErrorToken' });
  }
}

const updateAdminUser = async function (req, res) {
  if (req.user) {
    let id = req.params['id'];
    let data = req.body;
    let user = await User.findByIdAndUpdate({ _id: id }, {
      names: data.names,
      lastNames: data.lastNames,
      role: data.role,
      email: data.email
    });

    res.status(200).send(user);
  } else {
    res.status(500).send({ data: undefined, message: 'ErrorToken' });
  }
}

const changeAdminUserState = async function (req, res) {
  if (req.user) {
    let id = req.params['id'];
    let data = req.body;
    let newState = !data.state;

    let user = await User.findByIdAndUpdate({ _id: id }, {
      state: newState
    });

    res.status(200).send(user);
  } else {
    res.status(500).send({ data: undefined, message: 'ErrorToken' });
  }
}

module.exports = {
  registerAdminUser,
  loginUser,
  listAdminUsers,
  getAdminUser,
  updateAdminUser,
  changeAdminUserState
}