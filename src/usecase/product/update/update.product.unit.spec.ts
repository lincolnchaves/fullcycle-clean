import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123","test", 123)

const input: InputUpdateProductDto = {
  id: "123",
  name: "test updated",
  price: 124
};

const MockRepository = () => {
  return {
    find: jest.fn().mockImplementation(()=> Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);
    const result = await usecase.execute(input);

    expect(result).toEqual(input)
  });
});
