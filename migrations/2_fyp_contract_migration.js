const fyp_contract = artifacts.require("fyp_contract");

module.exports = function(deployer) {
  deployer.deploy(fyp_contract);
};
