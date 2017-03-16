<template>
	<div class="content">
		<swiper v-bind:items="imgs"></swiper>
		<div class="bg f28">
			<div class="part">青少年素质成长</div>
			<ul class="items">
				<li>
					<a>
						<span class="icon-icon1"></span>
						<span class="word">课程</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-icon2"></span>
						<span class="word">教练</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="bg f28">
			<div class="part">体育文化传播</div>
			<ul class="items">
				<li>
					<a href="#/place">
						<span class="icon-icon3"></span>
						<span class="word">场馆</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-icon4"></span>
						<span class="word">运动装备</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-icon5"></span>
						<span class="word">精彩赛事</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-icon6"></span>
						<span class="word">活动</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-icon7"></span>
						<span class="word">积分商城</span>
					</a>
				</li>
				<li>
					<a>
						<span class="icon-iconx"></span>
						<span class="word">&nbsp;</span>
					</a>
				</li>
			</ul>
			<div style="height: 49px;"></div>
		</div>
		<div class="footer">
			<ul>
				<li>
					<a class="item">
						<span class="icon-icon8 cPrice" style="font-size: 2rem;"></span><span class="word f20">首页</span>
					</a>
				</li>
				<li>
					<a class="item" @click="showCover()">
						<span class="icon-icon9 item_yue cPrice"></span><span class="f24 word">约</span>
					</a>
				</li>
				<li>
					<a class="item">
						<span class="icon-icon10 sub" style="font-size: 2rem;"></span><span class="word f20">我的</span>
					</a>
				</li>
			</ul>
		</div>

		<template v-if="showYue">
			<div class="cover-bg"></div>
			<div class="flex-box cover-content">
				<div class="aside">
					<div class="L-yue">约人</div>
				</div>
				<div class="aside">
					<div class="R-yue">求约</div>
				</div>
			</div>
			<div class="cover-footer" @click="closeCover()"></div>
		</template>
	</div>
</template>

<script>
import swiper from 'components/swiper'
export default {
  name: 'home',
  components: {
  	swiper
  },
  data () {
    return {
      imgs: [{
			id: 1,
			url: '../resource/banner.png',
		},{
			id: 2,
			url: '../resource/Bitmap3.png'
		}],
	    showYue: false
    }
  },
  methods: {
  		showCover(){
  			this.showYue = true;
  		},
  		closeCover(){
  			this.showYue = false;
  		}
  }
}
</script>

<style scoped>
.items{
	list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.items li{
	display: inline-block;
	float: left;
	width: 50%;
	border-top: 1px solid #d8d8d8;
	text-align: center;
	padding: 1rem;
}
.items li:nth-child(2n){
	border-left:1px solid #d8d8d8;
}
.word{
	display: block;
}
.items [class^="icon-"]:before,.items [class*=" icon-"]:before{
	font-size: 3rem;
	color: #00bcf7;
}
.icon-icon9:before{
	font-size: 4rem;
    position: absolute;
    top: 8px;
    left: 5px;
}
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	margin-top: 0.78rem;
}
.footer ul{
	width: 100%;
	display: flex;
	align-items: center; 
  	-webkit-align-items: center;
  	justify-content: center;
  	-webkit-justify-content: center;
  	border-top: 1px solid #d8d8d8;
}
.footer ul li{
	flex: 1;
	text-align: center;
	background-color: #fff;
}
.footer .item{
	display: inline-block;
	position: relative;
}
.footer .item .item_yue{
	display: inline-block;
    width: 60px;
    height: 30px;
    border: 1px solid #d8d8d8;
    border-radius: 30px 30px 0 0;
    position: relative;
    top: -30px;
    background-color: #fff;
    border-bottom-width: 0;
}
.cover-bg{
	background-color: rgba(255, 255, 255, .8);
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 100;
}
.cover-content{
	position: absolute;
	bottom: 9.8rem;
	left: 0;
	right: 0;
	z-index: 101;
}
.cover-content .L-yue, .cover-content .R-yue{
	width: 10.7rem;
	height: 10.7rem;
	line-height: 10.7rem;
	text-align: center;
	color: #fff;
	border-radius: 50%;
	font-size: 2.5rem;
	margin: 0 auto;
}
.cover-content .L-yue{
	background-color: #ffb500;
}

.cover-content .R-yue{
	background-color: #00bcf7;
}

.cover-footer{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 8.8rem;
	line-height: 8.8rem;
	z-index: 101;
	text-align: center;
}
.cover-footer:after{
	content: "+";
	display: inline-block;
	transform: rotate(45deg);
	font-size: 7rem;
	color: #888889;
}
</style>