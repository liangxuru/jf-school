<template>
	<div>
		<div class="payment">
			<!-- 优惠券 -->
			<div class="bg part">
				<div class="left"><span class="f28"><i class="icon-icon27 cGold"></i>优惠券</span></div>
				<div class="right"><span class="f28 direct"><a class="cPrice">0</a> 张可用</span></div>
			</div>
			<!-- 会员卡 -->
			<div class="bg part" @click="selectCard()">
				<div class="left"><span class="f28"><i class="icon-icon28 cPrice"></i>会员卡</span></div>
				<div class="right"><span class="f28"><a class="cPrice">{{ ABalance || 0 | currency }}</a> <i :class="`icon-icon30 ${cardPrice?'cPrice':'sub'}`"></i></span></div>
			</div>
			<!-- 微信支付 -->
			<div class="bg part" @click="selectWx()">
				<div class="left"><div class="f28"><i class="icon-icon29 cGreen"></i>微信支付</div><div class="sub f24" style="margin-left: 25px;">推荐有微信帐户的用户使用</div></div>
				<div class="right f28"><i :class="`icon-icon30 ${wxPrice?'cPrice':'sub'}`"></i></div>
			</div>
			<!-- 商品金额 -->
			<div class="bg part">
				<div class="left mg78"><span class="f28">商品金额</span></div>
				<div class="right"><a class="cPrice">{{ amount | currency }}</a></div>
				<div class="clear"></div>
				<template v-if="memDis>0"><div class="left mg78"><span class="f24">会员卡折扣<span class="f22 sub">({{ customer.levelZheKou*10 }}折)</span></span></div>
				<div class="right"><a class="cPrice">- {{ memDis | currency }}</a></div></template>
				<div class="clear"></div>
				<template v-if="bussDis>0"><div class="left mg78"><span class="f24">企业折扣<span class="f22 sub">({{ customer.companyInfo && customer.companyInfo[0].shopZheKou*10 }}折)</span></span></div>
				<div class="right"><a class="cPrice">- {{ bussDis | currency }}</a></div></template>
				<div class="clear"></div>
				<template v-if="cardPrice"><div class="left"><span class="f24">会员卡</span></div>
				<div class="right"><a class="cPrice">- {{ cardPrice | currency }}</a></div></template>
			</div>
		</div>
		<div style="height: 5.8rem;"></div>
		<div class="footer">
			<div class="price"><a class="total f24">实付款: <a class="cPrice f36" style="margin-left: 0.5rem;">{{ wxPrice | currency }}</a></a></div>
		    <a class="next" @click="submit()" >提交订单</a>
		</div>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import { Request } from 'service/requests'
	import { default as message } from '../lib/message'
	import { getdate } from 'lib/util'
	export default {
		name: 'payment',
		data(){
			return {
				customer: {},
                ABalance: 0,
                cardPrice: 0,
                wxPrice: 0
			}
		},
		computed: {
			...mapState({
				spid: state => state.place.address.id,
				user: state => state.common.user,
				openid: state => state.common.openid,
				date: state => state.place.placedate,
				currsport: state => state.place.currSport,
				productId: state => state.place.productid
			}),
			...mapGetters(['getEffectResource']),
			bussTotal: {
				//企业总价
				cache: false,
				get: function(){
					let total = 0;
					this.getEffectResource.filter((item)=>{return item.AOccupiedFrom!=2}).map((item)=>{
						total += item.APrice
					});
					return total;
				}
			},
			memTotal: {
				//会员总价
				cache: false,
				get: function(){
					let total = 0;
					this.getEffectResource.filter((item)=>{return item.AOccupiedFrom==2}).map((item)=>{
						total += item.APrice
					});
					return total;
				} 
			},
			bussDis: {
				cache: false,
				get: function(){
					return (this.customer && (this.bussTotal*(1-this.customer.levelZheKou)).toFixed(2) || 0)  - 0;
				}
			},
			memDis: {
				cache: false,
				get: function(){
					return (this.customer && (this.memTotal*(1-(this.customer.companyInfo && this.customer.companyInfo[0] && this.customer.companyInfo[0].shopZheKou || 0))).toFixed(2) || 0)  - 0;
				}
			},
			amount: {
				cache: false,
				get: function(){
					return this.memTotal+ this.bussTotal
				}
			},
			discount: {
				cache: false,
				get: function(){
					return this.bussDis + this.memDis
				}
			}
		},
		watch: {
			amount: function(){
				this.cardPrice = Math.min(this.ABalance, this.amount-this.discount);
				this.wxPrice = this.amount - this.discount - this.cardPrice;
			}
		},
		methods: {
			...mapActions(['setLoading', 'clearResource']),
            selectCard: function(){
                if(this.cardPrice){
                    this.cardPrice = 0;
                }else{
                    this.cardPrice = Math.min(this.ABalance, this.amount-this.discount);
                }
                this.wxPrice = this.amount - this.discount - this.cardPrice;
            },
            selectWx: function(){
                if(this.wxPrice){//选中变为非选
                    if(this.ABalance < this.amount - this.discount){
                        this.cardPrice = 0;
                    }
                    this.wxPrice = this.amount - this.discount - this.cardPrice;
                }else{
                    this.wxPrice = this.amount - this.discount;
                    this.cardPrice = 0;
                }
            },
            submit: function(){
            	if(!this.lastRun){
                    this.lastRun = lastRun.apply(this);
                }
                function lastRun(){
                	let name="", caculate={}, self = this;
	                this.getEffectResource.map(function(item){
	                    name = item.AproductID + getdate(item.AStartDate, '') + item.AGroundFieldAId;
	                    if (!caculate[name]) {
	                        caculate[name] = [];
	                    }
	                    caculate[name].push(item.AGround_Time_AId);
	                });

	                for (let item in caculate) {
	                    let flag = 0;
	                    caculate[item].map(function (it, ii, arr) {
	                        if (arr.indexOf(it - 1)==-1 && arr.indexOf(it + 1)==-1) {//前后两个数都不存在
	                            flag = 1;
	                            return;
	                        }else if(arr.indexOf(it + 1)==-1&&arr.indexOf(it + 2)>-1){//后一个数存在但后两个数存在
	                            flag = 2;
	                            return;
	                        }
	                    });
	                    if (flag===1) { 
	                        message.error("最小起订一小时"); return; 
	                    }else if(flag===2){
	                        message.error("请不要留下单个半小时"); return;
	                    }
	                }
	                if(this.getEffectResource.length==0) {message.error("您还未选择资源"); return;}

	                    var obj = {
	                        resource: this.getEffectResource,
	                        iscardPay: this.cardPrice>0,
	                        isWXpay: this.wxPrice>0,
	                        opid: this.openid,
	                        memid: this.user.memID,
	                        spid: this.spid
	                    };
	                    Request.PostOrder({"": JSON.stringify(obj)}).then((data)=>{
	                    	debugger;
                            if(data.payStatus === 0){
                                //未支付,转微信
                                self.payAgin(data.orderCode);
                            }else if(data.payStatus === 1){
                                //已支付
                               self.$router.replace({path: '/success', query: {orderCode: data.orderCode}});
                            }
                            self.clearResource();
	                    });
	                    return 1;
                }
            },
            payAgin: function(orderCode){
                //未支付,转微信
                var current = getCurrentData();

                var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + current.payAppID + "&redirect_uri=" +  encodeURIComponent(getServerURL() + "wxpay.html?accountName=" + getLocalData("currentAN") + "&orderCode=" + orderCode) + "&showwxpaytitle=1&response_type=code&scope=snsapi_base&state=1#wechat_redirect";

                history.replaceState(null, '', `index.html#/placebook/?productId=${this.productId}&date=${this.date}&accountName=${getLocalData("currentAN")}`);
                location.replace(url);
            }
        },
        created(){
        	Request.GetMemberCardInfo({
        		memberId: this.user.memID
        	}).then(function(data){
        		this.customer = data;
                this.ABalance = this.customer && this.customer.ABalance || 0;
                this.cardPrice = Math.min(this.ABalance, this.amount-this.discount).toFixed(2) -0;
        		this.wxPrice = (this.amount - this.discount - this.cardPrice).toFixed(2) - 0;
        	}.bind(this))
        }
	}
</script>
<style scoped>
.payment{
	position: relative;
	overflow-y: auto;
}
.payment .right .direct::after{
	content: " ";
	display: inline-block;
	height: .8rem;
	width: .8rem;
	border-left: 1px solid;
	border-top: 1px solid;
	transform: rotate(135deg);
}
/*页尾*/
.footer{
	height: 5.8rem;
	line-height: 5.8rem;
	border-top: 1px solid #d8d8d8;
	background-color: #fff;
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10;
	margin-top: 1.16rem;
}
.footer a{
	display: inline-block;
}
.footer .price{
	display: inline-block;
	width: 60%;
}
.footer .next{
	width: 38%;
	text-align: center;
	background-color: #00bcf7;
	height: 100%;
	color: #fff;
	position: absolute;
	right: 0;
    cursor: pointer;
}
.footer .total{
	padding-left: 1.16rem;
}
</style>