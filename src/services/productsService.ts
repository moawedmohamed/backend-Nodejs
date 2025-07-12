import { Product } from "../types/product";


class ProductsService {

    constructor(private products: Product[]) {
        this.products = products;
    }
    findAll(): Product[] {
        return this.products
    }
    filterFelids() {
        const filterQuery = req.query.filter as string;
        console.log(filterQuery);
        if (filterQuery) {
            const propertiesToFilter = filterQuery.split(",");
            let filteredProducts = [];
            filteredProducts = fakeProducts.map((product) => {
                const filteredProduct: any = {};
                propertiesToFilter.forEach((property) => {
                    if (product.hasOwnProperty(property)) {
                        filteredProduct[property] = product[property as keyof Product];
                    }
                });
                return { id: product.id, ...filteredProduct };
            });
            res.send(filteredProducts);
            return;
        }
        res.send(fakeProducts);
        return;

    }
}
export de