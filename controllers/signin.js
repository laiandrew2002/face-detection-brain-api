

const handleSignin = (bcrypt, db) => (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash)
      if(isValid){
        return db.select('*').from('users')
        .where('email','=', email)
        .then(user =>{
  
          res.json(user[0])
        })
        .catch(err => res.status(400).json('Unable to get User'))
      }else{
  
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
  
  
    // var a =req.body 
    // //need to loop through data in  database
    // if(a.email===database.users[0].email &&
    //     a.password===database.users[0].password){
    //       res.json(database.users[0])
    //   }else{
    //     res.status(400).json('error logging in')
    //   }
      
  }

  module.exports = {
      handleSignin:handleSignin
  }