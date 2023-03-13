import { formatJSONErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import schema from './schema';
import config from '../../config';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let body = {};
  const s3 = new AWS.S3({ region: config.REGION });
  const bucketParams = {
    Bucket: config.BUCKET,
    Prefix: 'uploaded/'
  }
  try {
    const s3Response = await s3.listObjectsV2(bucketParams).promise();
    const images = s3Response.Contents;
    body = JSON.stringify(images.filter(image => image.Size).map(image => `https://${config.BUCKET}.s3.amazonaws.com/${image.Key}`));
    return formatJSONResponse({
      body
    });
  } catch (error) {

    console.error('Error occured', error);
    return formatJSONErrorResponse(error);
  }
  
};

export const main = middyfy(importProductsFile);
