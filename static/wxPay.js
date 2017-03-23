var wxJSPay = true;
var prepayResult = "";
var isYD = false;
$(function () {
    checkAuth(init);
});

function init() {
    var current = getCurrentData();
    var code = getArgs("code");
    var orderCode = getArgs("orderCode");
    if (orderCode && code && current) {
        var openID = current.payOpenID ? current.payOpenID : "";
        var an = getLocalData("currentAN");
        getPay(orderCode, an, code, openID);
    }
    else {
        __log.addEvent("非法请求,缺少参数");
        jumpError("缺少参数");
    }
    $(".subBtn").bind("click", function () {
        __log.addEvent("点击支付");
        if (!wxJSPay) {
            __log.addEvent("微信js初始化失败");
            showTip("微信js初始化失败");
            return;
        }
        var config = prepayResult;
        wx.chooseWXPay({
            timestamp: config.timeStamp,
            nonceStr: config.nonceStr,
            package: config.package,
            signType: config.signType,
            paySign: config.paySign,
            success: function (res) {
                __log.addEvent("支付成功,开始检查回调");
                checkResult();
            },
            cancel: function (res) {
                __log.addEvent("用户取消支付");
                //deleteR(no);
            },
            error: function (res) {
                //alert(res);
            }
        });
    });
}

function getPay(orderCode, accountName, code, openID) {
    var url = abPath + "/api/Order/GetWXPayNeedCode?orderCode=" + orderCode + "&accountName=" + accountName + "&code=" + code + "&url=" + encodeURIComponent(location.href) + "&openID=" + openID;
    __log.addEvent("发起获取支付信息请求,Url:" + url);
    loading(true);
    $.ajax({
        type: "get",
        url: url,
        success: function (data, textStatus, jqXHR) {
            loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                __log.addEvent("获取JSTicket返回：" + JSON.stringify(result.Data.wxResult));
                var wxResult = result.Data.wxResult;
                var current = getCurrentData();
                current.payOpenID = wxResult.openID;
                updateCurrentData(current);
                prepayResult = result.Data.prepayResult;
                wx.config({
                    debug: false,
                    appId: wxResult.appid,
                    timestamp: wxResult.timestamp,
                    nonceStr: wxResult.noncestr,
                    signature: wxResult.signature,
                    jsApiList: [
                      'chooseWXPay'
                    ]
                });
                wx.ready(function () {
                    wx.checkJsApi({
                        jsApiList: ['chooseWXPay'],
                        success: function (res) {
                            var result = res.checkResult;
                            if (!result.chooseWXPay) {
                                __log.addEvent("您的手机不支持微信支付");
                                showMsg("您的手机不支持微信支付");
                                wxJSPay = false;
                            }
                        }
                    });
                });
                wx.error(function (res) {
                    __log.addEvent("微信js加载失败");
                    wxJSPay = false;
                });
                $("#no").html(result.Data.order.orderCode);
                if (result.Data.order.AOrderType==1) {
                    isYD = true;
                }
                if (isYD) {
                    $(".title").text("为确保预定的有效性,您需要支付如下金额");
                    $("#no").prev().text("预定编号");
                }
                
                $("#des").html(result.Data.order.ShopName + "消费");
                $("#money>span").html(keepDecimalsUp(result.Data.order.cashpay, 2));
                $("#shop").html(result.Data.order.ShopName);
                $("#payPage").show();
            }
            else {
                __log.addEvent("获取支付信息请求失败:" + result.Message);
                showTip("获取订单数据失败：" + result.Message);
            }
        },
        error: function () {
            loading(false);
            __log.addEvent("获取支付信息请求异常");
            showTip("获取订单数据异常！");
        }
    });
}

function checkResult() {
    var code = $("#no").text();
    var url = abPath + "/api/Order/GetPayResult?code=" + code;
    __log.addEvent("发起检查支付回调请求,Url:" + url);
    loading(true);
    $.ajax({
        type: "get",
        url: url,
        success: function (data, textStatus, jqXHR) {
            var result = JSON.parse(data);
            if (result.Result) {
                if (result.Status == 1) {
                    __log.addEvent("没有检查到结果,1秒后重试");
                    setTimeout(function () { checkResult() }, 1000);
                }
                else if (result.Status == 2) {
                    var current = getCurrentData();
                    __log.addEvent("提交订单请求成功,跳转支付成功Url:" + url);
                    //var jpUrl = getServerURL() + "Mobile/shop/common/success.html?msg=";
                    var jpUrl = getServerURL() + "Mobile/jf/pages/index.html#!/success/:orderCode/:accountName/?accountName=" + getLocalData("currentAN") + "&orderCode=" + code;

                    jpUrl += ("<span class='red L'>消费金额 " + (result.Data.orderMoney).toFixed(2) + "</span>");
                    jpUrl += ("<span class='red L'>实际扣款 " + (result.Data.payMoney).toFixed(2) + "</span>");
                    jpUrl += ("订单号：" + code);
                    jpUrl += ("&shopName=" + $("#shop").html() + "&date=" + new Date());
                    jpUrl += "&isOrder=true&isRegister=" + current.userData.isRegister;
                    if (isYD) {
                        jpUrl += "&isYD=true";
                    }
                    __log.addEvent("回调成功,跳转支付成功页面Url:" + jpUrl);
                    location.replace(jpUrl);

                }
            }
            else {
                __log.addEvent("检查支付回调请求失败:" + result.Message);
                showTip("检查支付状态失败：" + result.Message);
            }
        },
        error: function () {
            loading(false);
            __log.addEvent("检查支付回调请求异常");
            showTip("检查支付状态异常！");
        }
    });
}