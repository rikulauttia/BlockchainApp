import { expect } from "chai";

describe("Marketplace", function () {
  let Marketplace, marketplace, seller, buyer;

  beforeEach(async function () {
    [seller, buyer] = await ethers.getSigners();
    Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy();
    await marketplace.deployed();
  });

  it("Should create a new product", async function () {
    await marketplace
      .connect(seller)
      .createProduct("Test Product", ethers.utils.parseEther("1"));
    const product = await marketplace.products(1);
    expect(product.name).to.equal("Test Product");
    expect(product.price).to.equal(ethers.utils.parseEther("1"));
    expect(product.seller).to.equal(seller.address);
    expect(product.buyer).to.equal(ethers.constants.AddressZero);
  });

  it("Should allow a user to purchase a product", async function () {
    await marketplace
      .connect(seller)
      .createProduct("Test Product", ethers.utils.parseEther("1"));
    await marketplace
      .connect(buyer)
      .purchaseProduct(1, { value: ethers.utils.parseEther("1") });
    const product = await marketplace.products(1);
    expect(product.buyer).to.equal(buyer.address);
  });
});
