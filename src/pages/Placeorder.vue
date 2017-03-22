<template>
	<div class="content">
		<div class="header">
		    <div class="part f28">
		        <div><i :class="`${product.icon} cPrice ithem`"></i>{{ product.name }}</div>
		        
		    </div>
		    <div class="f24" @click="open()" :class="expand=='展开'?'expand':'unexpand'">{{expand}}</div>
		</div>

		<div class="bg part">
		    <div class="f28 mg78">购票需知</div>
		    <span class="sub f24">当您成功提交订单后，系统将为您保留场地10分钟，如您在10分钟内没有支付，系统将自动取消.</span>
		</div>

	</div>
</template>
<script>
	import { mapState, mapGetters } from 'vuex'
	import * as Constant from 'lib/constEnum'
	export default {
		name: 'placeorder',
		data(){
			return {
                more: 3,
                inermore: true,//默认收起
                expand: "展开"
			}
		},
		computed: {
			product: ()=>{
				return Constant.sportTypeEnum[this.currsport]
			},
			...mapState({
				spid: state => state.place.address.id,
				user: state => state.common.user,
				currsport: state => state.place.currSport
			}),
			...mapGetters(['getGroupResource'])
		},
		methods: {
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
            }
		},
		created(){
			debugger;
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