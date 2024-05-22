const db = uniCloud.database();

module.exports = {
	_before: function () { // 通用预处理器
	},
	async goodsAdd(params) {
		params.price = Number(params.price).toFixed(2) * 100;
		params.originalPrice = params.originalPrice ? Number(params.originalPrice).toFixed(2) * 100 : null;
		return await db.collection("mint-mall-goods").add(params);
	},
	
	async getOne(id) {
		let res = await db.collection("mint-mall-goods").doc(id).get();
		res.data[0].price = res.data[0].price / 100;
		res.data[0].originalPrice = res.data[0].originalPrice ? res.data[0].originalPrice / 100 : null;
		return res;
	},
	
	async getList() {
		let navData = await db.collection("mint-mall-categories").get();
		let goods = await db.collection("mint-mall-goods").get();
		navData.data.forEach(item=> {
			let proGroup = goods.data.filter(goodsItem=> {
				return goodsItem.categoryId == item._id;
			});
			item.proGroup = proGroup;
		});
		let pureArrData = navData.data.filter(item=> {
			return item.proGroup.length;
		});
		return { data: pureArrData };
	},
	
	async goodsRemove(id) {
		let res = await db.collection("mint-mall-goods").doc(id).remove();
		return res;
	},
	
	async goodsUpdate(params) {
		let _params = { ...params };
		delete _params._id;
		_params.price = Number(params.price).toFixed(2) * 100;
		_params.originalPrice = params.originalPrice ? Number(params.originalPrice).toFixed(2) * 100 : null;
		await db.collection("mint-mall-goods").doc(params._id).update(_params)
	}
}
