<template>
	<view class="orderPage">
		<view class="row" v-for="item in 5" @click="goDetail(item)">
			<!-- 每一个停单的头部信息 -->
			<view class="head">
				<view class="number">编号123456<text class="way">商家外送</text></view>
				<text class="way self">到店自提</text>
				<view class="state">						
					<u-icon name="weixin-fill" size="22" color="#04C15F"></u-icon>
					<text>已支付</text> 
				</view>	
			</view>
			<!-- 具体订单物品 -->
			<view class="body">卫龙大面筋</view>
			<!-- 订单信息 -->
			<view class="footer">
				<view class="time">2023-06-10 18:20</view>
				<view class="count">
					共2件商品 ，实付<text class="price">￥33.3</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			//跳转到详情页
			goDetail(value) {
				uni.navigateTo({
					url: "/pages/order/detail?item=" + value
				});
			},
			
		},
	}
</script>

<style lang="scss" scoped>
page{
	background: $page-bg-color;
}
.orderPage{
	padding:30rpx;
	.row{
		background: #fff;
		padding:40rpx 20rpx;
		border-radius: 20rpx;
		margin-bottom:30rpx;
		.head{
			@include flex-box();
			font-size:32rpx;	
			.number{
				@include flex-box-set(start);
			}
			.way{
				background: #19be6b;
				color:#fff;
				font-size: 22rpx;
				padding:6rpx 20rpx;
				border-radius: 30rpx;
				margin-left: 10rpx;
				&.self{
					background: #FF9100;
				}
			}
		}
		.state{
			color:$brand-theme-color-aux;
			@include flex-box-set(start);
		}
	}
	.body{
		border:1px solid $border-color;
		padding:60rpx 20rpx;
		border-radius: 10rpx;
		background: #F9F9F9;
		font-size: 34rpx;
		margin:30px 0;
	}
	.footer{
		@include flex-box();
		font-size: 26rpx;
		color:#a5a5a5;
		.price{
			font-weight: bold;
			color:#000;
		}
	}
}
</style>
