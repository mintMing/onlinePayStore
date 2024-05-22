<template>
	<view class="merchantInfo">
		<uni-forms ref="brandRef" :rules="InfoRules" :model="merchantFormData"  :label-width="100" label-align="right">
			<!-- limit 限制照片数量 -->
			<uni-forms-item label="品牌招牌">
				<uni-file-picker
					v-model="merchantFormData.thumb" 
					fileMediatype="image" 
					mode="grid"
					:limit="1"
				/>
			</uni-forms-item>
			
			<uni-forms-item label="品牌名称" name="name" required>
				<uni-easyinput type="text" v-model="merchantFormData.name" placeholder="请输入品牌名称" />
			</uni-forms-item>

			<uni-forms-item label="商户电话" name="mobile" required>
				<uni-easyinput type="text" v-model="merchantFormData.mobile" placeholder="请输入商户电话" />
			</uni-forms-item>

			<uni-forms-item label="商户地址" name="address">
				<uni-easyinput v-model="merchantFormData.address" placeholder="请输入商户地址" />
			</uni-forms-item>

			<uni-forms-item label="商家介绍" name="about">
				<uni-easyinput v-model="merchantFormData.about" placeholder="请输入商家介绍" type="textarea" />
			</uni-forms-item>

			<button type="primary" @click="onSubmit">提交信息</button>
		</uni-forms>
	</view>

</template>

<script>
import { mapMutations } from "vuex";
	
const MerchantCloudObj = uniCloud.importObject("mint-mall-merchantInfo");

export default {
	data() {
		return {
			merchantFormData: {
				thumb: [],
				name: "", 
				mobile: "", 
				address: "",
				about: "", 
			},
			InfoRules: {
				name: {
					rules: [{
						required: true,
						errorMessage: "请输入正确的品牌名称",
						
					},{
						minLength: 3,
						maxLength: 20,
						errorMessage: '长度在{minLength}到{maxLength}的字符',
					}]
				},
				mobile: {
					rules: [{
						required: true,
						errorMessage: "请输入正确的品牌电话",
					},{
						validateFunction: function(rule, value, data, callback){
							let res = /^1[3-9]\d{9}$/.test(value);
							if(!res){
								callback("手机格式不正确");
							}
							return;
						}
					}]
				}
			}
		};
	},
	onLoad() {
		this.getMerchantInfo();
	},
	methods: {
		//...mapMutations(["SET_BRAND"]),
		getMerchantInfo() {
			MerchantCloudObj.mIget().then(res=> {
				this.merchantFormData = res.data[0];
			});
		},
		onSubmit() {
			// validate of forms methods 对整个表单进行校验的方法，会返回一个 promise
			console.log(this.$refs.brandRef.validate())
			this.$refs.brandRef.validate().then(res=> {
				//console.log(this.$refs.brandRef.validate());
				// 只需要指定的照片信息
				//console.log(this.merchantFormData);
				let arr = this.merchantFormData.thumb.map(item=> {
					
					return {
						extname: item.extname,
						url: item.url,
						name: item.name,
						size: item.size,
					};
				});
				
				this.merchantFormData.thumb = arr;
				this.InfoUpdate();	
			}).catch(err=> {
				console.log("错误："+err);
			});
		},
		InfoUpdate() {
			if(this.merchantFormData._id){
				MerchantCloudObj.mIUpdate(this.merchantFormData).then(res=>{
					uni.showToast({
						title:"修改成功",
						mask:true
					})
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
					
				})
			}else{
				//新增
				MerchantCloudObj.mIAdd(this.merchantFormData).then(res=>{
					uni.showToast({
						title:"新增成功"
					})
					setTimeout(()=>{
						uni.navigateBack();
					}, 1500)
				})
			}

			/*
			console.log(this.merchantFormData);
			let title;
			if(this.merchantFormData._id){
				MerchantCloudObj.mIUpdate(this.merchantFormData);
				title = "修改成功！";
			}else{
				MerchantCloudObj.mIAdd(this.merchantFormData);
				title = "新增成功！";
			}
			
			uni.showToast({
				title,
				mask: true,
			});
			setTimeout(()=> {
				uni.navigateBack(); // 返回上级页面并传参
			}, 1500);
			
			//this.SET_BRAND(this.merchantFormData);
			*/
		},
	},
	
}
</script>

<style lang="scss" scoped>
.merchantInfo {
	padding: 30rpx;

}
</style>
