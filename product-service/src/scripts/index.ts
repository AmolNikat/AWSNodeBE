import * as AWS from 'aws-sdk';
import config from '../config';

AWS.config.update({
    region: config.REGION
})

const dynamo = new AWS.DynamoDB.DocumentClient();

async function fillData() {
    const result = await dynamo.batchWrite({
        RequestItems: {
            [config.PRODUCTS_TABLE]: [
                {
                    PutRequest: {
                        Item: {
                            id: '5c00e34b-d7a9-438c-b6e0-2d23f5c7e6b7',
                            title: 'Samsung Galaxy S23 5G',
                            description: 'Samsung Galaxy S23 5G (Lavender, 8GB, 256GB Storage). Designed with the planet in mind - Unbox the change you want to see in the world. Crafted with recycled glass and PET film and colored with natural dyes, each phone is tucked into a box made of recycled paper and paper-based protective film.',
                            price: 799,
                        }
                    },
                },
                {
                    PutRequest: {
                        Item: {
                            id: 'f15792a7-dbb0-4462-a883-8539a8271c1e',
                            title: 'Apple iPhone 14 Pro',
                            description: 'Dynamic Island, a magical new way to interact with iPhone 48MP Main camera for up to 4x greater resolution, Cinematic mode now in 4K Dolby Vision up to 30 fps, Action mode for smooth, steady, handheld videos',
                            price: 999,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            id: '697da67a-bf79-4e48-8d46-e179542d02ba',
                            title: 'OnePlus Nord CE 2 Lite 5G',
                            description: 'Camera: 64MP Main Camera with EIS; 2MP Depth Lens and 2MP Macro Lens; Front (Selfie) Camera: 16MP Sony IMX471',
                            price: 239,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            id: 'df2de1c4-3a01-449d-8151-5fb3809bcadb',
                            title: 'Sony Xperia 1',
                            description: 'The Xperia PRO-I redefines the camera as the world’s first smartphone with 1-inch Exmor RS image sensor and phase-detection AF[i], 4K video recording at 120fps high frame rate (a world’s first[ii]), and unique modular vlogging capabilities all packed into a smartphone. So you can be creative, wherever, whenever.',
                            price: 850,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            id: '29a991ab-bef2-4fb7-8d18-52750ccd6810',
                            title: 'OPPO A74 5G',
                            description: '6.49" Inch 16.5cm FHD+ Punch-hole Display with 2400x1080 pixels. Larger screen to body ratio of 90.5%.Side Fingerprint Sensor, Qualcomm Snapdragon 480 5G GPU 619 at 650 MHz Support 5G sim Powerful 2 GHz Octa-core processor, support LPDDR4X memory and latest UFS 2.1 gear 3 storage',
                            price: 199,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            id: 'a24c60b3-98c3-4c40-83bb-d4f190b1d5b7',
                            title: 'Redmi 11 Prime 5G',
                            description: 'Processor: MediaTek Dimensity 700 with 5G, 7nm Octa-core processor; Up to 2.2GHz, Display: 90Hz FHD+(1080x2400) AdaptiveSync Display; 16.71centimeters; 20:9 aspect ratio',
                            price: 149,
                        }
                    }
                },
            ],
            [config.STOCKS_TABLE]: [
                {
                    PutRequest: {
                        Item: {
                            product_id: '5c00e34b-d7a9-438c-b6e0-2d23f5c7e6b7',
                            count: 3,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            product_id: 'f15792a7-dbb0-4462-a883-8539a8271c1e',
                            count: 2,
                        }
                    }
                }, {
                    PutRequest: {
                        Item: {
                            product_id: '697da67a-bf79-4e48-8d46-e179542d02ba',
                            count: 4,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            product_id: 'df2de1c4-3a01-449d-8151-5fb3809bcadb',
                            count: 5,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            product_id: '29a991ab-bef2-4fb7-8d18-52750ccd6810',
                            count: 4,
                        }
                    }
                },
                {
                    PutRequest: {
                        Item: {
                            product_id: 'a24c60b3-98c3-4c40-83bb-d4f190b1d5b7',
                            count: 5,
                        }
                    }
                },

            ]
        }
    }).promise();

    return result;
};

async function invokeFillData() {
    try {
        await fillData();
        console.log('Filled data in tables successfully...!!');

    } catch (error) {
        console.log(`Error occured during fillData operation ${error}`);
    }
}


invokeFillData();
