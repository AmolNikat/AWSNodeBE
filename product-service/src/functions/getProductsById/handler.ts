import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getSingleProduct } from '../../mock-data/products';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log(event);
  const id = event.pathParameters?.productId;
  const product = await getSingleProduct(id);
  return formatJSONResponse({
    product
  });
};

export const main = middyfy(getProductsById);
