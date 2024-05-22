<template>
	<view class="goodsList">
		<navigator url="./add" class="row add">
			<view class="left">
				<u-icon name="plus" color="#576b95" size="22"></u-icon>
				<text class="text">新增商品</text>
			</view>
		</navigator>
		
		<view class="row" v-for="item in goodsList" :key="item._id">
			<view class="title">
				<uni-section :title="item.name" type="line"></uni-section>
			</view>
			<view class="goodsRow" v-for="row in item.proGroup" :key="row._id">
				<view class="view">
					<view class="left">
						<image 
							class="pic" 
							v-if="row.thumb.length"
							:src="row.thumb[0].url" 
							mode="aspectFill"
						>
						</image>
						<image class="pic" src="../../static/logo2.jpg" mode="aspectFill" v-else></image>
					</view>
					<view class="right">
						<view class="top">{{ row.name }}</view>
						<view class="info">
							<view class="icon">
								<u-icon name="edit-pen" size="25" @click="clickEdit(row._id)"></u-icon>
							</view>
							<view class="icon">
								<u-icon name="trash" size="25" @click="clickRemove(row._id)"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const goodsCloudObj = uniCloud.importObject("mint-mall-goods");



export default {
	data() {
		return {
			goodsList: []
		};
	},
	onLoad() {
		this.getGoodsList();
	},
	methods: {
		async getGoodsList() {
			let res = await goodsCloudObj.getList().then(res=> {
				// console.log(res);
				this.goodsList = res.data;
				console.log(this.goodsList);
			})
		},
		clickRemove(id) {
			uni.showModal({
				title: "是否确认删除！",
				success: res=> {
					if(res.confirm){
						this.removeGoods(id);
					}
					
				},
			})
		},
		async removeGoods(id) {
			let res = await goodsCloudObj.goodsRemove(id);
			this.getGoodsList();
		},
		// 跳转到修改页面
		clickEdit(id) {
			
			uni.navigateTo({
				url: "./product-add?id="+id
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.goodsList {
	padding: 30rpx;
	.add {
		.left {
			display: flex;
			width: 100%;
			height: 120rpx;
			padding: 5px;
			.text {
				padding: 21px 0 0 18px;
				color: $text-font-color-3;
			}
		}
	}
	.goodsRow {
		margin-bottom: 20rpx;
		.view {
			display: flex;
			.left {
				width: 150rpx;
				height: 140rpx;
				.pic {
					width: 100%;
					height: 100%;
				}
			}
			.right {
				padding-left: 25rpx;
				color: $text-font-color-1;
				.top {
					font-weight: 600;
					margin-bottom: 40rpx;
				}
				.info {
					display: flex;
				}
			}
		}
	}
}


	

</style>
