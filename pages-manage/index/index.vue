<template>
	<view class="manage">
		<uni-section title="分类管理" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="管理分类" show-arrow to="/pages-manage/product-category/product-category"></uni-list-item>
		</uni-list>
		
		<uni-section title="商品管理" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="商品列表" show-arrow to="/pages-manage/goods/product-list"></uni-list-item>
			<uni-list-item title="新增商品" show-arrow to="/pages-manage/goods/product-add"></uni-list-item>
		</uni-list>
		
		<uni-section title="关于商家" type="line"></uni-section>
		<uni-list>
			<uni-list-item title="商家信息" show-arrow to="/pages-manage/merchant-info/merchant-info"></uni-list-item>
		</uni-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.manage {
	padding: 30rpx;
}
</style>
