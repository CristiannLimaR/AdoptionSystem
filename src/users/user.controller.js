import { response, request } from "express";
import { hash, verify} from "argon2";
import User from "./user.model.js";

export const getUsers = async (req = request, res = response) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(offset)).limit(Number(limit)),
    ]);

    res.status(200).json({
      success: true,
      total,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error al obtener usuarios",
      error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      succes: true,
      user,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      msg: "Error al obtener Usuario",
      error,
    });
  }
};

export const updateUser = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { _id, password,...data } = req.body;
    if (password) {
      data.password = await hash(password);
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      msg: "Usuario actualizado",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error al actualizar usuario",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    const authenticatedUser = req.user;

    res.status(200).json({
      success: true,
      msg: "Usuario desactivado",
      user,
      authenticatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error al desactivar usuario",
      error,
    });
  }
};

export const updatePassword = async (req, res=response) => {
  try {
    const { id } = req.params;
    const { _id, ...data } = req.body;

   const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "The user does not exist in the database",
      });
    }

    const validPassword = await verify(user.password, data.oldPassword);

    if(!validPassword){
        return res.status(400).json({
            msg: 'The password is incorrect'
        })
    }

    data.newPassword = await hash(data.newPassword);
    
    const updatedUser = await User.findByIdAndUpdate(id, {password: data.newPassword}, { new: true })
    res.status(200).json({
      success: true,
      msg: "Contraseña actualizada",
      updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error al actualizar usuario",
      error: error.message,
    });
  }
};