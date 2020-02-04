const { expect } = require('chai');
const { BN, singletons } = require('../../utils');

exports.test = function(f) {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    context.ERC1820Registry = await singletons.ERC1820Registry();
  });

  it('should be able to send tokens from addr 0 to addr 1 with interfaces Implemented', async () => {
    const value = new BN(web3.utils.toWei('100'));

    const senderHash = await context.ERC1820Registry
      .interfaceHash('ERC777TokensSender');
    const recipientHash = await context.ERC1820Registry
      .interfaceHash('ERC777TokensRecipient');

    expect(await context.ERC1820Registry.setInterfaceImplementer(
      context.accounts[3], senderHash, context.TestTokensSender.address,
      { gas: 300000, from: context.accounts[3] }))
      .to.have.nested.property('receipt.status', true);

    expect(await context.ERC1820Registry.setInterfaceImplementer(
      context.accounts[1], recipientHash, context.TestTokensRecipient.address,
      { gas: 300000, from: context.accounts[1] }))
      .to.have.nested.property('receipt.status', true);

    expect(await context.ktyToken.send(
      context.accounts[1], value.toString(), '0x00',
    { gas: 400000, from: context.accounts[3] }
    )).to.have.nested.property('receipt.status', true);
  });
};
