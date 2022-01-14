<template>
    <div class="box" :id="id">
        <div class="header">
            <img src="@/assets/header.png" alt="" />
        </div>
        <div class="line"></div>
        <div class="textSpacing">
            <p class="title fourFont">律师函</p>
            <div>
                <p class="case-number">
                    【2022】鄂德来颂民函字第 FCM-{{list.number}} 号
                </p>
            </div>
            <p class="indent fiveFont">
                【 &nbsp;&nbsp;客户名称&nbsp;&nbsp; 】 ：{{ list.name }}
            </p>
            <p class="indent fiveFont">
                【&nbsp;&nbsp; 律所名称&nbsp;&nbsp;
                】律师事务所接受马上消费金融股份有限公司（以下简称“马上消费”）的委托，
                指派本律师就您拖欠贷款的有关事宜函告如下。
            </p>
            <p class="indent fiveFont">
                根据马上消费的陈述及提供的贷款合同、汇款凭证等资料显示：
            </p>
            <p class="indent fiveFont">
                您于【&nbsp;&nbsp; 2022 年 05 月 01 日&nbsp;&nbsp;
                】，向马上消费申请借款并签署贷款合同（合同号【 fcm123324324
                】），马上消费已依约全面履行了合同义务，将借款汇入合同约定的相关账户，但
                您却未如约履行偿还借款本金、利息等合同义务。截至【
                &nbsp;&nbsp;2022 年 05 月 01 日 &nbsp;&nbsp;】，您尚欠马上消
                费本金、利息和/或其他费用共计【 &nbsp;&nbsp;33.30
                &nbsp;&nbsp;】元。
            </p>
            <p class="indent fiveFont">
                本律师认为，您与马上消费达成的贷款合同合法有效，双方应按照约定履行各自的义务。马上
                消费依约履行了合同义务，您的欠款行为已经构成违约，应当依法承担违约责任。
            </p>
            <p class="indent fiveFont">
                基于上述，本所现代表马上消费正式要求您见到本函后【 3
                】日内如数偿还前述欠款本息及
                截止至还清之日止的后续应还款项。具体金额以还款当日马上消费提供的数据为准。
            </p>
            <p class="indent fiveFont">
                如您见函后仍不予偿还，根据您的违约行为，马上消费有权采取包括但不限于下列措施：
            </p>
            <p class="indent fiveFont">
                一、继续将您的不良信用信息上报中国人民银行个人征信系统，因此产生的负面影响由您本人
                承担（将可能影响您与银行及其他金融机构发生的信贷业务）；
            </p>
            <p class="indent fiveFont">
                二、依法向人民法院或仲裁机构提起民事诉讼或仲裁，请求法院或仲裁委裁判您清偿全部欠款
                及由此产生的律师费、诉讼费、财产保全费、执行费等款项。同时，向人民法院申请财产保全，请
                求法院依法查封、扣押、冻结您相应金额的个人财产（包括但不限于房产、车辆、存款、股票、债
                券等）。如您仍拒绝履行生效的裁判文书，将申请强制执行；如因此使你被列入失信人黑名单,将
                导致你被禁止有下列行为：
            </p>
            <p class="indent fiveFont">
                1、乘坐交通工具时，选择飞机、列车软卧、轮船二等以上舱位；
            </p>
            <p class="indent fiveFont">
                2、在星级以上宾馆、酒店、夜总会、高尔夫球场等场所进行高消费；
            </p>
            <p class="indent fiveFont">
                3、购买不动产或者新建、扩建、高档装修房屋；
            </p>
            <p class="indent fiveFont">
                4、租赁高档写字楼、宾馆、公寓等场所办公；
            </p>
            <p class="indent fiveFont">5、购买非经营必需车辆；</p>
            <p class="indent fiveFont">6、旅游、度假；</p>
            <p class="indent fiveFont">7、子女就读高收费私立学校；</p>
            <p class="indent fiveFont">8、支付高额保费购买保险理财产品；</p>
            <p class="indent fiveFont">9、其他非生活和工作必需的高消费行为。</p>
            <p class="indent fiveFont">
                谨此。希望您高度重视本函告知事项，及时作出回应，以免引起不必要的讼累，并导致您的信
                用受损而带来诸多的不便。
            </p>
            <div>
                <span class="weightFont fiveFont">委托联系电话：</span>
                <span class="fiveFont">
                    【 &nbsp;李四&nbsp; 】 微信：【16611111111】
                </span>
            </div>
            <div class="signer">
                <p class="fiveFont">湖北德来颂律师事务所</p>
                <p class="fiveFont">2022 年 01 月 13 日</p>
            </div>
            <p class="weightFont fiveFont">还款方式：</p>
            <p class="fiveFont">1、登录相应贷款 app 进行还款</p>
            <p class="fiveFont">2、致委托人协商还款。</p>
            <p class="fiveFont">备注：如您已还清上述欠款，则不必理会此函。</p>
            <div class="tips">
                <p class="sixFont">律师提示：珍惜信用，勿辜负人生！</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="footer">
            <p class="sixFont">
                提示：本律师函是经过律师事务所认证的电子律师函，具有防伪性；任何机构和个人均不得仿冒伪造；伪造我所发出的电子律师函或其打
                印件，均视同私刻我所印章；本所只负责部分司法工作，其余事项请联系债权方。
            </p>
            <p class="sixFont">
                若您对本律师函的真假、内容、问题反馈，请关注我所委托的第三方“讼小保”查询平台自助查询，其他问题请关注我所官微。
            </p>
            <img src="@/assets/wx.png" alt="" />
        </div>
        <img class="watermark" src="@/assets/watermark.png" alt="" />
    </div>
</template>

<script>
export default {
    computed: {},
    props: {
        id: {
            type: String,
            default: "",
        },
        list: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    created() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
// 初号= 42pt；小初号= 36pt；一号= 26pt；二号= 22pt；小二号= 18pt；三号= 16pt；四号= 14pt；
// 小四号= 12pt；五号= 10.5pt；小五号= 9pt；六号= 7.5pt；七号= 5.5pt。
// 2.08 1pt

.box {
    width: 1240px;
    height: 1754px;
    padding: 50px 5%;
    position: relative;
}
.header {
    img {
        width: 449px;
        height: 133;
    }
}
.line {
    width: 100%;
    height: 1px;
    background: rgb(0, 0, 0);
}
.title {
    font-weight: 600;
    text-align: center;
    margin: 15px 0;
}
.case-number {
    text-align: right;
    font-size: 21.85px;
}
.signer {
    width: 100%;
    padding-right: 100px;
    text-align: right;
}
.tips {
    width: 100%;
    text-align: right;
    margin: 70px 0 20px 0;
}
.footer {
    margin: 20px 0 0 0;
    img {
        display: block;
        width: 243px;
        height: 72px;
        margin: 0 auto;
    }
}
.watermark {
    position: absolute;
    bottom: 180px;
    z-index: -1;
    right: 50px;
    opacity: 0.5;
    width: 222.5px;
    height: 222.5px;
}
.indent {
    text-indent: 2em;
}
.fourFont {
    font-size: 29.12px;
}
.fiveFont {
    font-size: 21.85px;
}
.sixFont {
    font-size: 15.6px;
}
.weightFont {
    font-weight: 600;
}
.textSpacing {
    p {
        line-height: 29px;
    }
}
</style>
