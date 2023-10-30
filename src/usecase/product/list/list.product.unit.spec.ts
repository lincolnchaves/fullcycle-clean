import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("123","test",123)
const product2 = new Product("124","test2",124)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product,product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list product use case", () => {
  it("should list a product", async () => {
    const productRepository = MockRepository();
    const usecase = new ListProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const result = await usecase.execute(input);

    expect(result.products.length).toEqual(2);
    expect(result.products[0].id).toEqual("123");
    expect(result.products[0].name).toEqual("test");
    expect(result.products[0].price).toEqual(123);
    expect(result.products[1].id).toEqual("124");
    expect(result.products[1].name).toEqual("test2");
    expect(result.products[1].price).toEqual(124);
  });
});
