
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

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
    const product = new Product("123","test",123)
    const usecase = new UpdateProductUseCase(productRepository)
    await productRepository.create(product)
    const input: InputUpdateProductDto = {
      id:"123",
      name: "test updated",
      price: 124
    }

    const output: OutputUpdateProductDto = {
      id: "123",
      name: "test updated",
      price: 124
    } 
    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})