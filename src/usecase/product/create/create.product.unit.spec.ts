import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "test",
      price: 123
    };

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  });
});
