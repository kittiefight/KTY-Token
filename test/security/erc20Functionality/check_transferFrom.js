const { expectRevert } = require('../../utils');
const { BN } = require('../../utils');

exports.test = (f) => {
  const context = f;

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed();
  });

  it('should not be able for addr 8 to transferFrom addr 1 without allowance privilages', async () => {
    const value = new BN(web3.utils.toWei('1000'));

    await expectRevert(context.ktyToken.transferFrom(
      context.accounts[1], context.accounts[2], value.toString(),
      { gas: 900000, from: context.accounts[8] }
    ), 'ERC777: transfer amount exceeds allowance');
  });
};
