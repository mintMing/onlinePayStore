<template>
	<view class="customHead" :style="{height:getTitalHeight+'px'}">
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
				<navigator url="" class="manage">
					<u-icon name="bag-fill" size="22" color="#fff"></u-icon>
					后台管理 
				</navigator>
			</view>
			<!-- logn -->
			<view class="LognBody"
				:class="foldState?'fold':''"
				:style="{height:bodyBarHeight+'px'}"
			>
				<view class="lognBrand">
					<view class="pic">
						<image class="img" src="../../static/logo2.jpg" mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="title">
							<text class="font">uniapp of journey</text>
							<u-icon class="icon" name="more-circle" size="22" color="#fff"></u-icon>
						</view>
						<view class="des">
							一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍一大堆的品牌介绍
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
	</view>
</template>

<script>
	export default {
		name:"head-bar",
		data() {
			return {
				statusBarHeight: 0,
				titleBarHeight: 0,
			};
		},
		props: {
			foldState: {
				type: Boolean,
				default: false,
			}
		},
		mounted(){
			let systemInfo = uni.getSystemInfoSync();
			// 状态栏的高度
			this.statusBarHeight = systemInfo.statusBarHeight || 20;

			// #ifdef MP-WEIXIN
			// 头部胶囊体信息
			let menuBtnInfo = uni.getMenuButtonBoundingClientRect();
			// 头部标题高度
			this.titleBarHeight = menuBtnInfo.height + (menuBtnInfo.top - this.statusBarHeight) * 2;
			// #endif
			
			// #ifndef MP-WEIXIN
			this.titleBarHeight = 40;
			// #endif
		},
		computed: {
			getTitalHeight() {
				if(this.foldState){
					return this.statusBarHeight + this.titleBarHeight + 10;
				}
				return this.statusBarHeight + this.titleBarHeight + 100 + 10;
			},
			bodyBarHeight() {
				if(this.foldState){
					return this.titleBarHeight;
				}
				return 100;
			}
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
</style>