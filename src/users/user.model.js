import { Schema, model } from "mongoose";
const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    maxLength: [25, 'Cant be overcome 25 characters']
  },
  email: {
    type: String,
    required: [true, "The email is obligatory"],
    unique: true,
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    maxLength: [25, 'Cant be overcome 25 characters']
  },
  username: {
    type: String,
    unique: true
  },

  password: {
    type: String,
    required: [true, "The password is required"],
    minLength: 8
  },
  profilePicture: {
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
  }
},

  {
    timestamps: true, // Agregar el createAt y updateAt
    versionKey: false // No agregar el camo __v
  }



);


UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

export default model('User', UserSchema);