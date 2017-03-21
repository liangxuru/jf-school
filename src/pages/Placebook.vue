<template>
	<div v-if="showme">
		<div class="header">
			<calendar v-bind:items="weekdays" v-bind:current="current"></calendar>
		</div>
		<div style="height: 8rem;"></div>
		<div class="bgnoHide">
			<div class="sel_status f20">
				<span><font class="border_gray color_blue"></font><div>已选择</div></span>
				<span><font class="border_gray"></font><div>可定</div></span>
				<span><font class="border_gray color_gray"></font><div>不可定</div></span>
				<span><font class="border_gold"></font><div>企业专场</div></span>
				<span><font class="border_gray icon-right color_blue_sel"></font><div>已预订</div></span>
			</div>
			<div class="selectday">
				<selecttime v-if="showprice" v-bind:vertical="prices.vertical" v-bind:horizontal="prices.horizontal"></selecttime>
			</div>
		</div>
		<div style="height: 5.8rem"></div>
		<div class="footer">
			<div class="price">
				<span class="total f24">总额: </span><span class="cPrice f36">{{ amount | currency }}</span>
				<a class="mycar icon-icon24" ref="carIcon" @click="openShoppingCar()"><i class="order-numbers" id="carNum">{{ totalcount }}</i></a>
			</div>
			<a class="next" @click="Submit()">下一步</a>
		</div>
		<div class="sp_car" v-if="showCar">
			<header>
		        <span class="sp_words"> 购物车</span>
		        <div class="clear">
		          <svg>
		            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
		          </svg>
		          <span class="icon-icon36" @click="clearShoppingCar()">清空</span>
		        </div>
	      	</header>
			<ul class="sp_content">
				<li v-for='shop in getResource' :key="shop.AGround_Time_AId">
			        <span class="info f20">
				        <a class="flex"><span class="sub">{{ shop.AStartDate | DateFormat('MM-dd')  }}</span> {{ shop.AStringTime }} - {{ shop.AEndStringTime }}</a>
				        <span class="info"><a class="flex">{{ shop.AGroundFieldAName }}</a>
				        <a class="cPrice">{{ shop.APrice | currency }}</a><i class="icon-icon37" @click="removeShoppingCar(shop)"></i></span>
			        </span>
		        </li>
			</ul>
		</div>
		<div class="mask" v-if="showCar" @click="closeShoppingCar()"></div>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import { Request } from 'service/requests' 
	import { weekdayEnum } from 'lib/constEnum'
	import calendar from 'components/calendar2'
	import seletimes from 'components/seletimes'
	import lazylist from 'lib/lazylist'
	export default {
		name: 'placebook',
		data(){
			return {
				showme: false,
				showprice: false,
				weekdays: [],
				current: 0,
				productId: 0,
				prices: {
                	vertical: [],
                	horizontal: []
                },
                showCar: false
			}
		},
		components: {
			calendar,
			selecttime: seletimes
		},
		computed: {
			...mapState({
				spid: state => state.place.address.id,
				user: state => state.common.user,
				date: state => state.place.placedate
			}),
			...mapGetters(['amount', 'totalcount', 'getResource'])
		},
		methods: {
			...mapActions(['setLoading', 'setResource', 'clearResource']),
			getWeekday(date){
				var curr = new Date() + '';
				if(date.formatDate('yyyy-MM-dd') == curr.formatDate('yyyy-MM-dd')){
                    return '今天';
                }else{
                    return weekdayEnum[new Date(date).getDay()];
                }
			},
			GetResourcePrice(_date){
				this.showprice = false;
				return Request.GetResourcePrice({
	            	date: _date,
                    productId: this.productId,
                    memberId: this.user.memID
	            }).then(function(data){
	            	this.prices.vertical = data.ATime;
                    this.prices.horizontal = data.AGroundFieldFront;
                    this.showprice = true;
	            }.bind(this));
			},
			openShoppingCar(){
				this.showCar = true;
			},
			closeShoppingCar(){
				this.showCar = false;
			},
			removeShoppingCar(item){
				this.setResource(item);
			},
			clearShoppingCar(){
				this.clearResource();
			}
		},
		watch: {
			date: function(){
				this.setLoading(true);
				this.GetResourcePrice(this.date).then(()=>{
					this.setLoading(false);
				});
			}
		},
		created(){
			this.setLoading(true);
			this.productId = this.$route.query.productId;
            this.currentDate = this.$route.query.date;
            var self = this;
			lazylist([
				Request.GetWeekdays({
	                ProductId: this.productId,
	                spid: this.spid,
	                Date: (new Date() + '').formatDate('yyyy-MM-dd'),
	                Datecount: 7
	            }).then((data)=>{
	            	var self = this;
	                data.forEach(function(item, i){
	                    item.Week = self.getWeekday(item.ADate);
	                });
	                this.weekdays = data;
	                return data;
	            }),
	            this.GetResourcePrice(this.currentDate)
			]).then((values)=>{
				//初始化选中日期
                self.current = values[0].findIndex((value)=>{
                	return value.ADate.formatDate("yyyy-MM-dd") == self.currentDate
                });
                //重置
                self.getResource && self.getResource.map((item, index)=>{
                	this.prices.horizontal.find(p=>p==item).AStatus = 1
                });

                self.showme = true;
                self.setLoading(false);
			});
			
		}
	}
