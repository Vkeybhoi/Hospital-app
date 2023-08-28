import Joi from 'joi';

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    // confirm_password:Joi.any().equal(Joi.ref("password")).required,
    gender: Joi.string().required(),
    specialisation: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  
});

export const options = {
    AbortController: false,
    errors:{
        wrap:{
            label: ""
        }
    }
    
}

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,12}$/).required(),
});

