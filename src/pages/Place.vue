<template>
	<div class="content">
		<div class="banner">
			<div class="pos f24">
				<i class="icon-icon32 pos-icon"></i><span class="f24">{{ place.name }}</span>
			</div>
		</div>
		<ul class="bg big-items f28">
			<li :class="index<3?'noTopBorder':''" v-for="(sport, index) in sportTypes">
				<a v-bind:href="`#/placeinfo?SportsType=${sport.id}`" @click="select(sport.id)">
					<span :class="sport.icon" class="bigIcon"><span>
					<span class="word">{{ sport.name }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import * as Constant from 'lib/constEnum'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'place',
		data(){
			return {
				sportTypes: Constant.sportTypeEnum
			}
		},
		computed: mapState({
		    place: state => state.place.address
		}),
		methods: {
			...mapActions(['addSportType']),
			select(id){
				this.addSportType(id)
			}
		}
	}
</script>

<style scoped>
.banner{
	height: 7rem;
	line-height: 7rem;
	width: 100%;
	overflow: hidden;
	position: relative;
	background: url('../assets/searchpic.png') no-repeat;
}
.banner .pos{
	width: 19.2rem;
	height: 3.2rem;
	line-height: 3.2rem;
	background-color: rgba(255,255,255,.3);
	margin: 0 auto;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	border-radius: 1.6rem;
	text-align: center;
	color: #fff;
}
.banner .pos .pos-icon{
	position: absolute;
	left: 1.4rem;
	top: 50%;
	margin-top: -0.9rem;
	font-size: 1.8rem;
}
.banner .pos:after{
	content: " ";
	display: inline-block;
	width: .8rem;
	height: .8rem;
	border-right: 1px solid;
	border-top: 1px solid;
	transform: rotate(45deg);
	position: absolute;
	right: 1.4rem;
	top: 50%;
	margin-top: -.4rem;
}
.big-items li{
	border-top: 1px solid #d8d8d8;
	text-align: center;
	padding: 2.5rem 0;
	float: left;
	width: 33.333%;
}
.big-items li.noTopBorder{
	border-top-width: 0;
}
.big-items li:nth-child(3n+1),.big-items li:nth-child(3n+2){
	border-right:1px solid #d8d8d8;
}

.bigIcon:before{
	font-size: 3rem;
	color: #00bcf7;
	margin-bottom: 1rem;
}

.word{
	display: block;
	padding-top: .8rem;
}
</style>