</script>
<style scoped>
.header{
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	right: 0;
}
.sel_status{
	display: flex;
	text-align: center;
	color: #888;
	padding: 1.16rem 0;
	overflow: hidden;
}
.sel_status span{
	display: block;
	float: left;
	flex: 1;
}
.sel_status span font{
	width: 2.5rem;
	height: 1.5rem;
	display: block;
	margin: 0 auto;
}
.border_gray{
	border:1px solid #d8d8d8;
} 
.border_gold{
	box-shadow: 0px 0px 0px 2px #FFB500 inset;
}
.color_blue{
	background-color: #00bcf7;
}
.color_blue_sel{
	background-color: #00bcf7;
	color: #fff;
	text-align: center;
	font-size: 1.5rem;
}
.color_gray{
	background-color: #efefef;
}
.selectday {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    position: relative;
}
.footer{
	height: 5.8rem;
	line-height: 5.8rem;
	border-top: 1px solid #d8d8d8;
	background-color: #fff;
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 103;
	margin-top: 0.78rem;
}
.footer a{
	display: inline-block;
}
.footer .next{
	width: 38%;
	color: #fff;
	background-color: #00bcf7;
	text-align: center;
	position: relative;
	top: -3px;
}
.footer .price{
	display: inline-block;
	width: 60%;
	position: relative;
}
.footer .mycar{
	width: 51px;
	position: absolute;
	right: 5px;
	font-size: 2.8rem;
	top: 50%;
	margin-top: -1.4rem;
	text-align: center;
}
.footer .mycar .order-numbers {
    display: inline-block;
    position: absolute;
    top: -10px;
    background-color: #00bcf7;
    line-height: 1.4rem;
    font-style: normal;
    border-radius: 1rem;
    padding: 0 .5rem;
    font-size: 1.2rem;
    color: #fff;
    right: -2px;
    border: 1px solid #fff;
}
.footer .total{
	padding-left: 1.16rem;
}
</style>
<style lang="less">
.sp_car{
	position: fixed;
	bottom: 5.8rem;
	left: 0;
	right: 0;
	background-color: #fff;
	z-index: 103;
	padding: 0.78rem 0;
	header{
	    border-bottom: 1px solid #eee;
	    height: 2.4rem; 
	    line-height: 2.4rem;
	    color:#666;
	    padding: 0 .78rem;
	    .clear{
	      float:right;
	      font-size:.4rem;
	      svg{
	        width:.5rem;
	        height:.5rem;
	        vertical-align:text-top;
	      }
	    }
  }
  .sp_content{
  	padding: 0 .78rem;
  	li{
  		height: 2.4rem;
  	 	line-height: 2.4rem;
  	 	.info{
			display: -webkit-box;
			display: flex;
			-webkit-box-flex: 1;
			flex: 1;
		    align-items: center;
			.flex{
				-webkit-box-flex: 1;
				flex: 1;
				text-align: left;
			}
		}
  	}
  }
}
</style>