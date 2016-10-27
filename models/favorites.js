const { MongoClient, ObjectID} = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/poi';

function getCity(req,res,next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next (err);

    db.collection('poi')
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


module.exports = { getCity };




