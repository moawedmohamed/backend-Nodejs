import type { Request, Response } from "express";
import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { Product } from "./types/product";
import ProductController from "./controllers/productController";
import ProductsService from "./services/productsService";
import path from "path";
import dotenv from 'dotenv'
import ProductsViewController from "./controllers/productsViewController";
import ErrorMiddleware from "./middlewares/Error";
import NotFoundMiddleware from "./middlewares/notFound";
const app = express();

// set the dotenv config for the .env file
dotenv.config()
// ** set views and engine 
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
// * static fils 
app.use(express.static(path.join(__dirname, "public")))

// ** if you want to make the custom header use this method
// app.use(express.json({
//     // type:"custom/header"
// }));

app.use(express.json());
// ** Endpoint (products)
const fakeProducts = generateFakeData();

const productsService = new ProductsService(fakeProducts);
const productController = new ProductController(productsService);
const productsViewController = new ProductsViewController(productsService)
console.log(productController)
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/products', productsViewController.renderProductList)
app.get('/products/:id', productsViewController.renderProductPage)
app.get("/api/products", (req, res) => productController.getProduct(req, res));

app.get("/api/products/:id", (req, res) => productController.getProductByID(req, res));
// ** Post Method
app.post("/api/products", (req, res) => productController.createProduct(req, res));

// ** Patch Method
app.patch("/api/products/:id", (req, res) => productController.updateProduct(req, res));

// ** Delete Method
app.delete('/api/products/:id', (req, res) => productController.deleteProduct(req, res))
// try {

//     app.use((req, res) => {
//         res.status(404).render('notFound');
//     });
// } catch (error) {
//     console.log('the error is ' + error);

// }
// Middlewares 
app.use(NotFoundMiddleware.handle)
app.use(ErrorMiddleware.handle)
const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(` the server running on http://localhost:${PORT}`);
});
