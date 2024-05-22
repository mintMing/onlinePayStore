<template>
	<!-- <view> -->
		<view class="customHead" :style="{height:getTitalHeight+'px'}" >
			<!--  -->
			<view class="headBg">
				<image class="headBgImg" src="../../static/logo2.jpg" mode="aspectFill"></image>
			</view>
			
			<view class="container">
				<!-- title -->
				<view class="statusBar" :style="{height:statusBarHeight+'px'}"></view>
				<view class="server" 
					:style="{height:titleBarHeight+'px'}"
					v-if="!foldState"
				>
					<view class="cusServiceLogn">
						<u-icon name="server-fill" size="22" color="#fff"></u-icon>
					</view>
					<navigator url="/pages-manage/index/index" class="manage">
						<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
						后台管理 
					</navigator>
				</view>
				<!-- logn -->
				<view class="LognBody"
					:class="foldState?'fold':''"
					:style="{height:bodyBarHeight+'px'}"
				>
					<view class="lognBrand" @click="clickBrand">
						<view class="pic">
							<image class="img" src="" mode="aspectFill"></image>
						</view>
						<view class="text">
							<view class="title">
								<text class="font">test</text>
								<u-icon class="icon" name="more-circle" size="22" color="#fff"></u-icon>
							</view>
							<view class="des">
								test
							</view>
						</view>
					</view>
					<view class="code">
						<view class="pic">
							<image class="img" src="../../static/TEST.png" mode="aspectFill"></image>
						</view>
						<text class="pay">付款</text>
					</view>
				</view>
			</view>
		<!-- </view> -->
		
		<!-- <view> -->
			<!-- 底部商家信息弹窗 -->
			<uni-popup ref="merchantInfoPopup" type="bottom">
				<view class="merchantInfoWrapper">
					<view class="close" @click="closeMerchPop">
						<u-icon name="arrow-down" color="#666"></u-icon>
					</view>
					
					<view class="merchBox">
						<view class="pic">
							<image class="img" src="" mode="aspectFill"></image>
						</view>
						<view class="title">
							tes
						</view>
						<view class="des">
							tes
						</view>
					</view>
					
					<view class="cell">
						<u-cell icon="phone" title="getMerchantInfo.mobile" isLink></u-cell>
						<u-cell icon="map" title="getMerchantInfo.address" isLink></u-cell>
					</view>
					
				</view>
				<view class="safe-area-bottom"></view>
			</uni-popup>
		</view>
		
	<!-- </view> -->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
//const brandCloudObj = uniCloud.importObject("mint-mall-merchantInfo");

export default {
	name: "head-bar",
	data() {
		return {};
	},
	props: {},
	mounted(){

	},
	computed: {
		...mapGetters(["statusBarHeight", "titleBarHeight", "bodyBarHeight", 
			"getTitalHeight", "foldState"]),
	},
	created() {
		/*
		brandCloudObj.mIget().then((res)=> {
			this.SET_BRAND(res.data[0]);
		})
		*/
	   //this.GET_BRAND_DATA();
	},
	methods: {
		//...mapMutations(["SET_BRAND"]),
		//...mapActions(["GET_BRAND_DATA"]),
		// 商家信息弹窗
		clickBrand() {
			this.$refs.merchantInfoPopup.open();
		},
		closeMerchPop() {
			this.$refs.merchantInfoPopup.close();
		},
	}
}
</script>

<style lang="scss" scoped>
.customHead{
	height: 200rpx;
	overflow: hidden;
	position: relative;
	.headBg{
		width: 100%;
		height: 100%;
		background: #000;
		.headBgImg{
			width: 100%;
			height: 100%;
			filter: blur(30rpx);
			transform: scale(2);
		}
	}
	.container{
		position: absolute;
		top: 0;
		left: 0;		
		width: 100%;
		.statusBar{			
			// 系统状态栏高度
			//height: var(--status-bar-height);
			//border: 1px solid red;
		}
		.titleBar{
			//border: 1px solid green;
		}
		.server{
			padding-left: 30rpx;
			@include flex-box-set(start);
			color:#fff;
			.manage{
				margin-left: 20rpx;
				@include flex-box-set(start);
			}
		}
		.LognBody{
			@include flex-box();
			padding:0 45rpx;
			height: 100px;			
			transition: 0.4s;			
			.lognBrand{
				width: 580rpx;
				@include flex-box-set(start);
				.pic{
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
					overflow: hidden;
					transition: 0.3s;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					flex: 1;
					padding:0 30rpx;
					color:#fff;
					.title{
						font-size: 36rpx;
						font-weight: 800;						
						display: flex;
						align-items: center;
						.font{
							margin-right: 10rpx;
						}
					}
					.des{
						font-size: 26rpx;
						width: 100%;
						opacity: 0.8;
						padding-top: 5rpx;
						@include ellipsis()
					}
				}
			}
			.code{
				width: 80rpx;
				height: 80rpx;
				border-left:1px solid rgba(255,255,255,0.6);
				@include flex-box-set(between);
				flex-direction: column;
				.pic{
					width: 40rpx;
					height: 40rpx;
					.img{
						width: 100%;
						height: 100%;
					}
				}
				.pay{
					font-size: 22rpx;
					color:#fff;
					text-align: center;
				}
			}
			&.fold{
				padding:0 30rpx;
				.lognBrand{
					.pic{
						width: 60rpx;
						height: 60rpx;						
					}
					.text{
						padding-left:15rpx;
						.title{
							font-size: 28rpx;
							.icon{
								transform: scale(0.9);
							}
						}
						.des{
							display: none;
						}
					}
				}
				.code{
					display: none;
				}
			}
		}
	}
}

.merchantInfoWrapper {
	padding: 30rpx;
	border-radius: 20rpx 20rpx 0 0;
	background: #fff;
	@include flex-box();
	flex-direction: column;
	.close {
		background: page-bg-color;
		padding: 5rpx 20rpx;
		border-radius: 30rpx;
	}
	.merchBox {
		@include flex-box();
		flex-direction: column;
		padding: 30rpx 0;
		.pic {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			.img {
				width: 100%;
				height: 100%;
			}
		}
		.title {
			font-size: 34rpx;
			color: $text-font-color-1;
			padding: 10rpx 0;
		}
		.des {
			font-size: 28rpx;
			color: $text-font-color-2;
		}
	}
	.cell {
		width: 100%;
		padding: 30rpx 0 100rpx;
	}
}
</style>