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
            src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_01/1.png',
            alt: '企点模范生召集 提案例得好礼',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            childNodes: [
                {
                    type: Types.HTML,
                    html: "<p style='text-align:center;font-size: 26px;'>企点模范生召集啦！</p><p style='text-align:center;line-height: ;'>你是如何使用企点的？<br/>在使用过程中有哪些不为人知的小技巧？<br/>是不是积累了不少经验之谈？<br/>快来提交案例反馈，跟大家分享吧！</p>"
                }
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.TITLE_CONTENT,
            title: '投稿福利',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            lineHeight: '30px',
            childNodes: [
                {
                    type: Types.IMG,
                    src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_01/2.png'
                },
                {
                    type: Types.HTML,
                    html: "<p style='color: #aaa;text-align: right;border-bottom: 1px solid #f5f5f5;padding-bottom:10px;margin-bottom: 20px;font-size: 14px;'>*什么是企点精英积分？请关注公众号文章“<a href='https://mp.weixin.qq.com/s/gtI65YMJOsk1TyHi_mZ-hg' target='_blank'>企点精英计划</a>”</p>"
                },
                {
                    type: Types.TEXT,
                    text: '提交的案例将会在企点帮助中心&公众号中进行展示，'
                },
                {
                    type: Types.TEXT,
                    text: '让大家看到你有多强！'
                },
                {
                    type: Types.TEXT,
                    text: '提交案例的用户可以获得加入企点重点客户群的资格，享受专人维护，第一时间获得企点使用技巧资料。'
                },
                {
                    type: Types.TEXT,
                    text: '老板再也不用担心我的工作~'
                }
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.IMG_CONTENT,
            src: 'https://bqq.gtimg.com/qidian/src/themes/client/email/20170712_01/3.png',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            lineHeight: '30px',
            bgColor: '#007aff',
            fontColor: '#fff',
            childNodes: [
                {
                    type: Types.HTML,
                    html: '<p>将案例按照文末格式提交到“<a class="nolink" style="color:#fff !important">qidian@tencent.com</a>”，符合标准被企点君采用的，企点君将通过邮箱回复通知进行领奖喔~</p>'
                },
                {
                    type: Types.TEXT,
                    text: '出于运营考量，企点君将于每月月初1-5号统一联系用户，并于每月月底统一发放奖励。请投稿的用户注意自己的邮箱与短信通知，当月15号前无法与用户取得联系的，只好视为雷锋用户，放弃奖励啦~'
                }
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.TITLE_CONTENT,
            title: '投稿格式',
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '40px',
            paddingBottom: '40px',
            lineHeight: '30px',
            childNodes: [
                {
                    type: Types.HTML,
                    html: '<p><b>（若为客户）提交人姓名/职位：</b><br/><br/><b>（若为经销商）提交人姓名/公司名称：</b><br/><br/><b>企点主号/工号：</b><br/><br/><b>提交人手机号码</b>（用于接收活动通知短信）：<br/><br/><b>开始使用企点的时间：</b><br/><br/><b>企业名称</b>（对应开通企点的企业全称）：<br/><br/><b>企业官网网址/企业官方公众号名称</b>（若有）：<br/><br/><b>所属行业</b>（请在提供的10个行业中选择）：<br/>教育培训、批发零售、金融理财、广告传媒、房产装修、医疗健康、物流运输、生活服务、商业服务、互联网+<br/><br/><b>企业规模/成立时间：</b><br/><br/><b>公司及公司业务简介：</b><br/>（包括客户群体、服务范围等，可参考贵公司官网介绍）<br/><br/><b>使用企点的原因和初衷：</b><br/>（若之前为个人QQ、营销QQ或其他crm或saas产品的使用者，请谈谈改用企点的原因）<br/><br/><b>企点使用场景：</b><br/>（在客户接待、客户管理、新媒体运营三大主要场景中任选，涉及场景越全面，越容易成为优秀案例，配合企点账户中心和企点客户端的截图，详细描述使用企点的过程和评价，欢迎穿插企点使用方面的小技巧小窍门）<br/><br/><b>使用企点为客户的公司带来的改变：</b><br/>（优秀案例应是业务数据的变化结合个人感受，最好有数据截图或优质客户对话截图佐证）</p>'
                }
            ]
        },
        {
            type: Types.BLANK,
            height: '30px'
        },
        {
            type: Types.TITLE_CONTENT,
            title: '注意事项',
            paddingTop: '40px',
            paddingBottom: '40px',
            lineHeight: '30px',
            childNodes: [
                {
                    type: Types.LIST,
                    paddingLeft: '60px',
                    paddingRight: '40px',
                    bulletColor: '#007aff',
                    fontColor: '#000',
                    childNodes: [
                        {
                            type: Types.LIST_ITEM,
                            childNodes: [
                                {
                                    type: Types.TEXT,
                                    text: '每家企业将以企业名称为单位，可提交多份案例文档，但仅有一次获奖资格；'
                                }
                            ]
                        },
                        {
                            type: Types.LIST_ITEM,
                            childNodes: [
                                {
                                    type: Types.TEXT,
                                    text: '活动所收集的案例素材将在后期由企点工作人员进行加工处理后在公众号、群、官网等企点官方渠道进行展示，供相互交流、学习；'
                                }
                            ]
                        },
                        {
                            type: Types.LIST_ITEM,
                            childNodes: [
                                {
                                    type: Types.TEXT,
                                    text: '参与活动视为企业同意将企业商标、名称等企业形象标识及提交的一切资料授权企点官方进行展示、使用；'
                                }
                            ]
                        },
                        {
                            type: Types.LIST_ITEM,
                            childNodes: [
                                {
                                    type: Types.TEXT,
                                    text: '本活动最终解释权归企点官方所有。'
                                }
                            ]
                        }
                    ]
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