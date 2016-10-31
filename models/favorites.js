// set up dependecies
const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbConnect.js');

// below function created to show saved favorites, called upon in /routes/home.js file
function showFavorites(req, res, next) {
// find all favorites for your userId
  getDB().then((db) => {
// database references the collection name 'favorites'
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

// below function created to save favorites, called upon in /routes/home.js file
function saveFavorites(req, res, next) {
// creating an empty object for the insertObj
  const insertObj = {};

// copying all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
// Adding userId to insertObj
// insertObj.favorite.userId = {};
  insertObj.favorites.userId = req.session.userId;
  getDB().then((db) => {
// database references the collection name 'favorites'
    db.collection('favorites')
      .insert(insertObj.favorites, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.saved = result;
        db.close();
        return next();
      });
    return false;
  });
  return false;
};

// below function created to delete favorites, called upon in /routes/home.js file
function deleteFavorites(req, res, next) {
  getDB().then((db) => {
// database references the collection name 'favorites'
    db.collection('favorites')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, doc) => {
      if (removeErr) return next(removeErr);

//return the data
      res.remove = doc;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

// function to edit the item
function editCity(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
      .findAndModify({ _id: ObjectID(req.params.id) }, [] /* sort */,
      { $set: req.body.city }, { new: true } /* options */, (updateError, doc) => {
        if (updateError) return next(updateError);

        // return the data
        res.updated = doc;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// function to retrieve the updated data after an edit has been made
function getCity(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
      .findOne({ _id: ObjectID(req.params.id) }, (findErr, city) => {
        if (findErr) return next(findErr);

        // return the data
        res.city = city;
        db.close();
        return next();
      });
    return false;
  });
  return false;
}

// below are function calls exported through the router when called upon
module.exports = {
  showFavorites,
  saveFavorites,
  deleteFavorites,
  editCity,
  getCity,
};
