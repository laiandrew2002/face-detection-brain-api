const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '03672e2b325a49deb349cfe40287d0d7'
   });

   const handleApiCall = (req, res) => {
       app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data =>{
           res.json(data)
       })
       .catch(err => res.status(400).json('unable to work with API'))

   }

const handleImage = (req, res, db) => {
    const {id} = req.body;
    let found = false;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    }).catch(err => res.status(400).json('unable to get entries'))
  
    // database.users.forEach(user  =>{
    //   if(user.id === id){
    //       found = true;
    //       user.entries++;
    //       return res.json(user.entries);
    //   }
    // })
    
  }

  module.exports = {
      handleImage,
      handleApiCall
  }