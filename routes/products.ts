import { Router } from "express";
import { generateFakeData } from "../utils/fakeData";
import ProductsService from "../services/productsService";
import ProductController from "../controllers/productController";

const productsRouter = Router()
const fakeProducts = generateFakeData();

const productsService = new ProductsService(fakeProducts);
const { getProduct, createProduct, getProductByID, deleteProduct, updateProduct, renderProductList, renderProductPage } = new ProductController(productsService)
productsRouter.route('/').get(getProduct).post(createProduct)
productsRouter.route('/:id')
    .get(getProductByID)
    .patch(updateProduct)
    .delete(deleteProduct)
export default productsRouter;