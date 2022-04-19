export default class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async getProduct() {
    let resData = {};
    await this.productModel.find({}, (err, products) => {
      resData = products;
    });
    console.log("🚀 ~ file: productService.js ~ line 13 ~ ProductService ~ getProduct ~ resData", resData)

    return resData;
  }
}
