import * as Joi from 'joi';
export const productsSchema = Joi.object().keys({
    id: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().strict()
});