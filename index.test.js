const test = require('./index')
const { expect } = require('chai')
const path = require('path')
const fs = require('fs')

describe('generate 3 icons', () => {
    const iconPath = fs.readdirSync('./test').map((e) => path.join('./test', e))
    it('icons generated', async () => {
        await test(iconPath)

        const expectedOutput = ['metal_asteroid_hud_icon200.png', 'metal_asteroid_hud_icon150.png', 'metal_asteroid_hud_icon.png']

        expectedOutput.map((e) => expect(fs.existsSync(path.join('./test', e))).to.be.true)
    })
})
