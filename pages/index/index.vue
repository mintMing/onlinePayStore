<template>
	<view class="home">
		<!-- top -->
		<head-bar id="headBar" :foldState="foldState"></head-bar>
		<!-- middle -->
		<view class="wrapper">
			<!-- middle of head -->
			<view class="headLayout">
				<view class="leftLayout">
					免费配送
				</view>
				<navigator class="rightLayout" url="/pages/order/order">
					<u-icon name="order" color="#576b95" size="22"></u-icon>
					我的订单
				</navigator>
			</view>
			<!-- middle of content -->
			<view class="middleContent">
				<view class="leftContent">
					<scroll-view class="ScContent" 
						scroll-y
						:scroll-top="leftScrollVal"
						scroll-with-animation
					>
						<view class="itemNav" 
							v-for="(item, index) in dataList"
							:key="item.id"
							:class="index==navIdx?'active':''"
							@click="clickNav(index)"
						>
							{{ item.name }}
						</view>
					</scroll-view>
				</view>
				<view class="rightContent">
					<navigator class="search" url="/pages/search/search">
						<u-icon name="search" size="22" color="#576b95"></u-icon>
						搜索
					</navigator>
					<scroll-view class="ScContent" 
						scroll-y 
						:scroll-top="rightScrollVal"
						scroll-with-animation
						@scroll="rightScrollEnt"
					>
						<!-- large category box -->
						<view class="proClass" v-for="item in dataList">
							<u-sticky :customNavHeight="0" zIndex="2">
								<view class="proTitle">{{item.name}}</view>
							</u-sticky>
							<view class="subPro">
								<!-- little category box -->
								<view class="proItem" v-for="pro in item.proGroup">
									<product-item :item="pro"></product-item>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		<!-- 商品详细 -->
		<pro-detail-popup></pro-detail-popup>
		
		
		<!-- footer -->
		<car-layout v-if="CarSelectedNum>0"></car-layout>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";

const goodsCloudObj = uniCloud.importObject("mint-mall-goods");

export default {
	data() {
		return {
			navIdx: 0,
			rightScrollVal: 0,
			leftScrollVal: 0,
			rightHeightArr: [],
			leftHeightArr: [],
			foldState: false, // head whether or not depend
			dataList: [],
		}
	},
	async onLoad() {
		// await 解决内容与高度计算的优先级
		await this.getGoodsData();
		// 在下次 DOM 更新循环结束之后执行延迟回调
		this.$nextTick(()=>{
			this.getHeightArr();
		});
		
		
	},
	computed: {
		...mapGetters(["CarSelectedNum"])
	},
	methods: {
		...mapMutations(["setFoldState"]),
		clickNav(index){
			if(this.navIdx == index){
				return;
			}
			this.navIdx = index;
			if(this.timeout){
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(()=>{
				this.rightScrollVal = this.rightHeightArr[index]
				this.leftScrollVal = this.leftHeightArr[index];
			}, 100)
		},
		getHeightArr(){
			// 获取 selectorQuery 对象
			let selectorQuery = uni.createSelectorQuery();
			// 获取导航高度
			let headBarHeight;
			selectorQuery.select("#headBar").boundingClientRect(rects=>{
				headBarHeight = rects.height;
			}).exec(); 
			
			// 查询所有类navItem的元素的大小及其相对于视口的位置
			selectorQuery.selectAll(".proClass").boundingClientRect(rects=>{
				this.rightHeightArr = rects.map(item=> item.top - headBarHeight- 40);
			}).exec(); 
			selectorQuery.selectAll(".itemNav").boundingClientRect(rects=>{
				this.leftHeightArr = rects.map(item=> item.top - headBarHeight- 40);
			}).exec(); 
		},
		// 右侧滚动条的高度
		rightScrollEnt(event) {
			// 向上取值修正比例小数问题
			let rScrollTop = Math.ceil(event.detail.scrollTop);
			let rTarIndex = this.rightHeightArr.findIndex((value, index, arr)=>{
				return rScrollTop >= value && rScrollTop < arr[index + 1];
			});
			this.navIdx = rTarIndex;
			this.leftScrollVal = this.leftHeightArr[rTarIndex];
			
			if(rScrollTop < 300){
				this.setFoldState(false);
			}
			if(rScrollTop > 400){
				this.setFoldState(true);
			}
		},
		async getGoodsData() {
			let res = await goodsCloudObj.getList();
			console.log(res.data);
			res.data.forEach((item, index)=> {
				item.proGroup.forEach((child, idx)=> {
					res.data[index].proGroup[idx].numvalue = 0;
				});
			});
			this.dataList = res.data;
			
		}
	}

}
</script>

<style lang="scss" scoped>
.home {
	height: 100vh;
	display: flex;
	flex-direction: column;
	.wrapper {
		flex: 1;
		background: #fff;
		// 统一高度计算单位
		border-radius: 10px 10px 0 0;
		margin-top: -10px;
		position: relative;
		z-index: 2;
		overflow: hidden;
		.headLayout {
			color: $text-font-color-1;
			@include flex-box();
			// 统一高度计算单位
			height: 50px;
			background: #fff;
			padding: 0 30rpx;
			border-bottom: 1px solid $border-color;
			font-size: 32rpx;
			.rightLayout {
				@include flex-box();
				color: $brand-theme-color-aux;
			}
		}
		.middleContent{
			// middle of Box - headLayou of Box
			height: calc(100% - 100rpx); 
			@include flex-box();
			.leftContent{
				height: 100%;
				width: 190rpx;
				border-right: 1px solid $border-color;
				background: $page-bg-color;
				.itemNav{
					font-size: 30rpx;
					padding-left: 30rpx;
					line-height: 100rpx;
					color: $text-font-color-2;
					position: relative;
					&.active{
						color: $text-font-color-1;
						background: #fff;
						&::after { // right little red bar
							content: "";
							width: 6rpx;
							height: 30rpx;
							background: $brand-theme-color;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
			.rightContent{
				height: 100%;
				flex: 1;
				position: relative;
				.search{
					position: absolute;
					top: 0;
					right: 30rpx;
					z-index: 3;
					@include flex-box-set();
					height: 90rpx;
					color: $brand-theme-color-aux;
				}
				.proClass{
					padding: 0 30rpx;
					.proTitle{
						line-height: 90rpx;
						font-size: 30rpx;
						background: #fff;
					}
				}
			}
			.ScContent{
				height: 100%;
			}
		}
	}
}

</style>
