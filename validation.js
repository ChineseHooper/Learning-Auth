//validation
//定义一个用来判断用户输入的模版；
const Joi = require("@hapi/joi");

//Register Validation;
const registerValidation = data => {
    //定义一个验证用户输入的模版；
    const schema = Joi.object({
        name: Joi.string()
          .min(6)
          .required(),
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
    });
    return schema.validate(data);
};


const loginValidation = data => {
     //定义一个验证用户输入的模版；
     const schema = Joi.object({
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

