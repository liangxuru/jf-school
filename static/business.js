//global variable
var accountDic = { '010A403A707346518A86811F72C3B2B4': 10742, '0752d370b5de436ebf236a91b393d53e': 10743 };
var __spid = accountDic[getArgs("accountName")];
var __pageSize = 12;
var __maintain = false;

var __isDebug = location.host.indexOf("localhost") != -1 ? true : false;
var __isTest = location.host.indexOf("wx.mrich.com") != -1 ? false : true;
//var __openID = "oCZI6wBvqYkGmfb7yFrMUb8Iu_iA";
//var __openID = "oOOK1wD894-tKtjcSfyRwxWxc6LY";
//var __openID = "oCZI6wKbyhT2dDLcJI2p2PVnnOvs";
var __openID ='oCZI6wGGL8fkHZSwgI0jGEP_Iq_4';
var __model_ds = ["self"];
var __model_us = ["link"];
var __jumpDetail = ["2524", "2532", "2538", "2539"];
var __noAttention = ["authorize", "offlinepay.html", "wxpay.html", "productdetail.html", "share.html"];
var __noRegister = ["splist.html", "temp1.html", "temp2.html", "temp3.html", "temp4.html", "temp5.html", "home.html", "lbhome.html", "lbproductlist.html", "authorize", "offlinepay.html", "wxpay.html", "productlist.html", "productdetail.html", "register.html", "postlist.html", "post.html", "share.html", "survey.html"];
var __onlinePay = 3101;
var __offlinePay = 3102;
var __homeDelivery = 2601;
var __deliverySelf = 2603;
var __gp = 3301;
var __rp = 3302;
var __rap = 3303;
var abPath = "";
var __imgServer = "";
if (__isTest) {
    __imgServer = "http://test.mrich.com:8084";
}
else {
    __imgServer = "http://admin.mrich.cn";
}
var names = {
    n2524: "餐厅列表",
    n2535: "包间列表",
    n2536: "宿舍列表",
    n2532: "酒店列表",
    n2530: "场馆",
    n2529: "俱乐部",
    n2533: "培训拓展"
}
//cookie中缓存键值对，accountName：appid
var localData = {
    wx45f26ea5000aacf4: {
        openID: "openID1",
        buyItem: {
            items: [],
            total: 10
        },
        userData: {
            isAttention: true,
            isRegister: true,
            memID: "111111",
            shopID: 1,
            shopName: "测试店铺",
            businessID: 1,
            businessName: "测试商户",
            name: "测试1",
            mobile: "18888888888",
            level: 1,
            account: [
                { id: 1, name: "储值卡", amount: 100, isCZK: true, isQuota: true },
                { id: 2, name: "餐费", amount: 200, isCZK: false, isQuota: true },
                { id: 3, name: "招待费", amount: 300, isCZK: false, isQuota: false },
            ],
            address: [
                { id: 1, name: "收货人1", mobile: "18666666666", add: "测试地址", isDefault: true }
            ]
        }
    }
};

function checkAuth(callback) {
    if (__maintain) {
        jumpError("服务器正在维护中,请耐心等待^_^");
    }
    var currentAN = getArgs("accountName");
    if (currentAN) {
        var version = $.cookie(currentAN + "version");
        if (!version || version != __version) {
            clearLocalData();
            $.cookie(currentAN + "version", __version, { expires: 365, isZero: true });
        }
        var appID = $.cookie(currentAN);
        if (!appID) {
            getAppID(currentAN);
            appID = $.cookie(currentAN);
        }
        var localDataStr = getLocalData(appID);
        if (!localDataStr) {
            getAppID(currentAN);
            localDataStr = getLocalData(appID);
        }
        setLocalData("currentAN", currentAN);
        var localData = JSON.parse(localDataStr);
        if (localData.openID) {
            //if (!localData.userData) {
            //    jumpAuth(appID);
            //}
            //else {

            //    var fileName = parseURL(location.href).fileName;
            //    checkAccess(fileName);
            //}
            updateUserData(callback);
        }
        else {
            jumpAuth(appID);
        }
    }
    else {
        jumpError("非法请求,缺少参数！");
    }
}

