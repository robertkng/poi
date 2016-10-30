const { ObjectID} = require('mongodb');
const { getDB }   = require('../lib/dbConnect.js');
// const { MongoClient, ObjectID} = require('mongodb');
// const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/poi';

// function showFavorites(req,res,next) {
//   MongoClient.connect(dbConnection, (err,db) => {
//     if (err) return next (err);
//     // console.log('getting favorites');
//     db.collection('favorites')
//     .find()
//     .toArray((arrayError, data) => {
//       if (arrayError) return next(arrayError);

//       res.saved = data;
//       db.close();
//       return next();
//     });
//     return false;
//   });
//   return false;
// }

function showFavorites(req, res, next) {
  // find all favorites for your userId
  getDB().then((db) => {
    db.collection('favorites')
      .find({ userId: { $eq: req.session.userId } })
      .toArray((toArrErr, data) => {
        if(toArrErr) return next(toArrErr);
        res.saved = data;
        db.close();
        next();
      });
      return false;
  });
  return false;
}


// function saveFavorites(req,res,next) {
//   MongoClient.connect(dbConnection, (err,db) => {
//     if (err) return next (err);
//     console.log('req.body is: ', req.body);
//     db.collection('favorites')
//     .insert(req.body.favorites, (insertErr, result) => {
//       if (insertErr) return next (insertErr);

//       db.close();
//       return next();
//     });
//     return false;
//   });
//   return false;
// }

// function saveFavorites(req, res, next) {
//   // creating an empty object for the insertObj
//   const insertObj = {};

//   // copying all of req.body into insertObj
//   for(key in req.body) {
//     insertObj[key] = req.body[key];
//   }
//   // Adding userId to insertObj
//   insertObj.favorite.userId = req.session.userId;
//   getDB().then((db) => {
//     db.collection('favorites')
//       .insert(insertObj.favorite, (insertErr, result) => {
//         if (insertErr) return next(insertErr);
//         res.saved = result;
//         db.close();
//         return next();
//       });
//       return false;
//   });
//   return false;
// };

function saveFavorites(req,res,next) {
  // creating an empty object for the insertObj
  const insertObj = {};

  // copying all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
  // Adding userId to insertObj
  // insertObj.favorite.userId = {};
  insertObj.favorite.userId = req.session.userId;
    getDB().then((db) => {
    console.log(req.body.favorite);
    db.collection('favorites')
      .insert(insertObj.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.saved = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};

function deleteFavorites(req,res,next) {
  getDB().then((db) => {
    if (err) return next (err);

    db.collection('favorites')
    .findAndRemove({_id: ObjectID(req.params.id)}, (removeErr, doc) => {
      if (removeErr) return next(removeErr);

      //return the data
      res.remove = doc;
      db.close();
      return next();
    })
    return false;
  })
  return false;
}

module.exports = {
  showFavorites,
  saveFavorites,
  deleteFavorites,
};




