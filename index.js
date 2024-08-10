const readline = require('readline')
const { execFile } = require('child_process')
const path = require('path')
const ora = require('ora')
const fs = require('fs')

const _ICON_CONFIG_NAME = 'icon_dimensions.json'
/* ----------------------------------------------------------------------
Input:
    - trader_robotics_cruiser_repair_droids_ability_hud_icon200 (none)
Output:
    - trader_robotics_cruiser_repair_droids_ability_hud_icon200 (none)
    - trader_robotics_cruiser_repair_droids_ability_hud_icon150 (25% downscaled)
    - trader_robotics_cruiser_repair_droids_ability_hud_icon (50% downscaled)
---------------------------------------------------------------------- */
class Config {
    static settings

    static init() {
        try {
            Config.settings = JSON.parse(fs.readFileSync(__dirname + `/${_ICON_CONFIG_NAME}`, 'utf-8'))
        } catch {
            Config.reset()
            Config.save()
        }
    }

    static save() {
        fs.writeFileSync(__dirname + `/${_ICON_CONFIG_NAME}`, JSON.stringify(Config.settings, null, 2))
        Config.init()
    }

    static reset() {
        Config.settings = {
            icon: [170, 80],
            hud_icon: [170, 80],
            tooltip_picture: [918, 432],
        }
    }
}

const cmd = readline.createInterface({ input: process.stdin, output: process.stdout })
const spinner = ora()

async function magick(path, op, val, filename) {
    return new Promise((resolve) => execFile('magick', ['convert', path, op, val, filename], (error, stdout, stderr) => resolve(stdout)))
}

async function processIcon(icon, config) {
    const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray']
    const r = /(.*)200(\.png)/
    const fileName = path.basename(icon, path.extname(icon))

    let icon_type = Object.keys(config).find((e) => fileName.endsWith(e + '200'))
    if (!icon_type) return

    const [width, height] = config[icon_type]

    const _200 = icon.replace(r, `$1200$2`)
    const _150 = icon.replace(r, `$1150$2`)
    const _0 = icon.replace(r, `$1$2`)

    spinner.text = `generating icons from: ${path.basename(icon)}`
    spinner.color = colors[Math.floor(Math.random() * colors.length)]

    await Promise.all([await magick(icon, '-resize', `${width}x${height}!`, _200), await magick(_200, '-scale', '75%', _150), await magick(_200, '-scale', '50%', _0)])
}

async function processIcons(icons, config) {
    console.log(`processing icons postfixed as: ${Object.keys(config).join('200, ')}200`)
    spinner.start()
    for (const icon of icons) await processIcon(icon, config)
    spinner.stop()
}

async function main() {
    Config.init()
    const args = process.argv.slice(2)
    if (args[0] === '-s') await processIcon(args[1], Config.settings)
    else await processIcons(args, Config.settings)
    cmd.close()
}

main()

module.exports = async (icons) => {
    Config.init()
    await processIcons(icons, Config.settings)
}
