<template>
	<view class="proItem" @click="showDetail">
		<view class="proPic">
			<image class="img" :src="item.thumb[0].url" alt="cb" mode="aspectFill"></image>
		</view>
		<view class="proSelect">
			<view class="proTitle">{{item.name}}</view>
			<view class="priceText">
				<view class="minPrice">¥{{ priceFormat(item.price) }}</view>
				<view class="oriPrice" v-if="item.originalPrice">¥{{ priceFormat(item.originalPrice) }}</view>
			</view>
			<view 
				class="discount" 
				v-if="item.originalPrice && discount(item.price, item.originalPrice)" 
			>
				{{ discount(item.price, item.originalPrice) }}
			</view>
			<view class="numbox">
				<view class="skuSelect" v-if="item.skuSelect.length">选规格</view>
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
import { priceFormat, discount } from '../../utils/tools';
import { mapMutations } from "vuex";
	
export default {
	name: "product-item",
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
	},
	methods: {
		...mapMutations(["setDetailState", "setDetailData"]),
		priceFormat,
		discount,
		showDetail(){
			this.setDetailState(true);
			this.setDetailData(this.item);
		},
	}
}
</script>

<style lang="scss" scoped>
.proItem{
	width: 100%;
	// @include flex-box();
	padding: 25rpx 0;
	display: flex;
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
		//border: 1px solid red;
		.proTitle{
			font-size: 34rpx;
			font-weight: bold;
			@include ellipsis();			
		}
		.priceText{
			@include flex-box-set(start, end);
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