import gulp from 'gulp';
import {ROOT_DIR} from './tasks/core/consts';
import pug from 'pug';
import csso from 'csso';
import stylus from 'stylus';
import {rollup} from 'rollup';
import * as babel from 'babel-core';
import modules from './src/js/modules';
import Types from './src/js/types';
import readFile from './tasks/core/readFile';
import writeFile from './tasks/core/writeFile';

const makeHint = () => {
    let code = `export default ${JSON.stringify(Types)};`;
    return writeFile(`${ROOT_DIR}/src/js/_generated/types.hint.js`, code);
};

const makeCss = () => {
    return readFile(`${ROOT_DIR}/src/stylus/common.styl`).then((code) => {
        return new Promise((resolve, reject) => {
            stylus(code).render((err, css) => {
                err ? reject(err) : resolve(css);
            });
        });
    }).then((css) => {
        css = csso.minify(css).css;
        let code = `export default ${JSON.stringify(css)};`;
        return writeFile(`${ROOT_DIR}/src/js/_generated/css.js`, code);
    });
};

const makeXTmpl = () => {
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

        code = pug.compileClient(code, {
            name: 'xtmpl',
            compileDebug: false,
        });
        code += ';\r\nexport default xtmpl;';

        return writeFile(`${ROOT_DIR}/src/js/_generated/xtmpl.js`, code);
    });
};

const makeConfig = () => {
    let code = [
        ...modules.map((m) => `import ${m} from '../config/${m}';`),
        `export default {${modules.join(',')}};`
    ].join('\r\n');

    return writeFile(`${ROOT_DIR}/src/js/_generated/config.js`, code);
};

const buildJs = () => {
    return rollup({
        entry: `${ROOT_DIR}/src/js/index.js`,
        //plugins: [],
        external: [
            'cheerio',
            'juice',
            'csso',
            'htmlmin',
            'http-image-size'
        ]
    }).then((bundle) => {
        bundle.write({
            format: "es",      // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            useStrict: false,   //去除严格模式，减少无用字符，同时增加代码兼容性
            dest: `${ROOT_DIR}/dist/index.es6.js`
        });
    });
};

const babelJs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
        }, 0);
    }).then((code) => {
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