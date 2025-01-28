import bcryptjs from "bcryptjs";
import Usuario from "../users/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async () => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Credenciales incorrectas, Correo no existe en la base de datos",
      });
    }

    if (!usuario.state) {
      return res.status(400).json({
        msg: "el usuario no existe en la base de datos",
      });
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password)

    if(!validPassword){
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        })
    }

    const token = await generateJWT(usuario.id);

    res.status(200).json({
        msg: 'Login OK',
        usuario,
        token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comuniquese con el administrador",
    });
  }
};

export const register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const user = new Usuario({ name, email, password, role, phone });

  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(200).json({
    user,
  });
};
