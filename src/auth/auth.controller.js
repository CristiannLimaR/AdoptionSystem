import bcryptjs from "bcryptjs";
import Usuario from "../users/user.model.js";
import {hash, verify} from 'argon2';
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const lowerEmail = email ? email.toLowerCase() : null;
    const lowerUsername = username ? username.toLowerCase() : null;

   const user = await Usuario.findOne({
    $or: [{email: lowerEmail}, {username, lowerUsername}]
   })

    if (!user) {
      return res.status(400).json({
        msg: "Incorrect credentials, Email does not exist in the database",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "The user does not exist in the database",
      });
    }

    const validPassword = await verify(user.password, password);


    if(!validPassword){
        return res.status(400).json({
            msg: 'The password is incorrect'
        })
    }

    const token = await generateJWT(user.id)
    re

    res.status(200).json({
        msg: 'Successful login',
        userDetails: {
          username: user.username,
          token: token,
          profilePicture: user.profilePicture
        }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server error",
      error: error.message
    });
  }
}

export const register = async (req, res) => {
 try {
  const data = req.body;
  let profilePicture = req.file ? req.filename : null;

  const encryptedPassword = await hash(data.password);
  console.log("error")
  const user = await Usuario.create({
    name: data.name,
    surname: data.surname,
    username: data.username,
    email: data.email,
    phone: data.phone,
    password: encryptedPassword,
    role: data.role,
    profilePicture
  })

  return res.status(201).json({
    msg: 'User registered successfully',
    userDetails: {
      user: user.email
    }
  })

 } catch (error) {
  console.log(error);
  return res.status(500).json({
    msg: "User registration failed",
    err: error.message
  })
 }
};
