<template>
	<div class="wrapper">
		<div class="scroller">
			<a :class="'item ' + (index==current?'current':'')" v-for="(item, index) in items" :href="item.path">
				<span class="f24">{{ item.Week }} <span v-show="item.Price"><i class="c_gold">￥{{ item.Price }}</i>起</span></span>
				<span class="f20">{{ item.ADate | DateFormat('MM/dd') }}</span>
				<span class="f22">剩余{{ item.count }}</span>
			</a>
		</div>
	</div>
</template>

<script>
import { go } from 'lib/util'
	export default {
		name: 'calendar',
		props: ["items"],
		data(){
			return {
				current: 0
			}
		}
	}
</script>

<style scoped>
/*蓝色日历*/
.wrapper{
	width: 100%;
	height: 100%;
	overflow-x: auto;
    overflow-y: hidden;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
	padding: 1.16rem 0;
	border-top: 1px solid #d8d8d8;
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
}
.wrapper .scroller .item{
	display: block;
	margin-right: 3px;
	background-color: #6cd9fd;
	padding: 1rem;
    width: 10rem;
    height: 8rem;
}
.wrapper .scroller .item.current span{
	color: #fff;
}
.wrapper .scroller .item span{
	display: block;
	min-width: 10rem;
    padding-bottom: .5rem;
}
</style>