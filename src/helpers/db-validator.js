import Role from '../role/role.model.js'
import Usuario from '../users/user.model.js'

export const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role});

    if(!existRole){
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }


}

export const existsEmail = async (email= '') => {
    const existEmail = await Usuario.findOne({email})

    if(existEmail){
        throw new Error(`El correo ${email} ya existe en la base de datos`);
        
    }
}

