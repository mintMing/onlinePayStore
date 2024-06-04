<template>
	<view class="proDetail">
		<u-popup :show="detailPopState" @close="onClose" closeable round="10">
			<view class="detailWrapper" v-if="detailData.name">
				<view class="top"></view>
				<view class="body">
					<scroll-view class="scrollView" scroll-y="true" >
						<view class="thumb">
							<image class="img" :src="detailData.thumb[0].url" mode="aspectFill"></image>
						</view>
						<view class="info">
							<view class="title">{{ detailData.name }}</view>
							<view class="priceView">
								<view class="price">
									¥{{ priceFormat(detailData.price) }}
								</view>
								<view class="originalPrice" v-if="detailData.originalPrice">
									¥{{ priceFormat(detailData.originalPrice) }}
								</view>
								<view class="discount" v-if="detailData.originalPrice && discount(detailData.price, detailData.originalPrice)">
									{{ discount(detailData.price, detailData.originalPrice) }}
								</view>
							</view>
						</view>
						<view class="detail">
							<view class="text">
								<view class="title">商品描述</view>
								<view class="description">
									<rich-text nodes="detailData.description"></rich-text>
									{{ detailData.description }}
								</view>
							</view>
							<view class="picList">
								<view v-for="(item, index) in detailData.thumb" :key="item.url">
									<image class="img" :src="item.url" mode="widthFix" v-if="index!=0"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="footer">
					<u-button color="#EC544F" icon="shopping-cart" iconColor="#fff">
						加入购物车
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { priceFormat, discount } from "@/utils/tools.js";


export default {
	name:"pro-detail-popup",
	data() {
		return {
			
		};
	},
	computed: {
		...mapGetters(["detailPopState", "detailData"]),
	},
	methods: {
		...mapMutations(["setDetailState"]),
		priceFormat,
		discount,
		onClose() {
			this.setDetailState(false);
		}
	}
}
</script>

<style lang="scss">
.detailWrapper {
	height: 85vh;
	.top {
		height: 80rpx;
		width: 100%;
	}
	.body {
		height: calc(100% - 220rpx);
		.scrollView {
			height: 100%;
			padding: 0 30rpx;
			.thumb {
				width: 690rpx;
				height: 690rpx;
				.img {
					width: 100%;
					height: 100%;
				}
			}
			.info {
				padding: 20rpx 0;
				border-bottom: 1px solid $border-color-light;
				.title {
					font-size: 40rpx;
					font-weight: bold;
				}
				.priceView {
					display: flex;
					align-items: center;
					padding-top: 20rpx;
					.price {
						font-size: 46rpx;
						font-weight: bold;
						color: $brand-theme-color;
					}
					.originalPrice {
						font-size: 28rpx;
						color: $text-font-color-3;
						font-weight: bold;
						text-decoration: line-through;
						margin-left: 10rpx;
					}
					.discount {
						border: 1px solid $brand-theme-color;
						color: $brand-theme-color;
						font-size: 22rpx;
						padding: 2rpx 20rpx;
						margin-left: 10rpx;
						border-radius: 8rpx;
					}
				}
			}
			.text {
				padding: 20rpx 0;
				.title {
					font-size: 32rpx;
					font-weight: bold;
				}
				.description {
					padding: 20rpx 0;
					line-height: 1.7em;
				}
			}
			.picList {
				.img {
					width: 100%;
					margin-bottom: 30rpx;
				}
			}
			.intro {
				padding: 40rpx 0;
				font-size: 30rpx;
				color: $text-font-color-3;
				text-align: center;
			}
		}
	}
	.footer {
		height: 140rpx;
		border-top: 1px solid $border-color-light;
		@include flex-box-set();
		padding: 0 200rpx;
	}
}
</style>