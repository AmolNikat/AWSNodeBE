import * as dotenv from 'dotenv';
dotenv.config();

export default {
    REGION: process.env.REGION,
    PRODUCTS_TABLE: process.env.PRODUCTS_TABLE,
    STOCKS_TABLE: process.env.STOCKS_TABLE
}