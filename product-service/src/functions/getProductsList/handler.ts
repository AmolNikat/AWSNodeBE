import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from '../../mock-data/products';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  try {
    const products = await getProducts();
    return formatJSONResponse({
      products
    });
  } catch (error) {
    return formatJSONErrorResponse(error);
  }

};

export const main = middyfy(getProductsList);
