import * as AWS from 'aws-sdk';
import { Product, Stock } from 'src/types';
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

function seperateStockFromProduct(product: Product): Stock {
    const stock: Stock = {
        product_id: product.id,
        count: product.count
    };
    delete product.count;
    return stock;
}

async function createProduct(product: Product): Promise<void> {
    const stock: Stock = seperateStockFromProduct(product);
    await dynamoClient.put({
        TableName: config.PRODUCTS_TABLE,
        Item: product
    }).promise();

    await dynamoClient.put({
        TableName: config.STOCKS_TABLE,
        Item: stock
    }).promise();
}

async function createProductWithTransaction(product: Product): Promise<void> {
    const stock: Stock = seperateStockFromProduct(product);

    await dynamoClient.transactWrite({
        TransactItems: [
            {
                Put: {
                    TableName: config.PRODUCTS_TABLE,
                    Item: product
                }
            },
            {
                Put: {
                    TableName: config.STOCKS_TABLE,
                    Item: stock
                }
            }
        ]
    }).promise();
}

export default {
    getProducts,
    getSingleProduct,
    createProduct,
    createProductWithTransaction
}
