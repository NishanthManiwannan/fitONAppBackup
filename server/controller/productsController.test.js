import productModelSchema from "../models/addProductSchema.js";
import ProductService from "./productService.js";
import { getAllProducts, getProductById } from "./productsController";
import request, { Response } from "supertest";
import app from "../app";

const productDataObject = [
  {
    _id: "623bec1c1538a17fef9d708a",
    prodectName: "Puma fit",
    sizes: ["S", "M", "L"],
    catagory: "Male Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "2500",
    qty: "20",
    brand: "Puma",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
  {
    _id: "623bec621538a17fef9d708f",
    prodectName: "Denim blue",
    sizes: ["S", "L", "XL"],
    catagory: "Male Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "3000",
    qty: "26",
    brand: "moose",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
  {
    _id: "625ceebc4454f059967a1055",
    prodectName: "kidos",
    sizes: ["S", "M"],
    catagory: "Kids Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "3000",
    qty: "15",
    brand: "niko",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
  {
    _id: "623bef4c0d203d8fd0d6fbf1",
    prodectName: "T-shirt sleeve ",
    sizes: ["L", "XL"],
    catagory: "Male Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "2000",
    qty: "34",
    brand: "Adidas",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
  {
    _id: "623beeb60d203d8fd0d6fbee",
    prodectName: "Sport t",
    sizes: ["S", "M", "L"],
    catagory: "Female Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "2000",
    qty: "23",
    brand: "Nike",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
  {
    _id: "623bee6b0d203d8fd0d6fbeb",
    prodectName: "Fit t-shirt",
    sizes: ["S", "M"],
    catagory: "Male Wears",
    discription:
      "Trending Blank Apparel. See All Trending Blank Apparel. Find the largest selection of wholesale blank apparel. Create An Account. View Our Story. Sign Up For News. Highlights: BBB Accredited Business, Multiple Payment Options Available",
    prize: "2550",
    qty: "25",
    brand: "adidas",
    imgFile:
      "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    __v: 0,
  },
];

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
        expect(resData._id).toEqual(_id);
      });
    });
  });
});
