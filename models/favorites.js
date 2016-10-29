const { MongoClient, ObjectID} = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/poi';

function saveFavorites(req,res,next) {
  MongoClient.connect(dbConnection, (err,db) => {
    if (err) return next (err);
    console.log('req.body is: ', req.body);
    db.collection('favorites')
    .insert(req.body.favorites, (insertErr, result) => {
      if (insertErr) return next (insertErr);

      db.close();
      return next();
    });
    return false;
  });
  return false;
}

function showFavorites(req,res,next) {
  MongoClient.connect(dbConnection, (err,db) => {
    if (err) return next (err);
    // console.log('getting favorites');
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

function deleteFavorites(req,res,next) {
  MongoClient.connect(dbConnection, (err,db) => {
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
  saveFavorites,
  showFavorites,
  deleteFavorites,
};




