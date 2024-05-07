<template>
	<view class="proItem">
		<view class="proPic">
			<image class="img" src="../../static/logo2.jpg" alt="cb" mode="aspectFill"></image>
		</view>
		<view class="proSelect">
			<view class="proTitle">{{item.name}}</view>
			<view class="priceText">
				<view class="minPrice">¥{{item.price}}</view>
				<view class="oriPrice">¥{{item.before_price}}</view>
			</view>
			<view class="discount">3折</view>
			<view class="numbox">
				<view class="skuSelect" v-if="false">选规格</view>
				<view class="uNum" v-else>
					<stepper :item="item"></stepper>
				</view>
			</view>
		</view>
	</view>
<!-- 	<view class="pro">
		
	</view> -->
</template>

<script>
export default {
	name:"product-item",
	data() {
		return {
			
		};
	},
	props: {
		item: {
			type: Object,
			default() {
				return {};
			},
		},
	}
}
</script>

<style lang="scss" scoped>
.proItem{
	width: 100%;
	@include flex-box();
	padding: 25rpx 0;
	.proPic{
		width: 170rpx;
		height: 170rpx;
		border-radius: 20rpx;
		overflow: hidden;
		.img{
			width: 100%;
			height: 100%;
		}
	}
	.proSelect{
		flex:1;
		padding-left: 20rpx;
		position: relative;
		.proTitle{
			font-size: 34rpx;
			font-weight: bold;
			@include ellipsis();			
		}
		.priceText{
			@include flex-box-set(start,end);
			font-weight: bold;
			padding: 25rpx 0;
			.minPrice{
				font-size: 34rpx;
				color: $brand-theme-color;
			}
			.oriPrice{
				font-size: 26rpx;
				opacity: 0.4;
				text-decoration: line-through;
				padding-left: 10rpx;
			}
		}
		.discount{
			font-size: 22rpx;
			color: $brand-theme-color;
			padding: 3rpx 8rpx;
			border: 1rpx solid $brand-theme-color;
			display: inline-block;
			border-radius: 6rpx;
		}
		.numbox{
			position: absolute;
			right: 0;
			bottom: 0;
			.skuSelect{
				height: 40rpx;
				padding:0 10rpx;
				background: $brand-theme-color;
				font-size: 28rpx;
				color: #fff;
			}
		}
	}
}
</style>