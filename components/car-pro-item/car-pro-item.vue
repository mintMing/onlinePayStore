<template>
	<view class="carProItem">
		<view class="left">
			<view class="pic">
				<image class="img" :src="item.thumb[0].url" mode="aspectFill"></image>
			</view>
			<view class="text">
				<view class="title">{{item.name}}</view>
				<view class="sku" v-if="false">微辣/10包</view>
				<view class="price">
					<view class="minPrice">￥{{ priceFormat(item.price) }}</view>
					<view class="oriPrice">￥{{ priceFormat(item.originalPrice) }}</view>
				</view>
			</view>
		</view>
		<view class="right">
			<stepper :item="item"></stepper>
		</view>
	</view>

</template>

<script>
import { priceFormat, discount } from "@/utils/tools.js";

export default {
	name:"car-pro-item",
	data() {
		return {
			
		};
	},
	props: {
		item: {
			type: Object,
			default: ()=> {
				return  "";
			},
		}
	},
	methods: {
		priceFormat,
		discount,
	}
}
</script>

<style lang="scss" scoped>
.carProItem{
	padding:20rpx 0;
	border-bottom: 1px solid $border-color-light;
	position: relative;
	.left{
		width: 500rpx;
		@include flex-box();
		.pic{
			width: 110rpx;
			height: 110rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			flex:1;
			padding-left:20rpx;
			.title{
				font-size: 28rpx;
				@include ellipsis(2);
			}
			.sku{
				font-size: 22rpx;
				color:#999;
				padding:5rpx 0;
			}
			.price{
				@include flex-box-set(start);
				.minPrice{
					font-weight: bold;
					font-size: 28rpx;
					color:$brand-theme-color;
				}
				.oriPrice{
					font-size: 22rpx;
					color:$text-font-color-3;
				}
			}
		}
	}
	.right{
		position: absolute;
		right: 0;
		bottom:20rpx;
	}
}
</style>