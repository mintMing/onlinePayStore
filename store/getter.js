const getters = {
	// 顶部状态栏
	statusBarHeight: state=> state.system.statusBarHeight,
	// 头部标题栏
	titleBarHeight: state=> state.system.titleBarHeight,
	// middle layout
	bodyBarHeight: state=> {
		if(state.system.foldState) return state.system.titleBarHeight;
		return 100;
	},
	// get title height
	getTitalHeight: state=> {
		if(state.system.foldState){
			return state.system.statusBarHeight + state.system.titleBarHeight + 10;
		}
		return state.system.statusBarHeight + state.system.titleBarHeight + 100 + 10;
	},
	// without or not expand middle layout
	foldState: state=> state.system.foldState,
	// footer car page of data
	carsList:state=> state.cars.carsList,
	// calculate price
	getAmountPrice: state=> {
		return state.cars.carsList.reduce((prev, next)=> {
			return prev += next.price * next.numvalue;
		}, 0);
	},
	// footer car of product number
	CarSelectedNum: state=> {
		return state.cars.carsList.reduce((prev, next)=> {
			return prev += next.numvalue;
		}, 0);
	}
}

export default getters