var UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.list()
   */
  list: function (req, res) {
    UserModel.find(function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }

      return res.json(Users);
    });
  },

  signup: function (req, res) {
    return res.render("signup");
  },

  /**
   * UserController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }

      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      return res.json(User);
    });
  },

  /**
   * UserController.create()
   */
  create: async function (req, res) {
    var User = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    User.password = await bcrypt.hash(User.password, salt);

    User.save(function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating User",
          error: err,
        });
      }

      return res.status(201).json(User);
    });
  },



  loginSuccess: async function (req, res) {
    if (req.session.user){
      return res.status(200).json(req.session.user);
    } else {
      return res.status(200).json("Authentication unsuccessful.");
    }
  },

  /**
   * UserController.login()
   */
  login: async function (req, res) {
    const body = req.body;

    const user = await UserModel.findOne({ username: body.username });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        session = req.session;
        session.user = user;
        res.json(user);
      } else {
        res.status(400).json({ error: "Invalid Login or Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  },

  /**
   * UserController.loginView()
   */
  profile: async function (req, res) {
    return res.status(200).json(req.session.user);
  },

  /**
   * UserController.loginView()
   */
  rating: async function (req, res) {
      
    return res.status(200).json(req.session.user);
  },

  /**
   * UserController.logout()
   */
  logout: async function (req, res) {
    req.session.destroy();
    res.status(200).json("Logged out");
  },

  /**
   * UserController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User",
          error: err,
        });
      }

      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      User.username = req.body.username ? req.body.username : User.username;
      User.email = req.body.email ? req.body.email : User.email;
      User.password = req.body.password ? req.body.password : User.password;

      User.save(function (err, User) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating User.",
            error: err,
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the User.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
