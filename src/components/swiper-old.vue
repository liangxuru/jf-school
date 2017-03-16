<!-- 幻灯片模块 -->
<template>
	<div class="carousel-image" :style="{width: widthSize + 'px'}">
		<div>
			<a v-for="item in items" :style="{width: widthSize + 'px'}">
				<img :src="imgServer + item.url"/>
			</a>
		</div>
		<span class="carousel-num">
			<i v-for="n in items.length" :class="n-1==current?'current':''"></i>
		</span>
	</div>
</template>

<script>
	import image from 'lib/CarouselImage'
	export default {
		name: 'swiper',
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
		},
		watch: {
			items: function(){
				this.$nextTick(()=>{
					image.init({
	                    target: $('.carousel-image'),
	                    num: $('.carousel-num')
	                })
				});
			}
		}
	}
</script>

<style scoped>
.carousel-image{
    height:21.57rem;
    overflow: hidden;
    position: relative;
}
.carousel-image div{
    position: absolute;
    height:21.57rem;
}
.carousel-image a{
    display: block;
    float:left;
    height: 100%;
}
.carousel-image a img{
    width:100%;
    height:100%;
    margin:0;
    border:none;
}
.carousel-num {
    position: absolute;
    bottom:1rem;
    text-align: center;
    width: 100%;
}
.carousel-num i{
    cursor: pointer; 
    font-style:normal;
    background-color:#fff;
    color:#fff;
    font-size: 0;
    width: 8px;
    height: 8px;
    border-radius:  8px;
    overflow: hidden;
    margin-left:  .75rem;
    display: inline-block;
}
.carousel-num i.current{
    width: 17px;
    border-radius: 4px;
}
</style>