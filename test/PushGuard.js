const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PushGuard", function () {
  let pushGuard;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const PushGuard = await ethers.getContractFactory("PushGuard");
    pushGuard = await PushGuard.deploy();
    await pushGuard.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(pushGuard.address).to.properAddress;
    });
  });

  describe("Guard Toggling", function () {
    it("Should allow toggling guard", async function () {
      await expect(pushGuard.connect(addr1).toggleGuard(true))
        .to.emit(pushGuard, "GuardToggled");
    });

    it("Should emit an event when guard is toggled", async function () {
      await expect(pushGuard.connect(addr1).toggleGuard(true))
        .to.emit(pushGuard, "GuardToggled");
    });
  });

  describe("Threat Reporting", function () {
    it("Should allow reporting threats", async function () {
      await expect(pushGuard.connect(addr1).reportThreat("phishing", "Suspicious transaction"))
        .to.emit(pushGuard, "ThreatDetected");
    });
  });

  describe("Guard Status", function () {
    it("Should return false for inactive guard", async function () {
      expect(await pushGuard.isGuardActive("eip155", "11155111")).to.equal(false);
    });
  });
});