function getNowTime() {
	var nowTime = new Date();
	var year = nowTime.getFullYear();
	var month = nowTime.getMonth()+1;
	var day = nowTime.getDate();
	var hours = nowTime.getHours();
	var minutes = nowTime.getMinutes();
	var seconds = nowTime.getSeconds();
	if (month<10) month = '0'+month;
	if (day<10) day = '0'+day;
	if (hours<10) hours = '0'+hours;
	if (minutes<10) minutes = '0'+minutes;
	if (seconds<10) seconds = '0'+seconds;
	return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}
function randomNum(maxNum, minNum, decimalNum) {
	// 获取指定范围内的随机数, decimalNum指小数保留多少位
	var max = 0,
		min = 0;
	minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
	switch (arguments.length) {
		case 1:
			return Math.floor(Math.random() * (max + 1));
			break;
		case 2:
			return Math.floor(Math.random() * (max - min + 1) + min);
			break;
		case 3:
			return (Math.random() * (max - min) + min).toFixed(decimalNum);
			break;
		default:
			return Math.random();
			break;
	}
}
export default {
	getNowTime,
	randomNum,
};