const db = uniCloud.database();
// 查询筛选指令 Query Command
const cmd = db.command;

module.exports = {
	_before: function () { // 通用预处理器
		this.params = this.getParams()[0];
	},
	async skuGet() {
		return await db.collection("mint-mall-sku").get()
	},
	async skuAdd() {
		this.params.checked = false;
		return await db.collection("mint-mall-sku").add(this.params);
	}, 
	async skuUpdateChild(id, obj){
		obj.checked = false;
		return await db.collection("mint-mall-sku").doc(id).update({			
			children: cmd.push([obj])
		})
	}

}
