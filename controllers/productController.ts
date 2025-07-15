import { Request, Response } from "express"
import ProductsService from "../services/productsService"
import { Product } from "../types/product"

class ProductController {
    // ** properties
    constructor(private productService: ProductsService) { }
    getProduct(req: Request, res: Response) {
        const filterQuery = req.query.filter as string;
        if (filterQuery) {
            res.send(this.productService.filterFelids(filterQuery))
            return;
        }
        res.send(this.productService.findAll())
        return;
    }
    getProductByID(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            res.status(404).json({ message: "You id Must be a number!" });
            return;
        }
        const product: Product | undefined = this.productService.getProductByID(id);
        if (product) {
            res.json({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
            });
        } else {
            res.status(404).json({ message: "Product Not Found!" });
        }
    }
    createProduct(req: Request, res: Response) {
        const productBody = req.body;
        this.productService.createProduct(productBody);
        res.status(201).send({
            id: this.productService.findAll().length + 1,
            title: productBody.title,
            price: productBody.price,
            description: productBody.description,
        });
    }
    updateProduct(req: Request, res: Response) {
        const productId = +req.params.id;
        if (isNaN(productId)) {
            res.status(404).send({ message: "the product must be number!" });
            return;
        }
        const productIndex: number | undefined = this.productService.findAll().findIndex(product => product.id === productId);
        const productBody = req.body;
        if (productIndex !== -1) {
            this.productService.updateProductByIndex(productIndex, productBody)
            res.status(200).send({ message: "the product has been updated " });
            return;
        } else {
            res.status(404).send({ message: "the product not found!" });
            return;
        }
    }
    deleteProduct(req: Request, res: Response) {
        const productId = + req.params.id;
        if (isNaN(productId)) {
            res.status(404).send("the productID must be number!");
            return;
        }
        const productIndex: number | undefined = this.productService.findAll().findIndex(product => product.id === productId)
        if (productIndex !== -1) {
            const filteredProduct = this.productService.findAll().filter(product => product.id !== productId)
            res.status(200).send(filteredProduct);
        } else {
            res.status(404).send({ message: "product not found!" });

        }
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
export default ProductController