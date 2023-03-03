import { formatJSONErrorResponse, formatJSONNotFoundResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../services/products';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const id = event.pathParameters?.productId;
    const product = await productService.getSingleProduct(id);
    
    if(!product) {
      return formatJSONNotFoundResponse({
        error: `Product with id ${id} not found`
      });
    }
    return formatJSONResponse(product)
  } catch (error) {
    return formatJSONErrorResponse(error);
  }

};

export const main = middyfy(getProductsById);
