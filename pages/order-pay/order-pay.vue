<template>
	<view class="payPage">
		<delivery-layout></delivery-layout>
		
		<view class="goodsList">
			<goods-list></goods-list>
		</view>
		
		<!-- #ifndef MP-WEIXIN -->		
		<view class="payType">
			<view class="box" 
				v-for="item in payType"
				:class="item.value==payDefType?'active':''"
				@click="switchPayType(item.value)"
			>
				<u-icon class="icon" 
					:name="item.icon"
					size="26"
					:color="item.color"
				>
				</u-icon>
				<text class="font">{{item.name}}</text>
			</view>
		</view>		
		
		<!-- #endif -->
		
		<view class="payTabbar">
			<car-layout type="pay"></car-layout>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				payType: [{
					name:"支付宝",
					value:"alipay",
					color:"#1578FF",
					icon:"zhifubao",
				},
				{
					name:"微信",
					value:"wxpay",
					color:"#04C15F",
					icon:"weixin-fill",
				}],
				// #ifdef APP-PLUS || H5
				payDefType: "alipay",
				// #endif
				// #ifdef MP-WEIXIN
				payDefType:'wxpay',
				// #endif
			};
		},
		methods: {
			switchPayType(value){
				this.payDefType = value;
			}
		}
	}
</script>

<style lang="scss" scoped>
page {
	background: $page-bg-color;
}
.payPage {
	padding:30rpx;
	.goodsList {
		margin-top:30rpx;
	}
	.payType {
		@include flex-box();
		.box {
			width: 49%;
			height: 75rpx;
			background: #fff;
			border-radius: 10rpx;
			@include flex-box-set();
			border:1px solid #fff;
			// 对图片进行灰度转换
			filter: grayscale(100%);
			.font {
				padding-left:10rpx;
			}
		}
		.box:first-child.active {
			border-color:#1578FF;
			color:#1578FF;
			filter: grayscale(0%);
		}
		.box:last-child.active {
			border-color:#04C15F;
			color:#04C15F;
			filter: grayscale(0%);
		}
	}
	.payTabbar {
		position: fixed;
		width: 100%;
		bottom:0;
		left:0;
	}
}
</style>
