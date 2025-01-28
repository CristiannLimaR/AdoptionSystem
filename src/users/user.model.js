import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is obligatory"],
  },
  email: {
    type: String,
    required: [true, "The email is obligatory"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is obligatory"],
  },
  img: {
    type: String,
  },

  phone: {
    type: String,
    minLength: 8,
    maxLength: 8,
    required: [true, "The phone is obligatory"],
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});


UserSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = id;
    return usuario;
} 

export default mongoose.model('User', UserSchema);