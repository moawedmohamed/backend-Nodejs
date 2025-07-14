import { Product, ProductBody } from "../types/product";


class ProductsService {

    constructor(private products: Product[]) {
        this.products = products;
    }
    findAll(): Product[] {
        return this.products
    }
    filterFelids(filterQuery?: string) {
        console.log(filterQuery);
        if (filterQuery) {
            const propertiesToFilter = filterQuery.split(",");
            let filteredProducts = [];
            filteredProducts = this.findAll().map((product) => {
                const filteredProduct: any = {};
                propertiesToFilter.forEach((property) => {
                    if (product.hasOwnProperty(property)) {
                        filteredProduct[property] = product[property as keyof Product];
                    }
                });
                return { id: product.id, ...filteredProduct };
            });
            return filteredProducts;
        }
        return this.findAll();

    }
    getProductByID(id?: number) {
        return this.findAll().find(product => product.id === id);
    }
    createProduct(productBody: ProductBody) {
        return this.findAll().push({ id: this.findAll().length + 1, ...productBody });

    }
    updateProductByIndex(index: number, productBody: ProductBody) {
        return this.findAll()[index] = { ...this.findAll()[index], ...productBody }
    }
}
export default ProductsService;



//** filter by */
