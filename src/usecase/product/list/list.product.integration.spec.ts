import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDto } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";


const input: InputListProductDto = {
}

const product = new Product("123","test",123)
const product2 = new Product("124","test2",124)

describe("Test for integration find product", () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close()
  })

  it("test update product",async ()=> {
    const productRepository = new ProductRepository()
    await productRepository.create(product)
    await productRepository.create(product2)
    const usecase = new ListProductUseCase(productRepository)
    const result = await usecase.execute(input)

    expect(result.products.length).toEqual(2);
    expect(result.products[0].id).toEqual("123");
    expect(result.products[0].name).toEqual("test");
    expect(result.products[0].price).toEqual(123);
    expect(result.products[1].id).toEqual("124");
    expect(result.products[1].name).toEqual("test2");
    expect(result.products[1].price).toEqual(124);
  })
})