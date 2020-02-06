const { expect } = require('chai')
const { expectRevert } = require('../utils')
const { BN } = require('../utils')

exports.test = function (f) {
  const context = f

  before(async () => {
    context.ktyToken = await context.KTYtoken.deployed()
  })

  it('should have the name Kittiefight', async () => {
    expect(await context.ktyToken.name()).to.be.equal('Kittiefight')
  })

  it('should have the symbol KTY', async () => {
    expect(await context.ktyToken.symbol()).to.be.equal('KTY')
  })

  it('its maximum total supply should be 100,000,000', async () => {
    let value = new BN(web3.utils.toWei('100000001'))
    await expectRevert(
      context.ktyToken.mint(context.accounts[0], value.toString()),
      'KTYtoken: cap exceeded -- Reason given: KTYtoken: cap exceeded.'
    )
  })
}
