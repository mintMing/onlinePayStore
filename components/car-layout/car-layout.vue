<template>
	<view>
		<view class="carLayout">
			<view class="goods" v-if="carShow">
				<view class="goodsHead">
					<view class="Protext">已选商品</view>
					<view class="empty">清空</view>
				</view>
				
				<scroll-view scroll-y="true" class="Carbody">
					<view class="sContent">
						<view class="carItem" v-for="item in carsList">
							<car-pro-item :item="item"></car-pro-item>
						</view>
					</view>
				</scroll-view>
			</view>
			

			<view class="content">
				<view class="left">
					<view class="icon" 
						hover-class="iconhover"
						hover-stay-time="50"
						@tap="clickCarIcon"
						v-if="!type"
					>
						<u-icon name="shopping-cart" size="34" color="#EC544F"></u-icon>
						<view class="num">{{CarSelectedNum}}</view>
					</view>
					<view class="amountPrice">合计
						<text class="text">￥{{getAmountPrice}}</text>
					</view>
				</view>
				<view class="right">
					<view class="btn disable" v-if="!type" @click="goPay">选好了</view>
					<view class="btn" v-else @click="confirmPay">支付</view>
				</view>
			</view>
			<!-- iphone of footer state bar -->
			<view class="safe-area-bottom"></view>
		</view>
		<u-overlay :show="carShow" z-index="9" @click="carShow=false" duration="100"></u-overlay>
	</view>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name:"car-layout",
	data() {
		return {
			carShow: false
		};
	},
	computed: {
		...mapGetters(["carsList", "getAmountPrice", "CarSelectedNum"])
	},
	methods: {
		clickCarIcon() {
			this.carShow = !this.carShow;
		},
		goPay() {
			uni.navigateTo({
				url: "/pages/order-pay/order-pay"
			})
		},
		confirmPay() {
			
		}
	},
	props: {
		type: String,
		default: "",
	}
}
</script>

<style lang="scss" scoped>
.carLayout{
	position: relative;
	z-index: 10;
	.goods{
		border-bottom: 1px solid $border-color-light;
		padding: 30rpx 30rpx 0;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
		.goodsHead{
			@include flex-box();
			color: $text-font-color-3;
			padding: 25rpx 0;
			.empty{
				color: $brand-theme-color-aux;
			}
		}
		.Carbody{
			height: 550rpx;
		}
	}
	.content{
		@include flex-box();
		padding:0 30rpx;
		height: 140rpx;
		background: #fff;
		.left{
			@include flex-box();
			.icon{
				width: 80rpx;
				height: 80rpx;
				background: #EEEFEE;
				border-radius: 10rpx;
				@include flex-box-set();
				position: relative;
				margin-right: 30rpx;
				.num{
					width: 36rpx;
					height: 36rpx;
					background: $brand-theme-color;
					border-radius: 50%;
					color:#fff;
					position: absolute;
					right:-18rpx;
					top:-18rpx;					
					font-size: 22rpx;
					@include flex-box-set();
				}
			}
			.iconhover{
				transform: scale(0.9);
			}
			.amountPrice{
				font-size: 28rpx;
				.text{
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
		.right{
			.btn{
				width: 210rpx;
				height: 75rpx;
				background: $brand-theme-color;
				@include flex-box-set();
				color:#fff;
				border-radius: 10rpx;	
				&.disable{
					opacity: 0.6;
				}
			}
		}
	}
	.safe-area-bottom{
		width: 100%;
		height: env(safe-area-inset-bottom);
		background: #fff;
	}
}
</style>