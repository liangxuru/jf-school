<template>
	<div class="wrapper">
		<div class="scroller">
			<a :class="'item ' + (index==current?'current':'')" v-for="(item, index) in items" @click="select(item,index)">
				<span class="f28">{{ item.Week }} <span v-show="item.Price"><i class="c_gold">￥{{ item.Price }}</i>起</span></span>
				<span class="f28">{{ item.ADate| DateFormat('MM/dd') }}</span>
				<span class="f18">剩余{{ item.count }}</span>
			</a>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'calendar',
		props: {
			items: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			}
		},
		methods: {
			...mapActions(['changeDate']),
			select(item, index){
				this.$parent.current = index;
				this.changeDate(item.ADate.formatDate("yyyy-MM-dd"));
			}
		}
	}
</script>

<style scoped>
.wrapper{
	width: 100%;
	height: 8rem;
	line-height: 1.9rem;
	overflow-x: auto;
    overflow-y: hidden;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
.wrapper .scroller{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    min-width: 100%;
    -webkit-align-self: flex-start;
    align-self: flex-start;
    background-color: #fff;
}
.wrapper .scroller .item{
	display: block;
	background-color: #fff;
	border-bottom: 1px solid #d8d8d8;
	border-right: 1px solid #d8d8d8;

}
.wrapper .scroller .item.current span{
	color: #fff;
	background-color: #00bcf7;
}
.wrapper .scroller .item span{
	display: block;
	width: 7rem;
	padding-left: 1.16rem;
}
.wrapper .scroller .item span:first-of-type{
	padding-top: 1.16rem;
}
.wrapper .scroller .item span:last-of-type{
	padding-bottom: 1.16rem;
}
</style>