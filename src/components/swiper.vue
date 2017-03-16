<!-- 幻灯片模块 -->
<template>
	<div class="carousel-image">
		<Swipe class="my-swipe" :auto="2000">
			<Swipe-item class="slide slide1" v-for="item in items">
				<a><img :src="imgServer+item.url" /></a>
			</Swipe-item>
		</Swipe>
	</div>
</template>

<script>
	import { Swipe, SwipeItem } from 'vue-swipe'
	export default {
		name: 'swiper',
		components: {
			Swipe,
			SwipeItem
		},
		data(){
			return {
				widthSize: document.body.offsetWidth,
                imgServer: __imgServer
			}
		},
		props: {
			items:{
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lange="less" scoped>

.swiper_container{
	height: 21.57rem;
}
.carousel-image{
    height:21.57rem;
    overflow: hidden;
    position: relative;
}
.carousel-image div{
    position: absolute;
    height: 100%;
    width: 100%;
}
.carousel-image a{
    display: block;
    float: left;
    height: 100%;
}
.carousel-image a img{
    width:100%;
    height:100%;
    margin:0;
    border:none;
}
.mint-swipe,.mint-swipe-items-wrap{
	overflow:hidden;
	position:relative;
	height:100%
}
.mint-swipe-items-wrap>div{
	position:absolute;
	-webkit-transform:translateX(-100%);
	transform:translateX(-100%);
	width:100%;
	height:100%;
	display:none
}
.mint-swipe-items-wrap>div.is-active{
	display:block;
	-webkit-transform:none;
	transform:none
}
</style>
<style lange="less">
.mint-swipe-indicators{
	position:absolute;
	bottom:10px;
	left:50%;
	-webkit-transform:translateX(-50%);
	transform:translateX(-50%)
}
.mint-swipe-indicator{
	width: 8px;
	height: 8px;
	display:inline-block;
	border-radius:50%;
	background:#fff;
	margin:0 3px
}
.mint-swipe-indicator.is-active{
	width: 17px;
	border-radius: 4px;
}
</style>