// 产品价格
const proPrice = (rule, value, callback) => {
	const reg = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
	if(reg.test(value)) {
		callback()
	} else {
		callback(new Error('格式不正确'))
	}
}
export default {
	proPrice
}