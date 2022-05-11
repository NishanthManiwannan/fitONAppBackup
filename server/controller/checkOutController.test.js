import checkOutObjects from "./__mock__/checkOut.json";
import { getAllCheckOutProducts } from "./checkOutController";
import checkOutModelSchema from "../models/addCheckOutSchema";

describe("Checkout products", () => {
  beforeAll(() => {
    jest
      .spyOn(checkOutModelSchema, "find")
      .mockReturnValue(Promise.resolve(checkOutObjects));
  });

  describe("GET All checkout products", () => {
    describe("check all checkout products are same", () => {
      it("should return products", async () => {
        const resData = await getAllCheckOutProducts();
        expect(resData).toEqual(checkOutObjects);
      });
    });
  });
});
