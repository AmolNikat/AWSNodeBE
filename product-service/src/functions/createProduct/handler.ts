import { formatJSONBadRequestResponse, formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import productModel from '../../models/products';
import { middyfy } from '@libs/lambda';
import productService from '../../services/products';
import { v4 as uuidv4 } from 'uuid';
import schema from './schema';
import { customLogger } from 'src/utils';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    customLogger(event);
    const { body } = event;
    body.id = uuidv4();
    const product = {...body};
    const validationResult = productModel.validateSchema(body);
    if (validationResult.valid) {
    // await productService.createProduct(body as any);  // commented, as we need to implement create product with transaction.
    await productService.createProductWithTransaction(body as any);      
    return formatJSONResponse({
      product
    });
    } else {
      return formatJSONBadRequestResponse(validationResult.error)
    }
  } catch (error) {
    return formatJSONErrorResponse(error);
  }

};

export const main = middyfy(createProduct);
