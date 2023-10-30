import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";





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

  it("test find product",async ()=> {
    const productRepository = new ProductRepository()
    const product = new Product("123","test",123)
    const usecase = new FindProductUseCase(productRepository)
    await productRepository.create(product)
    const input: InputFindProductDto = {
      id:"123"
    }

    const output: OutputFindProductDto = {
      id: "123",
      name: "test",
      price: 123
    } 
    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})