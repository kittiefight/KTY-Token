const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    context.address0 = '0x0000000000000000000000000000000000000000';
  });

  it('should not be able for addr 8 to operatorSend from addr 1 without operator privilages', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.operatorSend(
      context.accounts[1], context.accounts[2], value.toString(), "0x0", "0x0",
      { gas: 900000, from: context.accounts[8] }
    ), 'ERC777: caller is not an operator for holder');
  });

  it('should not be able for addr 1 to send tokens to contract without tokenReceived function', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.send(
      context.TestTokensSender.address, value.toString(), "0x0",
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: token recipient contract has no implementer for ERC777TokensRecipient');
  });

  it('should not be able for addr 1 to send tokens to address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.send(
      context.address0, value.toString(), "0x0",
      { gas: 900000, from: context.accounts[1] }
    ), 'ERC777: send to the zero address');
  });

  it('should not be able for addr 3 to operatorSend tokens from address(0)', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.operatorSend(
      context.address0, context.accounts[2], value.toString(), "0x0", "0x0",
      { gas: 900000, from: context.accounts[3] }
    ), 'ERC777: caller is not an operator for holder');
  });
};
