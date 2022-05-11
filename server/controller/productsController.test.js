import productModelSchema from "../models/addProductSchema.js";
import {
  getAllProducts,
  getProductById,
  deleteProductData,
  updateProduct,
} from "./productsController";
import productDataObject from "./__mock__/product.json";

describe("products", () => {
  beforeAll(() => {
    jest
      .spyOn(productModelSchema, "find")
      .mockReturnValue(Promise.resolve(productDataObject));

    jest
      .spyOn(productModelSchema, "findById")
      .mockReturnValue(Promise.resolve(productDataObject[0]));

    jest
      .spyOn(productModelSchema, "findByIdAndDelete")
      .mockReturnValue(Promise.resolve(productDataObject[0]));

    jest
      .spyOn(productModelSchema, "findByIdAndUpdate")
      .mockReturnValue(Promise.resolve(productDataObject));
  });

  describe("GET product", () => {
    describe("check all products are same", () => {
      it("should return products", async () => {
        const resData = await getAllProducts();
        expect(resData).toEqual(productDataObject);
      });
    });

    describe("GET product by :id", () => {
      it("should return product", async () => {
        const _id = "623bec1c1538a17fef9d708a";
        const resData = await getProductById(null, null, _id);
        expect(resData._id).toEqual(_id);
      });

      it("should not return product", async () => {
        const _id = "623bec1c1538a17ef9d708a";
        const resData = await getProductById(null, null, _id);
        expect(resData._id === _id);
      });
    });

    describe("DELETE product by :id", () => {
      it("should delete the product", async () => {
        const _id = "623bec1c1538a17fef9d708a";
        const resData = await deleteProductData(null, null, _id);
        expect(resData._id).toEqual(_id);
      });
    });

  });
});
