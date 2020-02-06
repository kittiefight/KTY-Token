const context = {};
context.KTYtoken = artifacts.require('./KTYtoken.sol');
context.TestTokensRecipient = artifacts.require('./test/TestTokensRecipient');
context.TestTokensSender = artifacts.require('./test/TestTokensSender');

contract('KTYtoken', (accounts) => {
  context.accounts = accounts;

  describe('Erc20 transfers', () => {
    require('./func/erc20Functionality/transferTokens').test(context);
  })

  describe('Erc777 sends', () => {
    require('./func/erc777Functionality/sendTokens').test(context);
  })

  describe('Erc777 burn tokens', () => {
    require('./func/erc777Functionality/burnTokens').test(context);
  })

  describe('KTY attributes', () => {
    require('./func/KTY-attributes').test(context);
  })

  describe('Erc20 functionality check', () => {
    require('./security/erc20Functionality/check_transfer_edges').test(context);
    require('./security/erc20Functionality/check_functionality_edges').test(context);
  })

  describe('Erc777 functionality check', () => {
    require('./security/erc777Functionality/check_send_edges').test(context);
    require('./security/erc777Functionality/check_operator_edges').test(context);
    require('./security/erc777Functionality/check_operatorBurn').test(context);
  })

  describe('Erc777 send tokens to contracts', () => {
    require('./func/erc777Functionality/register_sender_recipient').test(context);
  })
});
