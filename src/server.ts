import type { Request, Response } from "express";
import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { Product } from "./types/product";
import ProductController from "./controllers/productController";
import ProductsService from "./services/productsService";
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>hello express.js</h1>");
});

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


app.get("/products", (req: Request, res: Response) =>{ res.status(200).send(productController.getProduct())});
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(404).json({ message: "You id Must be a number!" });
        return;
    }
    const product: Product | undefined = fakeProducts.find((p) => p.id === id);
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
});
// ** Post Method
app.post("/products", (req, res) => {
    // console.log(req.body)
    const newProduct = req.body;
    fakeProducts.push({ id: fakeProducts.length + 1, ...newProduct });
    res.status(201).send({
        id: fakeProducts.length + 1,
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
    });
});

// ** Patch Method
app.patch("/products/:id", (req, res) => {
    const productId = +req.params.id;
    if (isNaN(productId)) {
        res.status(404).send({ message: "the product must be number!" });
        return;
    }
    const productIndex: number | undefined = fakeProducts.findIndex(product => product.id === productId);
    const productBody = req.body;
    if (productIndex !== -1) {
        fakeProducts[productIndex] = { ...fakeProducts[productIndex], ...productBody }
        res.status(200).send({ message: "the product has been updated " });
        return;
    } else {
        res.status(404).send({ message: "the product not found!" });
        return;
    }
});

// ** Delete Method
app.delete('/products/:id', (req, res) => {
    const productId = + req.params.id;
    if (isNaN(productId)) {
        res.status(404).send("the productID must be number!");
        return;
    }
    const productIndex: number | undefined = fakeProducts.findIndex(product => product.id === productId)
    if (productIndex !== -1) {
        const filteredProduct = fakeProducts.filter(product => product.id !== productId)
        res.status(200).send(filteredProduct);
    } else {
        res.status(404).send({ message: "product not found!" });

    }
})
const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(` the server running on http://localhost:${PORT}`);
});
