var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Client = mongoose.model('Client');
let jwt = require('express-jwt');


let auth = jwt({
  secret: process.env.CLIENT_BACKEND_SECRET
});



router.get('/API/clients/', function (req, res, next) {
  let query = Client.find();
  query.exec(function (err, clients) {
    if (err) {
      return next(err);
    }
    res.json(clients);
  });
});

router.get('/API/clients/:client', function (req, res, next) {

  Client.findById(req.params.client, function (err, clnt) {
    if (err)
      return next(err);
    res.json(clnt);
  });
});


router.post('/API/clients/', function (req, res, next) {
  let client = new Client({
    name: req.body.name,
    email: req.body.email,
    streetname: req.body.streetname,
    streetnumber: req.body.streetnumber,
    phone: req.body.phone,
    gender: req.body.gender,
    birth: req.body.birth,
    username: req.body.username,
    _id: mongoose.Types.ObjectId(),

  });
  client.save(function (err, rec) {
    if (err) {
      return next(err);
    }
    res.json(rec);
  });
});

router.post('/API/clients/:client', function (req, res, next) {
  req.client.save(function (err, rec) {
    if (err) return next(err);
  });
});

router.delete('/API/clients/:client', function (req, res) {
  Client.findByIdAndRemove(req.params.client, function (err) {
    if (err)
      res.send(err);
    else
      res.json("deleted");

  });
});

router.post('/API/checkemail', function (req, res, next) {
  Client.find({ email: req.body.email }, function(err, result) {
    if (result.length) {
      res.json({ email: 'alreadyexists' });
    } else {
      res.json({ email: 'ok' });
    }
  });
});



//   Client.findOne({ email: req.body.email }, function (err, result) {
//     if (err) {
//      return next(err);
//     } else if(!result){
//       res.json("notexists");
//     }else{
//       res.json("exists");
//     }
//   });
// });

module.exports = router;