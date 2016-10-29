const { MongoClient, ObjectID} = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/poi';

function getCity(req,res,next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next (err);
    db.collection('favorites')
    .find()
    .toArray((arrayError, data) => {
      if (arrayError) return next (arrayError);
      res.data = data;
      db.close();
      return next();
    })
    return false;
  })
  return false;
}

function saveFavorites(req,res,next) {
  MongoClient.connect(dbConnection, (err,db) => {
    if (err) return next (err);
    console.log('req.body is: ', req.body);
    db.collection('favorites')
    .insert(req.body.favorites, (insertErr, result) => {
      if (insertErr) return next (insertErr);

      // res.saved = result;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function getFavorites(req,res,next) {
  MongoClient.connect(dbConnection, (err,db) => {
    if (err) return next (err);

    db.collection('favorites')
    .find()
    .toArray((arrayError, data) => {
      if (arrayError) return next(arrayError);

      res.saved = data;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}



module.exports = {
  getCity,
  saveFavorites,
  getFavorites,
  // deleteFavorites,
};




