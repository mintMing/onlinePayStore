const merchantCloudObj = uniCloud.importObject("mint-mall-merchantInfo");

const merchant = {
	state: {
		merchantData: {
			//name: "wzm"
		}
	},
	mutations: {
		setMerchantInfo(state, value) {
			state.merchantData = value;
		}
	},
	actions: {
		async getMerchantInfo(context) {
			let keyArr = Object.keys(context.state.merchantData);
			if(keyArr.length) {
				return;
			}
			let res = await merchantCloudObj.mIget();
				// 提交mutation更改state 但同步
				context.commit("setMerchantInfo", res.data[0]);
		}
	}
}

export default merchant;