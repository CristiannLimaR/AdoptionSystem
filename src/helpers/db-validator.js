import Role from '../role/role.model.js'
import Usuario from '../users/user.model.js'

export const isRoleValid = async (role = '') => {
    const existRole = await Role.findOne({ role});

    if(!existRole){
        throw new Error(`Role ${role} does not exist in the database`)
    }


}

export const existsEmail = async (email= '') => {
    const existEmail = await Usuario.findOne({email})

    if(existEmail){
        throw new Error(`Email ${email} already exists in the database`);
        
    }
}

