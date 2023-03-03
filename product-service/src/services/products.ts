import * as AWS from 'aws-sdk';
import { Product } from 'src/types';
import { convertArrayToObject } from 'src/utils';
import config from '../config';

AWS.config.update({
    region: config.REGION
})

const dynamoClient = new AWS.DynamoDB.DocumentClient();

async function getProducts(): Promise<Product[]> {

    const productsResults = await dynamoClient.scan({
        TableName: config.PRODUCTS_TABLE
    }).promise();

    if (productsResults.Items.length > 0) { // if found some products then only search for stocks
        const stocksResults = await dynamoClient.scan({
            TableName: config.STOCKS_TABLE,
        }).promise();

        const stocksObject = convertArrayToObject(stocksResults.Items, 'product_id');

        const products: Product[] = productsResults.Items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            count: stocksObject[item.id]?.count
        }));
        return products;
    }

    return [];
}

async function getSingleProduct(id: string): Promise<Product> {

    const productParams = {
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': id
        },
        TableName: config.PRODUCTS_TABLE
    }

    const productResult = await dynamoClient.query(productParams).promise();

    if (productResult.Items.length > 0) { // if product found then only query for stock
        const stockParams = {
            TableName: config.STOCKS_TABLE,
            KeyConditionExpression: 'product_id = :product_id',
            ExpressionAttributeValues: {
                ':product_id': id
            },
        };

        const stockResult = await dynamoClient.query(stockParams).promise();
        const item = productResult.Items[0];
        const product: Product = {
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            count: stockResult.Items[0]?.count
        }
        return product;
    }

    return null;
}

export default {
    getProducts,
    getSingleProduct
}
