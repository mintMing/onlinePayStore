<template>
	<view class="searchLayout">
		<u-search 
		placeholder="请输入搜索内容" 
		v-model="keyword"
		clearabled
		showAction
		actionText="搜索" 
		animation
		@search="onSearch"
		@custom="onSearch"
		>
		</u-search>
		
		<view class="historyList">
			<view class="item" v-for="(item, index) in historyList" :key="item">
				<view class="text">{{item}}</view>
				<view class="close" @click="onClose(index)">
					<u-icon name="close" size="16" color="#999"></u-icon>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				historyList: []
			};
		},
		onLoad() {
			// 挂载前获取数据
			let historyList = uni.getStorageSync("historyList") || [];
			this.historyList = historyList;
		},
		methods: {
			// 检索并存储历史检索
			onSearch(){				
				this.historyList.unshift(this.keyword);		
				this.historyList = [...new Set(this.historyList)];
				uni.setStorageSync("historyList", this.historyList);
				
				// this.historyList = [...new Set(this.historyList)];
				// uni.setStorageSync("historyList",this.historyList)
			},
			// 删除检索历史
			onClose(index){
				this.historyList.splice(index, 1);
				uni.setStorageSync("historyList", this.historyList)
			},
		}
	}
</script>

<style lang="scss" scoped>
.searchLayout {
	padding: 30rpx;
	.historyList {
		margin-top: 30rpx;
		.item {
			@include flex-box();
			font-size: 32rpx;
			padding: 30rpx 0;
			color: #333;
			border-bottom: 1px solid $border-color-light;
		}
	}
}
</style>
