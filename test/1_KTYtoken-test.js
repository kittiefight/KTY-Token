const context = {};
context.KTYtoken = artifacts.require('./KTYtoken.sol');
context.TestTokensRecipient = artifacts.require('./test/TestTokensRecipient');
context.TestTokensSender = artifacts.require('./test/TestTokensSender');

contract('KTYtoken', (accounts) => {
  context.accounts = accounts;

  describe('Erc20 transfers', () => {
    require('./func/erc20Functionality/transferTokens').test(context);
  })

  describe('Erc20 burn tokens', () => {
    require('./func/erc20Functionality/burnTokens').test(context);
  })

  describe('KTY attributes', () => {
    require('./func/KTY-attributes').test(context);
  })

  describe('Erc20 functionality check', () => {
    require('./security/erc20Functionality/check_transfer_edges').test(context);
    require('./security/erc20Functionality/check_functionality_edges').test(context);
  })

});