function checkAccess(pageName) {
    pageName = pageName.toLowerCase();
    var currentData = getCurrentData();
    var userData = currentData.userData;
    if (getArgs("check") === "0") {

    }
    else {
        if (!userData.isAttention) {
            if (__noAttention.indexOf(pageName) == -1) {
                jumpError("请先搜索微信公众号:" + currentData.businessName + ",关注后再进行操作！");
            }
        }
        if (!userData.isRegister) {
            if (__noRegister.indexOf(pageName) == -1) {
                jumpRegister();
            }
        }
    }
}

function getAppID(accountName) {
    //loading(true);
    $.ajax({
        async: false,
        type: "get",
        url: abPath + "/api/User/GetBusinessAccount?accountName=" + accountName,
        success: function (data, textStatus, jqXHR) {
            //loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                var appID = result.Data.WeixinAppId;
                $.cookie(accountName, appID, { expires: 365, isZero: true });
                var data = {
                    businessID: result.Data.businessID,
                    businessName: result.Data.businessName,
                    aType: result.Data.aType,
                    payAppID: result.Data.PayAppID
                };
                setLocalData(appID, JSON.stringify(data));
            }
            else {
                jumpError("获取商户信息错误," + result.Message);
            }
        },
        error: function () {
            //loading(false);
            jumpError("获取商户信息失败");
        }
    });
}

function jumpSuccess(msg, isOrder) {
    var url = getServerURL() + abPath + "Mobile/shop/common/success.html?msg=" + msg + "&m=" + parseInt(Math.random() * 1000000);
    location.replace = url;
}

function jumpError(msg) {
    var url = getServerURL() + abPath + "Mobile/shop/common/error.html?msg=" + msg + "&m=" + parseInt(Math.random() * 1000000);
    location.href = url;
    exit();
}

function jumpRegister() {
    setLocalData("currentUrl", location.href);
    var url = getServerURL() + abPath + "Mobile/shop/common/register.html?accountName=" + getLocalData("currentAN") + "&m=" + parseInt(Math.random() * 1000000);
    location.href = url;
    exit();
}

function jumpAuth(appID) {
    if (__isDebug) {
        var currentData = getCurrentData();
        currentData.openID = __openID;
        updateCurrentData(currentData);
        setLocalData("currentUrl", location.href);
        var url = getLocalData("currentUrl", location.href);
        if (url) {
            removeLocalData("currentUrl");
            location.replace(url);
        }
    }
    else {
        setLocalData("currentUrl", location.href);
        var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + getServerURL() + abPath + "mobile/shop/common/authwx.html?m=" + parseInt(Math.random() * 1000000) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
        location.replace(url);
        exit();
    }
}

function getOpenID(code, accountName) {
    //loading(true);
    $.ajax({
        type: "get",
        url: abPath + "/api/User/GetWXOpenID?code=" + code + "&accountName=" + accountName,
        success: function (data, textStatus, jqXHR) {
            //loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                var currentData = getCurrentData();
                currentData.openID = result.Data;
                updateCurrentData(currentData);
                var url = getLocalData("currentUrl");
                if (url) {
                    removeLocalData("currentUrl");
                    location.replace(url);
                }
            }
            else {
                showTip("获取OpenID错误：" + result.Message);
            }
        },
        error: function () {
            //loading(false);
            showTip("获取微信验证信息错误");
        }
    });
}

function getOpenIDRedirect(code, accountName, url) {
    //loading(true);
    $.ajax({
        type: "get",
        url: abPath + "/api/User/GetWXOpenID?code=" + code + "&accountName=" + accountName,
        success: function (data, textStatus, jqXHR) {
            //loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                if (url.indexOf("?") != -1) {
                    url += "&openID=" + result.Data;
                }
                else {
                    url += "?openID=" + result.Data;
                }
                location.replace(url);
            }
            else {
                showTip("获取OpenID错误：" + result.Message);
            }
        },
        error: function () {
            //loading(false);
            showTip("获取微信验证信息错误");
        }
    });
}

