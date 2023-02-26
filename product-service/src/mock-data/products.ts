import { Product } from "src/types";

const products: Product[] = [
    {
        title: 'fds',
        description: 'fds',
        price: 23,
        count: 2,
        id: '1234'
    },
    {
        title: 'adsfbc',
        description: 'fds',
        price: 23,
        count: 2,
        id: '5678'
    },
    {
        title: '32',
        description: 's434dfa',
        price: 23,
        count: 2,
        id: '3456'
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
