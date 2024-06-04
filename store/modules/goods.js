const goods = {
	state: {
		detailPopState: false,
		// 弹窗数据
		detailData: {}
	},
	mutations: {
		setDetailState(state, value) {
			state.detailPopState = value;
		},
		setDetailData(state, value) {
			// 商品描述的换行符
			value.description = value.description.replace(/\n/g, "<br/>");
			state.detailData = value;
		}
	}
}

export default goods;