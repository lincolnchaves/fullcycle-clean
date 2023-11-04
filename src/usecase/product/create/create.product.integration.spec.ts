import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";
const input: InputCreateProductDto = {
  name: "test",
  price: 123
}

describe("Test for integration create product", () => {
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

  it("test create product",async ()=> {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)
    const result = await usecase.execute(input)

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })
})