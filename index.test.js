const test = require('./index')
const { expect } = require('chai')
const path = require('path')
const fs = require('fs')

describe('generate icon sets', () => {
    const iconPath = fs.readdirSync('./test').map((e) => path.join('./test', e))
    it('icon test - 1', async () => {
        await test(iconPath)
        const expectedOutput = [
            'metal_asteroid_hud_icon200.png',
            'metal_asteroid_hud_icon150.png',
            'metal_asteroid_hud_icon.png',
            'attack_action_icon.png',
            'attack_action_icon150.png',
            'attack_action_icon200.png',
            'jiskun_colony_nanites_tooltip_picture.png',
            'jiskun_colony_nanites_tooltip_picture150.png',
            'jiskun_colony_nanites_tooltip_picture200.png',
        ]
        expectedOutput.map((e) => expect(fs.existsSync(path.join('./test', e))).to.be.true)
    })
})
