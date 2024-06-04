// 价格 将分转为元
function priceFormat(num) {
	return (num/100).toFixed(2);
}

// 折扣格式化
function discount(num1, num2) {
	 let num = parseInt((num1 / num2) * 100);
	 return num + "折";
}


export { priceFormat, discount };