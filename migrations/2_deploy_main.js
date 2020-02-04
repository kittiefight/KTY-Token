const SafeMath = artifacts.require('SafeMath');
const KTYtoken = artifacts.require('./KTYtoken.sol');
const TestTokensRecipient = artifacts.require('./test/TestTokensRecipient.sol');
const TestTokensSender = artifacts.require('./test/TestTokensSender.sol');
const Web3 = require('web3');
const web3 = new Web3(KTYtoken.web3.currentProvider);

require('openzeppelin-test-helpers/configure')({ web3: web3 });
const { singletons } = require('openzeppelin-test-helpers');

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(SafeMath);
  await deployer.link(SafeMath, [KTYtoken]);
  const deployed = await web3.eth.getCode('0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24');
  await singletons.ERC1820Registry(accounts[0]);
  await deployer.deploy(TestTokensSender);
  await deployer.deploy(TestTokensRecipient);
  await deployer.deploy(KTYtoken);
};
