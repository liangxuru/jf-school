<template>
	<ul class="tabs f28">
		<li :style="{width: width}" :class="'tab part ' + (index==current?'current':'')" @click="select(index)" v-for="(item, index) in items">{{ item }}</li>
	</ul>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'tab',
		props: {
			current: {
				type: Number,
				default: 0
			},
			items:{
				type: Array,
				default: []
			}
		},
		data(){
			return {
				width: 0
			}
		},
		methods: {
			...mapActions(['changeTab']),
			select(value){
				this.changeTab(value);
			}
		},
		created() {
			this.current = this.current || 0;
            this.width = $(window).width()/this.items.length + 'px';
		}
	}
</script>

<style scoped>
.tabs{
	overflow: hidden;
	background-color: #fff;
	width: 100%;
}
.tabs .tab{
	border-bottom: 2px solid #d8d8d8;
	text-align: center;
	position: relative;
	-moz-transition: all 0.5s ease-in;
    -webkit-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
    float: left;
    box-sizing: border-box;
}
.tabs .tab.current{
	border-bottom: 2px solid #00bcf8;
}
.tabs .tab:nth-child(2n)::before,.tabs .tab:nth-child(3n)::before{
	content: " ";
	display: inline-block;
	height: 50%;
	width: 1px;
	position: absolute;
	left: 0;
	border-left: 1px solid #d8d8d8;
}
</style>