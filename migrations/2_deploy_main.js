const KTYtoken = artifacts.require('./KTYtoken.sol');
const Web3 = require('web3');
const web3 = new Web3(KTYtoken.web3.currentProvider);

require('openzeppelin-test-helpers/configure')({ web3: web3 });
const { singletons } = require('openzeppelin-test-helpers');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(KTYtoken);
};
