<template>
	<div v-if="showme">
		<div v-if="productId">
			<swiper v-bind:items="imgs"></swiper>
			<div class="flex-box">
				<aside>
					<div class="f28 mg78">{{ info.productName }} ({{ detail.openTime }}-{{ detail.closeTime }})</div>
					<div class="f24 sub text-overflow"><i class="icon-icon20"></i>{{ detail.address }}</div>
				</aside>
				<a :href="'tel:' +detail.telephone" class="tel icon-icon21 cPrice"></a>
			</div>

			<div class="bg">
				<div class="part f28">场地预定</div>
				<calendar v-bind:items="weekdays"></calendar>
			</div>

			<div class="bg">
				<tab v-bind:items="['详情','评论']" v-bind:current="tabindex"></tab>
				<div v-show="tabindex === 0" class="part" v-html="info.long_description">
				</div>
				<div v-show="tabindex === 1">
					<div class="part" style="text-align:center;">暂无评论</div>
					<!-- <comment></comment> -->
				</div>
			</div>
		</div>
		<div class="noData" v-else>
	        <span>还没有数据哦</span>
	    </div>
    </div>
</template>

<script>
	import swiper from 'components/swiper'
	import calendar from 'components/calendar1'
	import tab from 'components/tab'
	import { Request } from 'service/requests' 
	import { mapState, mapActions } from 'vuex'
	import { weekdayEnum } from 'lib/constEnum'
	import lazylist from 'lib/lazylist'
	export default {
		name: 'placeinfo',
		components: {
			swiper,
			calendar,
			tab
		},
		data(){
			return {
				SportsType: this.$route.query.SportsType,
                productId: 1,
                imgs: [],
	        	weekdays: [],
	        	info: {},
	        	detail: {},
	        	showme: false
			}
		},
		computed: mapState({
			spid: state => state.place.address.id,
			tabindex: state => state.place.tabindex
		}),
		methods: mapActions(['setLoading', 'setProductId']),
		created(){
			this.setLoading(true);
			Request.GetProductsBySportType({
				SportType: this.SportsType,
				spid: this.spid
			}).then((data)=>{
				this.productId = data && data.length && data[0].productId || 0;
				this.setProductId(this.productId);
				return this.productId;
			}).then((productId)=>{
				lazylist([
						Request.GetPrductById({
	                        ProductId: productId
	                    }).then(data=>{
	                    	return data;
	                    }),
	                    Request.GetWeekdays({
	                        ProductId: productId,
	                        spid: this.spid,
	                        Date: (new Date() + '').formatDate('yyyy-MM-dd'),
	                        Datecount: 7
	                    }).then((data)=>{
	                    	return data;
	                    })
					]).then(values=>{
						//基础信息
						this.info = values[0].info;
                        this.detail = values[0].detail;
                        if(values[0].info){
                            this.imgs.push({id: 1, url: values[0].info.PollingImg1});
                            this.imgs.push({id: 2, url: values[0].info.PollingImg2});
                            this.imgs.push({id: 3, url: values[0].info.PollingImg3});
                        }
                        //日历
                        var curr = new Date() + '';
                        function getWeekday(date){
                            if(date.formatDate('yyyy-MM-dd') == curr.formatDate('yyyy-MM-dd')){
                                return '今天';
                            }else{
                                return weekdayEnum[new Date(date).getDay()];
                            }
                        }
                        values[1].forEach(function(item, i){
                            item.Week = getWeekday(item.ADate);
                            item.path = `#placebook/?productId=${this.productId}&date=${item.ADate.formatDate('yyyy-MM-dd')}`;
                        }.bind(this));
                        this.weekdays = values[1];

                        this.setLoading(false);
                        this.showme = true;
				});
			});
		}
	}
</script>

<style scoped>
.tel{
    display: inline-block;
    width: 5rem;
    text-align: center;
    border-left: 1px solid #DDD8CE;
    font-size: 2.6rem;
    height: 4rem;
    line-height: 4rem;
}
.des{
    padding: 0 10px;
}
.noData{
    width:10.5rem;
    height:10rem;
    background-image:url(../assets/nodata.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
    margin-left:-5.25rem;
    position:absolute;
    left:50%;
    top:50%;
    margin-top:-10rem;
    font-size:1.5rem;
    line-height:24rem;
    text-align:center;
}
</style>