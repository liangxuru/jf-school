/**
 * 引用环境与请求url配置
 */

//是否为发布环境
const release = process.env.NODE_ENV === 'production';

const WEAPON_VERSION = '1.0.2';

// http://localhost:18130/api/Ground/GetProductsBySportType?SportType=6&spid=10742
// http://news-at.zhihu.com/api/4/news/latest
var root = {
    host: release ? 'https://test.mrich.com' : 'http://test.weixin.com/api'
};

//请求url
export const URL = {};

//根据运动类型获取产品（普通羽毛球，豪华羽毛球）
URL.PRODUCT_LIST = `${root.host}/Ground/GetProductsBySportType`;
//根据产品ID获取产品详情
URL.ONE_PRODUCT = `${root.host}/Ground/GetProductById`;
//获取一周信息
URL.WEEKDAYS = `${root.host}/Ground/GetWeekdays`;
//根据日期获取某一天价格资源
URL.RESOURCE_PRICE = `${root.host}/Ground/GetResourcePrice`;
// 会员信息
URL.MEMBER_CARD = `${root.host}/Ground/GetMemberCardInfo`;
//场地-提交订单
URL.ADD_ORDER = `${root.host}/Ground/CreateOrder`;