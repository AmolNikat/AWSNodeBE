import * as Joi from 'joi';
export const stocksSchema = Joi.object().keys({
    product_id: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }),
    count: Joi.number()
});