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

  describe('Erc20 transferFrom check', () => {
    require('./security/erc20Functionality/check_transferFrom').test(context);
  })

  describe('Erc777 operatorSend check', () => {
    require('./security/erc777Functionality/check_operatorSend').test(context);
  })

  describe('Erc777 send tokens to contracts', () => {
    require('./func/erc777Functionality/register_sender_recipient').test(context);
  })
});
