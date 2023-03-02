import * as Joi from 'joi';
export const productsSchema = Joi.object().keys({
    id: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }),
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number()
});