function getUserData(openID) {
    //loading(true);
    $.ajax({
        type: "get",
        async: (!__isDebug),
        url: abPath + "/api/User/GetUserData?openID=" + openID,
        success: function (data, textStatus, jqXHR) {
            //loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                if (result.Data.businessStatus != 0) {
                    clearLocalData();
                    jumpError("此公众平台暂时无法使用！");
                }
                if (result.Data.shopStatus != 0) {
                    clearLocalData();
                    jumpError("此商户暂时无法使用！");
                }
                var currentData = getCurrentData();
                currentData.userData = result.Data;
                updateCurrentData(currentData);
                var url = getLocalData("currentUrl", location.href);
                if (url) {
                    removeLocalData("currentUrl");
                    var fileName = parseURL(url).fileName;
                    checkAccess(fileName);
                    location.replace(url);
                }
            }
            else {
                showTip("获取用户数据错误：" + result.Message);
            }
        },
        error: function () {
            //loading(false);
            showTip("获取用户数据错误");
        }
    });
}

function updateUserData(callback) {
    var currentData = getCurrentData();
    var url = abPath + "/api/User/GetUserData?openID=" + currentData.openID + "&m=" + parseInt(Math.random() * 1000000);
    __log.addEvent("发起获取用户数据请求,Url:" + url);
    //loading(true);
    $.ajax({
        type: "get",
        url: url,
        success: function (data, textStatus, jqXHR) {
            //loading(false);
            var result = $.parseJSON(data);
            if (result.Result) {
                __log.addEvent("获取用户数据请求成功");
                if (result.Data.businessStatus != 0) {
                    __log.addEvent("此公众平台暂时无法使用");
                    jumpError("此公众平台暂时无法使用！");
                }
                if (result.Data.shopStatus != 0) {
                    __log.addEvent("此商户暂时无法使用");
                    jumpError("此商户暂时无法使用！");
                }
                var currentData = getCurrentData();
                currentData.userData = result.Data;
                updateCurrentData(currentData);
                var url = location.href;
                var fileName = parseURL(url).fileName;
                checkAccess(fileName);
                (callback && typeof (callback) === "function") && callback.apply();
            }
            else {
                __log.addEvent("获取用户数据请求失败:" + result.Message);
                showTip("获取用户数据错误：" + result.Message);
            }
        },
        error: function () {
            //loading(false);
            __log.addEvent("获取用户数据请求异常");
            showTip("获取用户数据错误");
        }
    });
}

function getCurrentData() {
    var accountName = getLocalData("currentAN");
    var appID = $.cookie(accountName);
    var localDataStr = getLocalData(appID);
    return JSON.parse(localDataStr);
}

function updateCurrentData(data) {
    var accountName = getLocalData("currentAN");
    var appID = $.cookie(accountName);
    setLocalData(appID, JSON.stringify(data));
}

function removeBuyCar(subItem) {
    var current = getCurrentData();
    var newItems = [];
    var saled = false;
    if (current.buyItem) {
        $.each(current.buyItem.items, function (id, item) {
            saled = false;
            $.each(subItem.items, function (id1, item1) {
                if (item.pid == item1.pid && (!item.sid || item.sid == item1.sid)) {
                    current.buyItem.total = current.buyItem.total - item1.count;
                    saled = true;
                    return false;
                }
            });
            if (!saled) {
                newItems.push(item);
            }
        });
        current.buyItem.items = newItems;
        updateCurrentData(current);
    }
}

