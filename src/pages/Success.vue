<template>
	<div class="wrap" style="height: 100%;background-color: #fff;">
		<div class="info">
			<i class="success icon-icon31 cPrice f96"></i>
			<p class="f36">操作成功</p>
			<p class="f28">订单号: {{ orderCode }}</p>
		</div>
		<div class="group">
			<p><button class="btn view f28" @click="view()">查看订单</button></p>
			<p><button class="btn close f28" @click="close()">关闭</button></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Success',
		data(){
			return {
				orderCode: ""
			}
		},
		created(){
			// this.orderCode = this.$route.query.orderCode;
		},
		methods: {
			close(){
				history.back();
			},
			view(){
				this.$routerrouter.push({ name: 'orderlist'})
			}
		}
	}
</script>

<style scoped>
.wrap p{
	margin: 0;
	padding: 5px 0;
}
.wrap .info{
	padding-top: 7.3rem;
	text-align: center;
}
.wrap .group{
	width: 90%;
	margin: 0 auto;
}
.wrap .group p{
	width: 100%;
}
.wrap .group p button{
	width: 100%;
}
.wrap .btn{
	display: block;
    height: 3.6rem;
    line-height: 3.6rem;
    border: 1px solid #00bcf7;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
}
.wrap .view{
    background-color: #00bcf7;
    color: #fff;
}
.wrap .close{
    background-color: #fff;
    color: #00bcf7;
}
.f96{
	font-size: 8rem;
}
</style>