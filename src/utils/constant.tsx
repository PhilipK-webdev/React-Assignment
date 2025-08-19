import type { ProductType } from "../types/ProductType";

export const MAX_DECRIPTION = 200;
export const MAX_NAME = 30;
export const MIN_PRICE = 1;
export const MOCK_PRODUCTS: ProductType[] = [
  {
    ID: 1,
    Name: "Asus",
    Price: 100,
    Description: "Asus Leptop",
    CreationDate: new Date(),
  },
  {
    ID: 2,
    Name: "Mac",
    Price: 1000,
    Description: "Mac Leptop",
    CreationDate: new Date(),
  },
  {
    ID: 3,
    Name: "Hp",
    Price: 100,
    Description: "Hp Leptop",
    CreationDate: new Date(),
  },
  {
    ID: 4,
    Name: "Dell",
    Price: 1000,
    Description: "Dell Leptop",
    CreationDate: new Date(),
  },
  {
    ID: 5,
    Name: "Google",
    Price: 100,
    CreationDate: new Date(),
  },
];
