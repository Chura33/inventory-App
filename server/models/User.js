const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: [true, 'username has been taken']
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please enter a valid email  '    
    ]
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minLength: [6, "password must be at least 6 characters"],
    // maxLength: [23, "password can not exceed 23 characters"]
  },
  photo:{
    type: String,
    required: [true, "please enter a photo"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png"
  },
  phone:{
    type:String,
    default: "+234",
  },
  bio:{
    type:String,
    maxLength:[250, "Bio must not be more than 250 characters"],
    default: "bio",
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  // Add any other user-related fields as needed
}, {
  timestamps:true,
});

// encrypt password before saving to the database
userSchema.pre("save",  async function(next){
  if (!this.isModified("password")){
    return next()
  }

  // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
   next()
})
const User = mongoose.model('User', userSchema);

module.exports = User;