function floatTool() {
    if ($("._floatTool").length == 0) {
        var accountName = getLocalData("currentAN");
        var base = getServerURL() + "Mobile/shop/common/";
        var html = '<div class="_floatTool active">';
        //if (accountName == "37cfe49fe4404d9a9798ac041b017a2e") {
        //    html += '<a class="item home" href="' + base + 'lbHome.html?accountName=' + accountName + '&m=' + parseInt(Math.random() * 1000000) + '"></a>';
        //} else {
        //    html += '<a class="item home" href="' + base + 'home.html?accountName=' + accountName + '&m=' + parseInt(Math.random() * 1000000) + '"></a>';
        //}
        //html += '<a class="item my" href="' + base + 'my.html?accountName=' + accountName + '&m=' + parseInt(Math.random() * 1000000) + '"></a>';
        html += '<a class="item car" href="' + base + 'buyCar.html?accountName=' + accountName + '&m=' + parseInt(Math.random() * 1000000) + '"><i></i></a>';
        //html += '<a class="anchor"></a>';
        html += '</div>';
        $("body").append(html);
        var current = getCurrentData();
        if (current.aType == "self") {
            $("._floatTool>a:first").hide();
        }
    }
    //$("._floatTool>.anchor").bind("click", function (e) {
    //    e.stopPropagation();
    //    if ($("._floatTool").hasClass("active")) {
    //        $("._floatTool").removeClass("active");
    //        setTimeout(function () {
    //            $("._floatTool").removeClass("w");
    //        }, 320);
    //    }
    //    else {
    //        $("._floatTool").addClass("w");
    //        $("._floatTool").addClass("active");
    //    }
    //});
    //$("body").bind("touchstart", function (e) {
    //    if (!$(e.target).hasClass("item") && !$(e.target).hasClass("anchor") && $("._floatTool").hasClass("active")) {
    //        $("._floatTool").removeClass("active");
    //        setTimeout(function(){
    //            $("._floatTool").removeClass("w");
    //        },320)
    //    }
    //});
}
function updateCount() {
    var current = getCurrentData();
    if (current.buyItem && current.buyItem.total > 0) {
        $("._floatTool>.car>i").text(current.buyItem.total).show();
    }
    else {
        $("._floatTool>.car>i").text(0).hide();
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function getLogs() {
    var logStr = getLocalData("__log");
    if (!logStr) { logStr = "[]"; }
    return JSON.parse(logStr);
}
function updateLogs(value) {
    setLocalData("__log", JSON.stringify(value));
}
function clearLogs() {
    setLocalData("__log", "[]");
}
(function () {
    var log = {
        addEvent: function (txt) {
            var logs = getLogs();
            var eventData = {
                Des: txt,
                Time: (new Date()).Format("yyyy-MM-dd hh:mm:ss")
            };
            $.each(logs, function (id, item) {
                if (item.ID == __currentID) {
                    if (!item.Actions) { item.Actions = []; }
                    eventData.LID = __currentID;
                    item.Actions.push(eventData);
                }
            });
            updateLogs(logs);
        },
        addUrl: function () {
            var gid = guid();
            window.__currentID = gid;
            var logData = {
                ID: gid,
                OpenID: getCurrentData().openID,
                Time: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
                Referrer: document.referrer,
                Url: location.href,
                Agent: navigator.userAgent
            };
            var logs = getLogs();
            logs.push(logData);
            updateLogs(logs);
        },
        sendLogs: function () {
            if (getLogs().length == 0) {
                return;
            }
            $.ajax({
                type: 'post',
                url: abPath + "/api/User/AddFELogs",
                dataType: "json",
                data: { "": JSON.stringify(getLogs()) },
                success: function (result) {

                },
                error: function () {

                }
            });
            clearLogs();
        }
    };
    window.__log = log;

    //body.onbeforeunload = function (e) {        
    //    log.sendLogs();
    //}
    //window.onunload = function (e) {

    //}
    $(function () {
        if (getLocalData("currentAN") && getCurrentData() && getCurrentData().openID) {
            if (getLogs().length > 0) {
                log.sendLogs();
            }
            log.addUrl();
        }
    })
})()

