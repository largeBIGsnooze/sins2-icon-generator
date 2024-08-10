const exe = require('@angablue/exe')

const build = exe({
    entry: './index.js',
    out: './out/sins2-icon-gen.exe',
    version: '1.0.0',
    icon: 'favicon.ico',
    properties: {
        ProductName: 'Sins 2 Icon Generator',
        OriginalFilename: 'sins2-icon-gen.exe',
        FileDescription: 'Generates subicons for Sins of A Solar Empire 2 from an icon',
    },
})

build.then(() => console.log('Build complete!'))
