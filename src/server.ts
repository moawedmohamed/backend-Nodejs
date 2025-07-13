import type { Request, Response } from "express";
import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { Product } from "./types/product";
import ProductController from "./controllers/productController";
import ProductsService from "./services/productsService";
const app = express();
app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.render('index',)
})


// ** if you want to make the custom header use this method
// app.use(express.json({
//     // type:"custom/header"
// }));

app.use(express.json());
// ** Endpoint (products)
const fakeProducts = generateFakeData();

const productsService = new ProductsService(fakeProducts);
const productController = new ProductController(productsService)
console.log(productController)


app.get("/products", (req, res) => productController.getProduct(req, res));

app.get("/products/:id", (req, res) => productController.getProductByID(req, res));
// ** Post Method
app.post("/products", (req, res) => productController.createProduct(req, res));

// ** Patch Method
app.patch("/products/:id", (req, res) => productController.updateProduct(req, res));

// ** Delete Method
app.delete('/products/:id', (req, res) => productController.deleteProduct(req, res))
const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(` the server running on http://localhost:${PORT}`);
});
