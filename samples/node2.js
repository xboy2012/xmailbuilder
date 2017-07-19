import {Types} from '../dist/index.es6';

export default {
    type: Types.MAIN,
    bgColor: '#F0F1F2',
    childNodes: [
        {
            type: Types.IMG_CONTENT,
            fontSize: '17px',
            lineHeight: '30px',
            bgColor: '#fff',
            src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_02/1.png',
            alt: '企点精英养成计划',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            childNodes: [
                {
                    type: Types.TEXT,
                    fontColor: '#daae63',
                    fontSize: '26px',
                    text: '什么是“企点精英”？'
                },
                {
                    type: Types.TEXT,
                    text: '企点精英是面向所有经销商人员的目前唯一的企点官方荣誉认证。'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.TEXT,
                    fontColor: '#daae63',
                    fontSize: '26px',
                    text: '如何成为“企点精英”？'
                },
                {
                    type: Types.TEXT,
                    text: '企点官方会不定期推出一系列运营活动，配合运营活动即可获得对应“企点精英”积分，每1积分对应1成长值。'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.HTML,
                    html: '<b>每月企点之星</b>'
                },
                {
                    type: Types.TEXT,
                    text: '每月成长值增长最快的10名成员将成为当月“企点之星”，在公众号榜单上公布，并且将额外获得100积分。'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.HTML,
                    html: '<b>企点精英</b>'
                },
                {
                    type: Types.TEXT,
                    text: '累计成长值达到10000即可成为“企点精英”，获得官方颁布的“企点精英”证书，成为“企点精英”联盟的一员，官方将定期组织企点精英联盟进行学习、内部资料分享、沟通交流。'
                },
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.TITLE_CONTENT,
            title: '礼品池',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            lineHeight: '30px',
            childNodes: [
                {
                    type: Types.TEXT,
                    fontColor: '#daae63',
                    fontSize: '26px',
                    text: '成为“企点精英”有什么用？'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.HTML,
                    html: '<b>积分换好礼</b>'
                },
                {
                    type: Types.TEXT,
                    text: '获得的积分可在礼物池中进行礼品兑换，丰富的礼品等你来拿~'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.IMG,
                    src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_02/2.png'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.IMG,
                    src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_02/3.png'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.IMG,
                    src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_02/4.png'
                },
                {
                    type: Types.BLANK,
                    height: '20px'
                },
                {
                    type: Types.HTML,
                    html: '<b>企点精英联盟</b>'
                },
                {
                    type: Types.TEXT,
                    text: '企点精英们将获得官方颁布的“企点精英”证书，成为“企点精英”联盟的一员，官方将定期组织企点精英联盟进行学习、内部资料分享、沟通交流。还有更多权益正在规划中~'
                }
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.BOTTOM_QR
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.SIGNATURE,
            date: '2017年7月6日'
        }
    ]
};