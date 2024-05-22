const db = uniCloud.database();

module.exports = {
	_before: function () { 
		// 获取当前参数列表
		this.params = this.getParams()[0];
	},
	async mIAdd() {
		return await db.collection("mint-mall-merchantInfo").add(this.params);
	},
	async mIUpdate() {
		let params = {...this.params}; 
		delete params._id; // 不需要 _id 属性
		return await db.collection("mint-mall-merchantInfo").doc(this.params._id).update(params);
		
	},
	async mIget() {
		return await db.collection("mint-mall-merchantInfo").get();
	}
}
