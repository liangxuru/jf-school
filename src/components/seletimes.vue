<template>
	<div>
		<div class="seletimes">
			<div style="width: 10000px; padding-left: 7rem;">
				<dl v-for="item in horizontal">
					<dt id="changdi">{{ item.AGroundFieldFrontStr}}</dt>
					<template v-for="it in item.AGroundResourcePriceList">
						<dd v-if="it.AStatus && (new Date(it.AStartDate.substring(0,10).replace('-','/').replace('-','/')+' '+it.AStringTime)>new Date())" @click="choose(it, $event)" :class="`vv_sel_${compute_state(it)}`">{{it.APrice | currency }}</dd>
						<template v-else>
							<dd v-if="!it.AStatus && it.ACustomId==memberId" class="vv_sel_5 icon-right"></dd>
							<dd v-else class="vv_sel_3"></dd>
						</template>
					</template>
				</dl>
			</div>
		</div>
		<div class="selectnom">
			<div style="height: 33px;"></div>
			<em v-for="item in vertical">{{ item }}</em>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		name: 'seletimes',
		props: ["vertical", "horizontal"],
		computed: {
			...mapState({
				memberId: state=>state.common.user.memID
			}),
		},
		methods: {
			...mapActions(['setResource']),
            choose: function(item, e){
            	this.setResource(item);//1:选择 3:未选
                if(item.AStatus === 1){
                    this.ball_fly(e);
                }
            },
            compute_state: (it)=>{
				return it.AStatus===1?'1': (it.AOccupiedFrom==2||it.AOccupiedFrom==3?'4':'');
			},
            ball_fly (e) {
              // 被点元素宽高
              var bound = e.target.getBoundingClientRect(); // 被点元素位置
              // 创造元素
              var qiu = document.createElement('div');
              qiu.className = 'qiu';
              qiu.style.top = bound.top + 'px';
              qiu.style.left = bound.left + 'px';
              document.body.appendChild(qiu);
              // 目标元素位置
              var dsa = this.$parent.$refs.carIcon;
              var mubiao = dsa.getBoundingClientRect();
              var mubiaoT = mubiao.top;
              var mubiaoL = mubiao.left;
              var timer = null;
              // top差值 left差值
              var chaTop = mubiaoT - bound.top;
              // 要减掉目标宽度一半 让落点对准目标中心
              var chaLeft = bound.left - mubiaoL - dsa.offsetWidth / 2;
              // 规定上抛初速度为 top 差值的55分之1
              var g = chaTop / 55;
              // 规定上抛初速度为 top 差值的15分之1
              var vTop = chaTop / 15;
              timer = setInterval(function(){
                qiu.style.top = (qiu.getBoundingClientRect().top + (-vTop + g)) + 'px';
                qiu.style.left = (qiu.getBoundingClientRect().left + (-chaLeft / 14)) + 'px';
                // 每次 g 对速度的影响
                vTop -= g;
                if (qiu.getBoundingClientRect().top >= mubiaoT) {
                  clearInterval(timer);
                  qiu.parentNode.removeChild(qiu);
                  this.$parent.$refs.carIcon.classList.add('tantantan');
                }
              }.bind(this), 1000 / 25);
            }
		},
        mounted(){
            // 给购物车添加animationend事件，动画结束后去掉有animation的class
            this.$parent.$refs.carIcon.addEventListener('animationend', () => {
              this.$parent.$refs.carIcon.classList.remove('tantantan');
            }, false);
        }
	}
</script>
<style scoped>
.seletimes {
    text-align: center;
    line-height: 1.5em;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select:none;
    padding-bottom: 33px;
}
.selectnom {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    width:70px;
}
.seletimes dd,.seletimes dt{
	margin: 0;
	padding: 0;
}
.seletimes dl {
    width: 70px;
    float: left;
}
.seletimes dl:last-of-type dd{
    border-right: 1px solid #d8d8d8;
}
.seletimes dl dt {
    line-height: 30px;
    border-bottom: 1px solid #d8d8d8;
    max-width: 70px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.seletimes dl dd {
    width: 70px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #d8d8d8;
    border-left: 1px solid #d8d8d8;
}
.seletimes dl dd.vv_sel_4 {
    box-shadow: 0px 0px 0px 2px #FFB500 inset;
}
.seletimes dl dd.vv_sel_3 {
    background: #f2f2f2;
    color: #ccc;
}
.seletimes dl dd.vv_sel_1 {
    background: #00bcf7;
    color: #fff;
}
.seletimes dl dd.vv_sel_5 {
    background: #00bcf7;
    color: #fff;
    text-align: center;
    font-size: 1.6rem;
}
.selectnom em {
    display: block;
    height: 30px;
    line-height: 0;
    color: #666;
    text-align: center;
    position: relative;
    font-style: normal;
}
.selectnom em:before {
    position: absolute;
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 3px solid transparent;
    border-left: 6px solid #999;
    border-bottom: 3px solid transparent;
    right: 5px;
    bottom: 30px;
}
</style>
<style lange="less">
/*购物车动画*/
.qiu{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: #00bcf7;
  position: fixed;
  z-index: 9;
  webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes mymove{
   0%   { -webkit-transform: scale(1) }
   25%  { -webkit-transform: scale(.8) }
   50%  { -webkit-transform: scale(1.1) }
   75%  { -webkit-transform: scale(.9) }
   100% { -webkit-transform: scale(1) }
}
@keyframes mymove{
   0%   { transform: scale(1) }
   25%  { transform: scale(.8) }
   50%  { transform: scale(1.1) }
   75%  { transform: scale(.9) }
   100% { transform: scale(1) }
}
/* 购物车弹弹弹 */
.tantantan{
  -webkit-animation:mymove 1s;
  animation:mymove 1s;
}
</style>