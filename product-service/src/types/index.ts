export type Product  = {
    count: number;
    description: string;
    id: string;
    price: number;
    title: string;
}

export type Stock = {
    product_id: string,
    count: number
}