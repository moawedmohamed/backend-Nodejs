export interface Product1 {
    id: number,
    title: string,
    description: string,
}
export interface ProductList {
    products: Product1[]
}
export interface Product {
    id: number,
    title: string,
    price: number,
    description: string
    imageUrl: string
}
export interface ProductBody {
    title: string,
    price: number,
    description: string,
    imageUrl: string

}