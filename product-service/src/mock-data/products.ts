import { Product } from "src/types";

const products: Product[] = [
    {
        title: 'Samsung Galaxy S23 5G',
        description: 'Samsung Galaxy S23 5G (Lavender, 8GB, 256GB Storage). Designed with the planet in mind - Unbox the change you want to see in the world. Crafted with recycled glass and PET film and colored with natural dyes, each phone is tucked into a box made of recycled paper and paper-based protective film.',
        price: 799,
        count: 3,
        id: 'galaxy-s32'
    },
    {
        title: 'Apple iPhone 14 Pro',
        description: 'Dynamic Island, a magical new way to interact with iPhone 48MP Main camera for up to 4x greater resolution, Cinematic mode now in 4K Dolby Vision up to 30 fps, Action mode for smooth, steady, handheld videos',
        price: 999,
        count: 2,
        id: 'iphone-14-pro'
    },
    {
        title: 'OnePlus Nord CE 2 Lite 5G',
        description: 'Camera: 64MP Main Camera with EIS; 2MP Depth Lens and 2MP Macro Lens; Front (Selfie) Camera: 16MP Sony IMX471',
        price: 239,
        count: 4,
        id: 'one-plus-nord-ce2'
    },
    {
        title: 'Sony Xperia 1',
        description: 'The Xperia PRO-I redefines the camera as the world’s first smartphone with 1-inch Exmor RS image sensor and phase-detection AF[i], 4K video recording at 120fps high frame rate (a world’s first[ii]), and unique modular vlogging capabilities all packed into a smartphone. So you can be creative, wherever, whenever.',
        price: 850,
        count: 5,
        id: 'sony-xperia-1'
    },
    {
        title: 'OPPO A74 5G',
        description: '6.49" Inch 16.5cm FHD+ Punch-hole Display with 2400x1080 pixels. Larger screen to body ratio of 90.5%.Side Fingerprint Sensor, Qualcomm Snapdragon 480 5G GPU 619 at 650 MHz Support 5G sim Powerful 2 GHz Octa-core processor, support LPDDR4X memory and latest UFS 2.1 gear 3 storage',
        price: 199,
        count: 4,
        id: 'oppo-a74-5g'
    },
    {
        title: 'Redmi 11 Prime 5G',
        description: 'Processor: MediaTek Dimensity 700 with 5G, 7nm Octa-core processor; Up to 2.2GHz, Display: 90Hz FHD+(1080x2400) AdaptiveSync Display; 16.71centimeters; 20:9 aspect ratio',
        price: 149,
        count: 5,
        id: 'redmi-11-prime-5g'
    }
];

export function getProducts(): Promise<Product[]> {
    return Promise.resolve(products)
}

export function getSingleProduct(id: string): Promise<Product> {
   // return Promise.resolve(products.filter(p => p.id === id)); 
   // could do this way, 
   // but in task it is mentioned "The response from the lambda should be 1 searched product from an array of products"
   // filter function will give multiple matching product with id
    const index = products.findIndex(p => p.id === id);
    return Promise.resolve(products[index]);
}
