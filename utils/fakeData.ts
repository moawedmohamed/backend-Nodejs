import { faker } from '@faker-js/faker';
import { Product } from '../types/product';

export const generateFakeData = (): Product[] => {
    return Array.from({ length: 25 }, (_, idx) => {
        return {
            id: idx + 1,
            title: faker.commerce.productName(),
            price: +faker.commerce.price({ min: 100, max: 1000 }),
            description: faker.commerce.productDescription(),
            imageUrl: faker.image.urlPicsumPhotos()
        }
    })
}