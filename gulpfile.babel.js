import gulp from 'gulp';
import {ROOT_DIR} from './utils/consts';
import pug from 'pug';
import csso from 'csso';
import stylus from 'stylus';
import {rollup} from 'rollup';
import * as babel from 'babel-core';
import modules from './src/js/modules';
import Types from './src/js/types';
import readFile from './utils/readFile';
import writeFile from './utils/writeFile';

const log = (...args) => {
    console.log(...args);
};

const makeHint = () => {
    let code = `export default ${JSON.stringify(Types)};`;
    log('building /src/js/_generated/types.hint.js');
    return writeFile(`${ROOT_DIR}/src/js/_generated/types.hint.js`, code);
};

const makeCss = () => {
    log('compiling /src/stylus/common.styl');
    return readFile(`${ROOT_DIR}/src/stylus/common.styl`).then((code) => {
        return new Promise((resolve, reject) => {
            stylus(code).render((err, css) => {
                err ? reject(err) : resolve(css);
            });
        });
    }).then((css) => {
        log('generating /src/js/_generated/css.js');
        css = csso.minify(css).css;
        let code = `export default ${JSON.stringify(css)};`;
        return writeFile(`${ROOT_DIR}/src/js/_generated/css.js`, code);
    });
};

const makeXTmpl = () => {
    log('building /module_layout/*.pugs');
    let promises = modules.map((m) => readFile(`${ROOT_DIR}/src/module_layout/mixins/${m}.pug`));
    promises.unshift(readFile(`${ROOT_DIR}/src/module_layout/utils.pug`));

    return Promise.all(promises).then((includes) => {
        let code = [
            `- var Types = ${JSON.stringify(Types)};`,
            ...includes,

            'mixin createPartialPug(node, parentNode)',
            '   - var type = node.type;',
            ...modules.map((m, i) => `   ${i ? 'else ' : ''}if type === Types.${m}\r\n        +${m}(node, parentNode)`),

            '+createPartialPug(node, null)'
        ].join('\r\n');

        log('compiling /module_layout/mixins/*.pugs');
        code = pug.compileClient(code, {
            name: 'xtmpl',
            compileDebug: false,
        });
        code += ';\r\nexport default xtmpl;';

        log('generating /src/js/_generated/xtmpl.js');
        return writeFile(`${ROOT_DIR}/src/js/_generated/xtmpl.js`, code);
    });
};

const makeConfig = () => {
    log('generating /src/js/_generated/config.js');
    let code = [
        ...modules.map((m) => `import ${m} from '../config/${m}';`),
        'export default {',
        modules.map((m) => `${JSON.stringify(Types[m])}: ${m}`).join(',\r\n'),
        '};'
    ].join('\r\n');

    return writeFile(`${ROOT_DIR}/src/js/_generated/config.js`, code);
};

const buildJs = () => {
    log('building /src/js/*.js');
    return rollup({
        entry: `${ROOT_DIR}/src/js/index.js`,
        //plugins: [],
        external: [
            'cheerio',
            'juice/client',
            'csso',
            'htmlmin',
            'probe-image-size'
        ]
    }).then((bundle) => {
        log('generating /dist/index.es6.js');
        return bundle.write({
            format: "es",      // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            useStrict: false,   //去除严格模式，减少无用字符，同时增加代码兼容性
            dest: `${ROOT_DIR}/dist/index.es6.js`
        });
    });
};

const babelJs = () => {
    log('transpiling /dist/index.es6.js');
    return new Promise((resolve, reject) => {
        babel.transformFile(`${ROOT_DIR}/dist/index.es6.js`, {
            //ast: false
            // babelrc: false,
            // presets: ["es2015"],
            // plugins: [
            //     "transform-remove-strict-mode"
            // ]
        }, (err, result) => {
            if(err) {
                reject(err);
            } else {
                resolve(result.code);
            }
        });
    }).then((code) => {
        log('generating /dist/index.es5.js');
        return writeFile(`${ROOT_DIR}/dist/index.es5.js`, code)
    });
};

gulp.task('build', () => {
    return Promise.all([
        makeXTmpl(),
        makeCss(),
        makeConfig(),
        makeHint()
    ]).then(buildJs).then(babelJs);
});