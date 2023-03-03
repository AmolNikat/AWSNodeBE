import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from '../../services/products';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const products = await productService.getProducts();
    return formatJSONResponse({
      products
    });
  } catch (error) {
    return formatJSONErrorResponse(error);
  }

};

export const main = middyfy(getProductsList);
