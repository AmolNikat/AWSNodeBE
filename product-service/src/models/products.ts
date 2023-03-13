import * as Joi from 'joi';
import { ValidationResult } from 'joi';

export type ProductValidationError = {
    valid: boolean;
    error? : any;
}

export const productsSchema = Joi.object().keys({
    id: Joi.string().guid({
        version: [
            'uuidv4'
        ]
    }).required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().strict(),
    count: Joi.number().required().strict()
});

function validateSchema(body: any): ProductValidationError {
    const error: ValidationResult = productsSchema.validate(body, {
        abortEarly: false, // when true, stops validation on the first error, otherwise returns all the errors found.
        allowUnknown: false // when true, allows object to contain unknown keys which are ignored.
    });

    // console.log('error ', error.error);

    if (error.error?.isJoi) {
       return {
            valid: false,
            error: error?.error?.details
        }
    } else {
        return {
            valid: true
        }
    }
}
export default {
    validateSchema
}