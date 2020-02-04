const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
    await context.ktyToken.mint(context.accounts[1], web3.utils.toWei('10000000'));
  });

  it('should not be able for addr 8 to operatorSend from addr 1 without operator privilages', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.operatorSend(
      context.accounts[1], context.accounts[2], value.toString(), "0x0", "0x0",
      { gas: 900000, from: context.accounts[8] }
    ), 'ERC777: caller is not an operator for holder');
  });
};
