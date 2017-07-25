import templateFn from './_generated/xtmpl';
import css_code from './_generated/css';
import cheerio from 'cheerio';
import juice from 'juice/client';
import csso from 'csso';
import htmlclean from 'htmlclean';

export default (node) => {
    let html_code = templateFn({node});

    let $ = cheerio.load(html_code, {
        lowerCaseTags: true,
        lowerCaseAttributeNames: true,
        decodeEntities: false,
        recognizeSelfClosing: true
    });
    juice.juiceDocument($, {
        extraCss: css_code,
        applyAttributesTableElements: true
    });

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

    html_code = $.html();
    html_code = htmlclean(html_code);
    return html_code;
};