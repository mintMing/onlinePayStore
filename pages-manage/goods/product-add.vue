<template>
	<view class="goodsView">
		<uni-forms
			ref="goodsForm"
			:model="goodsFormData" 
			:rules="goodsInfoRules"
			:label-width="100" 
			label-align="right"
		>
			<uni-forms-item label="商品图片">
				<uni-file-picker
					v-model="goodsFormData.thumb"
					fileMediatype="image"
					mode="grid"
				>
				</uni-file-picker>
			</uni-forms-item>
			
			<uni-forms-item label="商品名称" required name="name">
				<uni-easyinput v-model="goodsFormData.name" placeholder="请输入商品名称" trim="both"></uni-easyinput>
			</uni-forms-item>
			
			<uni-forms-item label="产品分类" required name="categoryId"> 
				<!-- field 过滤云端的数据 -->
				<uni-data-select
					collection="mint-mall-categories"
					field="_id as value, name as text"
					v-model="goodsFormData.categoryId"
				>
				</uni-data-select>
			</uni-forms-item>
			
			<uni-forms-item label="商品价格" required name="price">
				<uni-easyinput type="number" v-model="goodsFormData.price" placeholder="请输入商品价格" trim="both"></uni-easyinput>
			</uni-forms-item>
			
			<uni-forms-item label="商品原价">
				<uni-easyinput type="number" v-model="goodsFormData.originalPrice" placeholder="请输入原价" trim="both"></uni-easyinput>
			</uni-forms-item>
			
			<!--  -->
			<uni-forms-item label="商品属性">
				<!-- uview 单元格 -->
				<u-cell isLink :title="skuTitle" :border="false" @click="selectProperty"></u-cell>
				<!-- 已选列表 -->
				<view class="skuList">
					<view class="item" v-for="item in goodsFormData.skuSelect" @click="clickSelect">
						<view class="left">{{ item.skuName }}:</view>
						<view class="right">{{ getSkuChildName(item.children) }}</view>
					</view>
				</view>
			</uni-forms-item>
			
			
			<uni-forms-item label="商品描述">
				<uni-easyinput type="textarea" placeholder="请输入详细的描述信息" v-model="goodsFormData.description"></uni-easyinput>
			</uni-forms-item>
			
			<view class="btnView">
				<button type="primary" @click="onSubmit">确认提交</button>
			</view>
			
		</uni-forms>
		
		<!-- uview 弹出层 底部弹出 -->
		<uni-popup ref="PropInfoBox" type="bottom">
			<view class="propertyWrapper">
				
				<view class="head">
					<view class="title">商品属性</view>
					<view class="addAttr" @click="clickAddProp()">+ 添加属性</view>
				</view>	
				
				<view class="body">
					<view class="item" v-for="(item, index) in skuArr">
						<!-- 每一个属性选择项 -->
						<view class="top">							
							<checkbox :checked="item.checked" @click="clickPropCheckBox(index)"></checkbox>
							<view class="font">{{ item.skuName }}</view>
						</view>
						<!-- 商品属性的子项目 -->
						<view class="btnGroup" v-if="item.checked">
							<view 
								class="btn" 
								:class="child.checked?'active':''"
								v-for="(child, cIndex) in item.children" 
								@click="clickChlidBtn(index, cIndex)"
							>
							{{ child.name }}
							</view>
							<view class="btn" @click="clickAddProp(index)">
								<u-icon name="plus"></u-icon>
							</view>
						</view>
					</view>
				</view>
								
				<view class="foot">
					<button type="primary" @click="clickConfirmSelect">确认选择</button>
				</view>
			</view>
			
			<!-- 安全区域！！！ -->
			<view class="safe-area-bottom"></view>
		</uni-popup>
		
		<!-- 子项目的弹出层 -->
		<uni-popup ref="addProp">
			<uni-popup-dialog 
				mode="input" 
				title="新增" 
				placeholder="请输入新增的内容"
				@confirm="addConfirm"
			>
			</uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script>
const skuCloudObj = uniCloud.importObject("mint-mall-sku");
const goodsCloudObj = uniCloud.importObject("mint-mall-goods");
// const skuCloudObj = uniCloud.importObject("mint-mall-sku", {
// 	// 不需要自带的加载UI
// 	"customUI": true
// });

let goodsId;
	
