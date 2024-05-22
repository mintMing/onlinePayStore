<template>
	<view class="category">
		<view class="newlyRow rowAdd" @click="ejectAdd">
			<view class="left">
				<u-icon name="plus" color="#576b95" size="22"></u-icon>
				<text class="text">新增分类</text>
			</view>
		</view>
		<view class="categoryItem" v-for="(item, index) in categoryList" :key="item._id">
			<view class="left">
				<view class="name">{{item.name}}</view>
			</view>
			<view class="right">
				<u-icon name="edit-pen" size="26" color="#576b95" @click="updateData(item._id, item.name)"></u-icon>
				<u-icon name="trash" size="26" color="#EC544F" @click="deleteData(item._id)"></u-icon>
			</view>
		</view>
		
		<uni-popup ref="inputDialog">
			<uni-popup-dialog 
				mode="input" 
				:value="iptValue"
				placeholder="请输入分类名称"
				title="分类名称" 
				@confirm="addConfirm"
			>
			</uni-popup-dialog>
		</uni-popup>
		
	</view>

</template>

<script>
const db = uniCloud.database();

export default {
	data() {
		return {
			categoryList: [],
			iptValue: "",
			// 解决不同操作界面仍然保留_id的信息
			updateID: null,
		};
	},
	onLoad() {
		this.getCateGory();
	},
	methods: {
		// 获取数据库数据
		getCateGory() {
			db.collection("mint-mall-categories").get().then(res=> {
				//console.log(res);
				this.categoryList = res.result.data;
			});
		},
		// 添加分类
		ejectAdd() {
			// 清空默认值
			this.iptValue = "";
			this.updateID = null;
			this.$refs.inputDialog.open();
		},
		//  点击确认按钮
		async addConfirm(event) {
			this.iptValue = event;
			if(this.updateID){
				// 等待操作完成 再执行getCateGory更新页面
				await db.collection("mint-mall-categories").doc(this.updateID).update({
					name: this.iptValue
				}).then(res=> {
					uni.showToast({
						title: "修改成功！"
					})
				});
			}else{
				await db.collection("mint-mall-categories").add({
					name: this.iptValue
				}).then(res=> {
					uni.showToast({
						title: "新增分类成功！"
					})
				});
			}
			this.getCateGory();
		},
		deleteData(id) {
			// 显示弹窗
			uni.showModal({
				content: "是否删除该分类？",
				// api调用成功时
				success: res=> {
					if(res.confirm){
						db.collection("mint-mall-categories").doc(id).remove().then(res=> {
							this.getCateGory();
						}).then(res=> {
							uni.showToast({
								title: "删除成功！"
							});
						});
					}
				}, 
				// api调用失败时
				fail: err=> {
					console.log(err);
				}
			})
		},
		//修改一条分类
		updateData(id, name){
			this.iptValue = name;
			this.updateID = id;
			this.$refs.inputDialog.open();
		},
	}
}
</script>

<style lang="scss" scoped>
.category {
	padding:30rpx;
	.categoryItem {
		@include flex-box();
		border-bottom: 1px solid $border-color-light;
		padding:26rpx 0;
		.left {
			font-size: 34rpx;
		}
		.right {
			@include flex-box();
			.u-icon{
				margin-left:30rpx;
			}
		}
	}
	.newlyRow.rowAdd {
		.left {
			color:$brand-theme-color-aux;
			@include flex-box();
			.text {
				font-size: 36rpx;
				padding-left:10rpx;
			}
		}
	}
}
</style>
