const User = require("../models/users");
const passport = require("passport");

exports.getUsers = function (req, res) {
  User.find({}).exec((errors, users) => {
    if (errors) {
      return res.status(422).send({ errors });
    }

    return res.json(users);
  });
};

exports.getCurrentUser = function (req, res, next) {
    const user = req.user;

    if(!user) {
      return res.sendStatus(422);
    }
    // Staro logovanje
    //return res.json(user);

    return res.json(user.toAuthJSON());
};

exports.register = function (req, res) {
  const registerData = req.body;

  if (!registerData.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }
  if (!registerData.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }
  if (registerData.password !== registerData.passwordConfirmation) {
    return res.status(422).json({
      errors: {
        password: "not the same",
      },
    });
  }

  const user = new User(registerData);

  return user.save((errors, savedUser) => {
    if (errors) {
      return res.status(422).json({ errors });
    }
    return res.json(savedUser);
  });
  //return res.json({status: 'ok'})
};

exports.login = function (req, res) {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }
  if (!password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate("local", (err, passportUser) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      // only for session auth-stalo logovanje
      //req.login(passportUser, function (err) {
        //if (err) {
          //next(err);
        //}
        //return res.json(passportUser);
      //});

      return res.json(passportUser.toAuthJSON())

    } else {
      return res.status(422).send({
        errors: {
          authentication: "something wrong!",
        },
      });
    }
  })(req, res);
};

exports.logout = function (req, res) {
  req.logout()
  return res.json({status: 'Session destroyed!'})
}
