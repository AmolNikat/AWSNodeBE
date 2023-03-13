import * as dotenv from 'dotenv';
dotenv.config();

export default {
    REGION: process.env.REGION, 
    BUCKET: process.env.BUCKET
}