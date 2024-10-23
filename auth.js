const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


const logRequet = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}]Request made to:${req.originalUrl}`);
  next();//Move on to the next phase
}


passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
  try{
// console.log("Received Credintials",USERNAME,password);
const user = await Person.findOne({username:USERNAME});

if(!user)
  return done(null,false,{message:'Incorrect username.'})

  const isPasswordMatch = await user.comparePassword(password);
  if(isPasswordMatch){
return done (null , user);
  }else{
    return done(null,false,{message:'Incorrect password.'});
  }

  }catch(err){
return done(err);
  }
}));

module.exports = passport;
