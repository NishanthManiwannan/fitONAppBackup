import clientModelSchema from "../models/addClientDataSchema.js";
import customerDataObject from "./__mock__/customer.json";
import {
  createNewClient,
  getAllClientDetails,
} from "./authenticationController";

describe("Customers", () => {
  beforeAll(() => {
    jest
      .spyOn(clientModelSchema, "find")
      .mockReturnValue(Promise.resolve(customerDataObject));
  });

  describe("GET customers", () => {
    describe("check all customers are same", () => {
      it("should return customers", async () => {
        const resData = await getAllClientDetails();
        expect(resData).toEqual(customerDataObject);
      });
    });
  });
});
