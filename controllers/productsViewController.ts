import ProductsService from "../services/productsService"
import { Request, Response } from "express"



export default class ProductsViewController {
    constructor(private productService: ProductsService) {
        this.renderProductList = this.renderProductList.bind(this)
        this.renderProductPage = this.renderProductPage.bind(this)
    }
    renderProductList(req: Request, res: Response) {
        res.render('products', {
            pageTitle: "View Products",
            products: this.productService.findAll(),
        })
    }
    renderProductPage(req: Request, res: Response) {
        const productId = +req.params.id
        res.render('product', {
            product: this.productService.getProductByID(productId)
        })
    }
}