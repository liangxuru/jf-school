<template>
	<div class="content">
		<div class="header">
		    <div class="part f28">
		        <div><i :class="`${product.icon} cPrice ithem`"></i>{{ product.name }}</div>
		        <template v-for="(resource, date, index) in getGroupResource" v-if="index < more">
			        <div class="sub date">{{ date | DateFormat('yyyy-MM-dd') }} {{ compute_week(date) }}</div>
			        <ul class="productlist">
				        <li v-for='(shop, index) in resource' v-show="inermore?index<3:true" :key="shop.AGround_Time_AId">
					        <i :class="`icon-icon31 ${shop.AStatus == 1?'cPrice':'sub'}`" @click="select(shop)"></i>
					        <span class="info">
						        <a class="flex">{{ shop.AStringTime}} - {{ shop.AEndStringTime }}</a>
						        <span class="info"><a class="flex">{{ shop.AGroundFieldAName }}</a>
						        <a class="cPrice">{{ shop.APrice | currency }}</a></span>
					        </span>
				        </li>
			        </ul>
		        </template>
		    </div>
		    <div class="f24" @click="open()" :class="expand=='展开'?'expand':'unexpand'">{{expand}}</div>
		</div>

		<div class="bg part">
		    <div class="f28 mg78">购票需知</div>
		    <span class="sub f24">当您成功提交订单后，系统将为您保留场地10分钟，如您在10分钟内没有支付，系统将自动取消.</span>
		</div>
		
		<div class="pay-container">
			<payment></payment>
		</div>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import * as Constant from 'lib/constEnum'
	import payment from 'components/payment'
	import { default as message } from 'lib/message'
	export default {
		name: 'placeorder',
		data(){
			return {
                more: 3,
                inermore: true,//默认收起
                expand: "展开",
                product: {}
			}
		},
		components: {
			payment
		},
		computed: {
			...mapState({
				spid: state => state.place.address.id,
				user: state => state.common.user,
				currsport: state => state.place.currSport
			}),
			...mapGetters(['getGroupResource'])
		},
		methods: {
			...mapActions(['setResourceState']),
			open(){
				if(this.expand == "展开"){
                    // this.more = this.carShops.length;
                    this.inermore = false;
                    this.expand = "收起";
                }else{
                    this.more = 3;
                    this.inermore = true;
                    this.expand = "展开";
                }
			},
            compute_week(date){
            	return Constant.weekdayEnum[new Date(date).getDay()];
            },
            select(item){
            	this.setResourceState(item);
            }
		},
		created(){
			this.product = Constant.sportTypeEnum.find(p=>p.id == this.currsport);
		}
	}
</script>
<style scoped>
.header{
	background-color: #fff;
	font-size: 1.5rem;
}
.header .ithem{
	display: inline-block;
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 50%;
	background-color: #00bcf7;
	color: #fff;
	text-align: center;
	vertical-align: middle;
	margin-right: 10px;
	position: relative;
}
.header .ithem:before{
	font-size: 28px;
	position: absolute;
	top: 2px;
	left: 1px;
}
.header .date{
	padding: 5px 0;
}
.header .productlist li{
	display: -webkit-box;
	display: flex;
	padding-bottom: 5px;
}
.header .productlist .iconright{
	color: #6cd9fd;
}
.header .productlist .info{
	display: -webkit-box;
	display: flex;
	-webkit-box-flex: 1;
	flex: 1;
}
.header .productlist .info .flex{
	-webkit-box-flex: 1;
	flex: 1;
	text-align: left;
}
.expand, .unexpand{
	text-align: center;
	color: #888;
	border-top: 1px solid #d8d8d8;
	height: 3.5rem;
	line-height: 3.5rem;
}
.expand:after{
	content: "";
	display: inline-block;
	width: 0.8rem;
	height: 0.8rem;
	border-top: 1px solid;
	border-left: 1px solid;
	transform: rotate(225deg);
	margin: 0 5px 2px 5px;
}
.unexpand:after{
	content: "";
	display: inline-block;
	width: 0.8rem;
	height: 0.8rem;
	border-top: 1px solid;
	border-left: 1px solid;
	transform: rotate(45deg);
	margin: 0 5px 2px 5px;
	vertical-align: text-bottom;
}
</style>