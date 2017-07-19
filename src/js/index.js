import templateFn from './_generated/xtmpl';
import css_code from './_generated/css';
import cheerio from 'cheerio';
import juice from 'juice';
import csso from 'csso';
import htmlmin from 'htmlmin';
import formatNode from './formatNode';
import calculateImageSize from './calculateImageSize';

export default (node, opts) => {
    opts = Object.assign({
        minify: true
    }, opts);

    node = formatNode(node);
    return calculateImageSize(node).then(() => {
        let html_code = templateFn({node});

        let $ = cheerio.load(html_code, {
            lowerCaseTags: opts.minify,
            lowerCaseAttributeNames: opts.minify,
            decodeEntities: false,
            recognizeSelfClosing: true
        });
        juice.juiceDocument($, {
            extraCss: css_code,
            applyAttributesTableElements: true
        });


        if(opts.minify) {
            //删除id和class
            $('[id]').removeAttr('id');
            $('[class]').removeAttr('class');

            //压缩优化style
            $('[style]').each((i, el) => {
                let $el = $(el);
                let style = $el.attr('style');
                style = csso.minifyBlock(style, {}).css;
                $el.attr('style', style);
            });
        }


        html_code = $.html();

        if(opts.minify) {
            html_code = htmlmin(html_code, {
                cssmin: true,
                jsmin: true,
                removeComments: true,
                collapseWhitespace: true
            });
        }

        return html_code;
    });
};