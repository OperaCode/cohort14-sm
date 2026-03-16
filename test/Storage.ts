import { expect } from "chai";
import { ethers } from "hardhat";
import type { Storage } from "../typechain-types";

describe("Storage Contract", function () {

  let storage: Storage;

  beforeEach(async function () {

    const StorageFactory = await ethers.getContractFactory("Storage");

    storage = await StorageFactory.deploy();

    await storage.waitForDeployment();
  });

  it("Should store a number", async function () {

    await storage.store(10);

    const result = await storage.retrieve();

    expect(result).to.equal(10n);
  });

  it("Should update the stored number", async function () {

    await storage.store(5);

    await storage.store(20);

    const result = await storage.retrieve();

    expect(result).to.equal(20n);
  });

});