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
							{{item.name}}
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
								<view class="proItem" v-for="pro in item.children">
									<product-item :item="pro"></product-item>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- footer -->
		<car-layout v-if="CarSelectedNum>0"></car-layout>
	</view>
</template>

<script>
import {mapState, mapMutations, mapGetters} from "vuex";


export default {
	data() {
		return {
			navIdx: 0,
			rightScrollVal: 0,
			leftScrollVal: 0,
			rightHeightArr: [],
			leftHeightArr: [],
			foldState: false, // head whether or not depend
			dataList: [{
				id:1,
				name:"豆干制品",
				children:[{
					id:11,
					name:"卫龙辣条",
					price:10,
					before_price:22,
					thumb:"https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/83562e26-cfac-4cec-8f51-9ae6986942af.jpg",
					numvalue:0
				},{
					id:12,
					name:"卫龙大面筋",
					price:5,
					before_price:12,
					thumb:"https://mp-c422c6b7-799d-4ff5-9531-5051a0481131.cdn.bspapp.com/cloudstorage/30569d48-bb94-40de-8d2b-a3be99d710cd.jpg",
					numvalue:0
				}]
			},{
				id:2,
				name:"饼干糕点",
				children:[{
					id:21,
					name:"丹麦曲奇",
					price:25,
					before_price:36,
					thumb:"https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/6758e11c-949b-48c5-ae69-ddad030c2f94.png",
					numvalue:0
				}]
			},{
				id:3,
				name:"酒水饮料",
				children:[{
					id:31,
					name:"韩国烧酒",
					price:18,
					before_price:29,
					thumb:"https://mp-3309c116-4743-47d6-9979-462d2edf878c.cdn.bspapp.com/cloudstorage/b1a12bee-0602-4cb5-927d-b2b246700e89.jpeg",
					numvalue:0
				}]
			}],
		}
	},
	onLoad() {
		// 在下次 DOM 更新循环结束之后执行延迟回调
		this.$nextTick(()=>{
			this.getHeightArr();
		})
	},
	computed: {
		...mapGetters(["CarSelectedNum"])
	},
	methods: {
		...mapMutations(["SET_FOLD_STATE"]),
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
				this.SET_FOLD_STATE(false);
			}
			if(rScrollTop > 400){
				this.SET_FOLD_STATE(true);
			}
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
