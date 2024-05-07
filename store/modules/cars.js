const cars = {
	state: {
		carsList: [],
	},
	mutations: {
		setCarsList(state, params) {
			let {item, num} = params;
			let carItem = {
				goodsid: item.id || item.goodsid,
				numvalue:num,
				name:item.name,
				price:item.price,
				before_price:item.before_price,
				thumb:item.thumb
			};
			let idx = state.carsList.findIndex(car=> {
				return car.goodsid == carItem.goodsid;
			});
			if( idx < 0){
				state.carsList.unshift(carItem);
			}else{
				state.carsList[idx].numvalue = carItem.numvalue;
				if(state.carsList[idx].numvalue <= 0){
					state.carsList.splice(idx, 1);
				}
			}
		}
	}
}

export default cars;