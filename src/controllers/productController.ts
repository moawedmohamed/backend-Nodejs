import ProductsService from "../services/productsService"
import { Product } from "../types/product"

class ProductController {
    // ** properties
    constructor(private productService: ProductsService) { }
    getProduct() :Product[]{
        return this.productService.findAll()
    }
}
export default ProductController