export default {
	data() {
		return {
			goodsFormData: {
				thumb: [],
				name: "",
				categoryId: null,
				price: null,
				originalPrice: null,
				description: "",
				skuSelect: [],
			},
			goodsInfoRules: {
				name: {
					rules: [{
						required: true,
						errorMessage: "请输入产品名称"
					}]
				},
				price: {
					rules: [{
						required: true,
						errorMessage: "请输入产品价格"
					}]
				},
				categoryId: {
					rules: [{
						required: true,
						errorMessage: "请输入产品分类"
					}]
				}
			},
			// 子属性值
			skuArr: [/*{
					_id: "1",
					skuName: "规格",
					checked: false,
					children: [{
						name: "red",
						checked: false, // 子项目默认不显示
					}]}*/
			],
			addPropType: "parent",  // 区分添加属性或属性子项目
		};
	},
	methods: {
		onSubmit() {
			this.$refs.goodsForm.validate().then(res=> {
				//console.log(res);
				this.toDataBase();
			}).catch(err=> {
				uni.showModal({
					// only test
					content: "err source of onSubmit",
				});
				console.log(err);
			});
		},
		// 选择商品属性
		selectProperty() {
			this.$refs.PropInfoBox.open();
			this.setCheckedState(this.skuArr, this.goodsFormData.skuSelect, "_id");
		},
		// 修改页面跳转到此
		setCheckedState(skuArr, skuSelect, key) {
			skuArr.forEach(item=> {
				skuSelect.forEach(row=> {
					if(item[key] == row[key]){
						item.checked = true;
						if(item?.children?.length){
							this.setCheckedState(item.children, row.children, "name");
						}
					}
				})
			})
		},
		// 点击属性子项目
		clickChlidBtn(index, cIndex) {
			this.skuArr[index].children[cIndex].checked = !this.skuArr[index].children[cIndex].checked;
		},
		// 点击属性的复选框
		clickPropCheckBox(index) {
			this.skuArr[index].checked = !this.skuArr[index].checked;
		},
		// 点击添加属性（属性和子项目共用）
		clickAddProp(index = null) {
			if(index == null){
				this.addPropType = "parent"; 
				this.propIndex = null;
			}else{
				this.addPropType = "child";
				this.propIndex = index;
			}
			this.$refs.addProp.open();
		},
		// 添加属性弹窗的确认按钮
		async addConfirm(event) {
			if(!event){
				return;
			}
			if(this.addPropType == "parent") {
				let obj = {
					skuName: event,
					checked: true,
					children: [],
				}
				let skuData = await skuCloudObj.skuAdd(obj);
				// 增加id属性，值为表_id
				obj._id = skuData.id;
				this.skuArr.push(obj);
				
			}else if(this.addPropType == "child") {
				let obj = {
					name: event,
					checked: true,
				}  
				let id = this.skuArr[this.propIndex]._id;
				let skuData = skuCloudObj.skuUpdateChild(id, obj);
				//console.log(skuData);
				this.skuArr[this.propIndex].children.push(obj);
			}
		},
		// 获取属性数据
		async getSkuData() {
			let skuData = await skuCloudObj.skuGet();
			this.skuArr = skuData.data;
			console.log(skuData);
		},
		// 将选择的属性值
		clickConfirmSelect() {
			let arr = this.skuArr.filter(item=> {
				// 已被选择的子项目
				let childItemState = item.children.some(childItem=> {
					return childItem.checked === true;
				});
				return item.checked === true && childItemState;
			}).map(item=> {
				let childItem = item.children.filter(item=> {
					return item.checked === true;
				});
				return {
					...item,
					childItem,
				}
			});
			this.goodsFormData.skuSelect = arr;
			this.$refs.PropInfoBox.close(); 
		},
		// 属性返回子项目的name字段
		getSkuChildName(prosPropArr) {
			let arr = prosPropArr.map(item=> {
				return item.name;
			});
			return arr.join("/");
		},
		// 将数据上传云数据库 
		async toDataBase() {
			this.goodsFormData.thumb = this.goodsFormData.thumb.map(item=> {
				return {
					url: item.url,
					name: item.name,
					extname: item.extname,
				};
			}); 
			
			// 是增加
			let toastTit;
			if(goodsId){
				toastTit = "修改成功";
				await goodsCloudObj.goodsUpdate(this.goodsFormData);
			}else{ // 是修改
				toastTit = "新增成功";
				await goodsCloudObj.goodsAdd(this.goodsFormData);
			}
			
			uni.showToast({
				title: toastTit
			});
			setTimeout(()=>{
				uni.navigateBack()
			}, 1500);
		},
		async getGoodsOne() {
			//console.log(goodsId);
			let res = await goodsCloudObj.getOne(goodsId);
			this.goodsFormData = res.data[0];
		}
	},
	computed: {
		// 属性选项标题
		skuTitle() {
			if(this.goodsFormData.skuSelect.length){
				let arr = this.goodsFormData.skuSelect.map(item=> {
					return item.skuName;
				});
				return arr.join("/");
			}else{
				return "点击添加属性";
			}
		}
	},
	// event 上一个页面的参数
	onLoad(event) {
		goodsId = event?.id??null;
		if(goodsId){
			this.getGoodsOne();
		}
		
		if(this.skuArr.length){
			return;
		}
		this.getSkuData();
	}
}

</script>

<style lang="scss" scoped>
.goodsView{
	padding:30rpx;
	.skuList{
		.item{
			padding:30rpx;
			background: $page-bg-color;
			margin:15rpx 0;
			@include flex-box-set(start);
		}
	}
}

.propertyWrapper{
	padding:30rpx;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	.head{
		@include flex-box();
		font-size: 34rpx;
		margin-bottom:30rpx;
		.title{
			font-weight: bold;
		}
		.addAttr{
			color:$brand-theme-color-aux;
		}
	}
	.body{
		.item{
			border-top:1px solid $border-color-light;
			&:last-child{
				border-bottom:1px solid $border-color-light;
			}
			.top{
				padding:30rpx 0;
				@include flex-box-set(start);
				.font{
					padding-left: 10rpx;
					font-weight: bold;
				}
			}
			.btnGroup{
				padding: 10rpx 0 30rpx;
				@include flex-box-set(start);
				flex-wrap: wrap;
				.btn{
					padding: 0rpx 25rpx;
					height: 60rpx;
					border: 1rpx solid $border-color-light;
					margin-right: 20rpx;
					border-radius: 10rpx;					
					color: $text-font-color-2;
					margin-bottom: 20rpx;
					@include flex-box-set();
					&.active{
						border-color: $brand-theme-color;
						color: $brand-theme-color;
						background: rgba(236, 87, 79, 0.1);
					}
				}
			}
		}
	}
	
	.foot{
		padding:50rpx 200rpx;
	}
}

</style>
