<template>
	<div>
		<div class="seletimes">
			<div style="width: 10000px; padding-left: 7rem;">
				<dl v-for="item in horizontal">
					<dt id="changdi">{{ item.AGroundFieldFrontStr}}</dt>
					<template v-for="it in item.AGroundResourcePriceList">
						<dd v-if="it.AStatus && (new Date(it.AStartDate.substring(0,10).replace('-','/').replace('-','/')+' '+it.AStringTime)>new Date())" @click="choose(it)" :class="`vv_sel_${compute_state(it)}`">{{it.APrice | currency }}</dd>
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
            choose: function(item){
            	this.setResource(item);//1:选择 3:未选
            },
            compute_state: (it)=>{
				return it.AStatus===1?'1': (it.AOccupiedFrom==2||it.AOccupiedFrom==3?'4':'');
			}
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