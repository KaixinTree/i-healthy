/*
 * 显示血糖图表
 */
function showChartSugar(list) {
	if(list.length == 0) {
		return
	}

	var legendArray = ['早餐前血糖', '早餐后血糖', '午餐前血糖', '午餐后血糖', '晚餐前血糖', '晚餐后血糖', '睡前血糖'];
	var xAxisArray = new Array();
	var xAxisArray1 = new Array();
	var xAxisArray2 = new Array();
	var xAxisArray3 = new Array();
	var xAxisArray4 = new Array();
	var xAxisArray5 = new Array();
	var xAxisArray6 = new Array();
	var xAxisArray7 = new Array();
	var xdate = new Array();
	var seriesArray = new Array();

	var allDatas = new Array();

	var data1 = new Array();
	var data2 = new Array();
	var data3 = new Array();
	var data4 = new Array();
	var data5 = new Array();
	var data6 = new Array();
	var data7 = new Array();

	for(var i = 0; i < list.length; i++) {
		var data = list[i];
		if(!data) {
			continue;
		}
		xAxisArray.push(data.date.substr(5, 5));
		if(data.value1 != null) {
			xAxisArray1.push(data.date.substr(5, 5));
			//			data1.push(buildData(data.value1, 6.1, 3.9));
		}
		if(data.value2 != null) {
			xAxisArray2.push(data.date.substr(5, 5));
			//			data2.push(buildData(data.value2, 7.8, 4.4));
		}
		if(data.value3 != null) {
			xAxisArray3.push(data.date.substr(5, 5));
			//			data3.push(buildData(data.value3, 6.1, 3.9));
		}
		if(data.value4 != null) {
			xAxisArray4.push(data.date.substr(5, 5));
			//			data4.push(buildData(data.value4, 7.8, 4.4));
		}
		if(data.value5 != null) {
			xAxisArray5.push(data.date.substr(5, 5));
			//			data5.push(buildData(data.value5, 6.1, 3.9));
		}
		if(data.value6 != null) {
			xAxisArray6.push(data.date.substr(5, 5));
			//			data6.push(buildData(data.value6, 7.8, 4.4));
		}
		if(data.value7 != null) {
			xAxisArray7.push(data.date.substr(5, 5));
			//			data7.push(buildData(data.value7, 7.8, 4.4));
		}

		data1.push(buildData(data.value1, 6.1, 3.9));
		data2.push(buildData(data.value2, 7.8, 4.4));
		data3.push(buildData(data.value3, 6.1, 3.9));
		data4.push(buildData(data.value4, 7.8, 4.4));
		data5.push(buildData(data.value5, 6.1, 3.9));
		data6.push(buildData(data.value6, 7.8, 4.4));
		data7.push(buildData(data.value7, 7.8, 4.4));
	}

	allDatas.push(data1);
	allDatas.push(data2);
	allDatas.push(data3);
	allDatas.push(data4);
	allDatas.push(data5);
	allDatas.push(data6);
	allDatas.push(data7);

	xdate.push(xAxisArray1);
	xdate.push(xAxisArray2);
	xdate.push(xAxisArray3);
	xdate.push(xAxisArray4);
	xdate.push(xAxisArray5);
	xdate.push(xAxisArray6);
	xdate.push(xAxisArray7);

	for(var i = 0; i < 7; i++) {

		var ech = echarts.init(document.getElementById('echarts' + (i * 1 + 1)));
		var echID = 'echarts' + (i * 1 + 1);
		if(xdate[i].length > 0) {
			$('#' + echID).css("top", "");
			//有数据
			var option = {
				title: {
					text: legendArray[i],
					textStyle: {
						color: "#17b3ec",
						fontWeight: "normal",
						fontSize: 15
					},
					x: "center"
				},
				//			calculable: true,
				grid: {
					x: '8%',
					x2: '8%'
				},
				tooltip: {
					show: true,
					showContent: true,
					trigger: "axis"
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: xAxisArray
				}],
				yAxis: [{
					type: 'value',
					name: "mmol/L",
					//				scale: true
				}],
				color: ['#6e7074'],
				series: [{
					name: legendArray[i],
					type: 'line',
					data: allDatas[i],
					markLine: {
						symbol: ['circle', 'circle'],
						precision: 1,
						itemStyle: {
							normal: {
								color: "#6e7074"
							}
						},
						data: [
							[{
								value: 4.4,
								xAxis: 0,
								yAxis: 4.4
							}, {
								value: 4.4,
								xAxis: 40,
								yAxis: 4.4
							}],
							[{
								value: 7.8,
								xAxis: 0,
								yAxis: 7.8
							}, {
								value: 7.8,
								xAxis: 40,
								yAxis: 7.8
							}]
						]
					}
				}]
			};
			if(i == 0) {
				option.series[0].markLine.data = [
					[{
						value: 3.9,
						xAxis: 0,
						yAxis: 3.9
					}, {
						value: 3.9,
						xAxis: 40,
						yAxis: 3.9
					}],
					[{
						value: 6.1,
						xAxis: 0,
						yAxis: 6.1
					}, {
						value: 6.1,
						xAxis: 40,
						yAxis: 6.1
					}]
				]
			}
			ech.setOption(option);
		} else {
			//没有血糖数据时的显示方式
			var no_html = "<p class='c-17b3ec' style='margin: 10px 0 45px 0;font-size:15px'>"+legendArray[i]+"</p><i class='icon-noset' ></i><p class='c-17b3ec'>暂无相关记录</p>";
			$('#' + echID).html(no_html);
			$('#' + echID).css("text-align", "center");
		}
	}
	plus.nativeUI.closeWaiting();
}
/*
 * 显示血压图表
 */
function showChartPressure(list) {
	if(list.length == 0) {
		return
	}

	var xAxisArray = new Array();
	var seriesArray = new Array();

	var data1 = new Array();
	var data2 = new Array();

	for(var i = 0; i < list.length; i++) {
		var data = list[i];
		if(!data) {
			continue;
		}
		xAxisArray.push(data.date.substr(5, 5));
		//		data1.push(data.value1);
		data1.push(buildData(data.value1, 139, 90));
		data2.push(buildData(data.value2, 89, 60));
		//		data2.push(data.value2);
	}

	var ech = echarts.init(document.getElementById('echarts8'));
	var option = {
		title: {
			text: "血   压",
			textStyle: {
				color: "#17b3ec",
				fontWeight: "normal",
				fontSize: 15
			},
			x: "center"
		},
		grid: {
			x: '8%',
			x2: '8%'
		},
		calculable: true,
		tooltip: {
			show: true,
			showContent: true,
			trigger: "axis"
		},
		legend: {
			show: true,
			x: "right",
			data: ["收缩压", "舒张压"],
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: xAxisArray
		}],
		yAxis: [{
			type: 'value',
			name: "mmHg",
			//			scale: true
		}],
		color: ['#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
		series: [{
			name: "收缩压",
			type: 'line',
			data: data1,
			markLine: {
				symbol: ['circle', 'circle'],
				itemStyle: {
					normal: {
						color: "#d48265"
					}
				},
				data: [
					[{
						value: 139,
						xAxis: 0,
						yAxis: 139
					}, {
						value: 139,
						xAxis: 40,
						yAxis: 139
					}]
				]
			}
		}, {
			name: "舒张压",
			type: 'line',
			data: data2,
			markLine: {
				symbol: ['circle', 'circle'],
				itemStyle: {
					normal: {
						color: "91c7ae"
					}
				},
				data: [
					[{
						value: 60,
						xAxis: 0,
						yAxis: 60
					}, {
						value: 60,
						xAxis: 40,
						yAxis: 60
					}],
					[{
						value: 90,
						xAxis: 0,
						yAxis: 90
					}, {
						value: 90,
						xAxis: 40,
						yAxis: 90
					}]
				]
			}
		}]
	};
	//	ech.showLoading({
	//              text : '数据获取中',
	//              effect: 'whirling'
	//          });
	//	ech.hideLoading();
	ech.setOption(option);
	plus.nativeUI.closeWaiting();
}
/*
 * 显示体重图表
 */
function showChartWeight(list) {
	if(list.length == 0) {
		return
	}

	var xAxisArray = new Array();
	var seriesArray = new Array();

	var data1 = new Array();

	for(var i = 0; i < list.length; i++) {
		var data = list[i];
		if(!data) {
			continue;
		}
		xAxisArray.push(data.date.substr(5, 5));
		data1.push(data.value1);

	}

	var ech = echarts.init(document.getElementById('echarts9'));
	var option = {
		title: {
			text: "体  重",
			textStyle: {
				color: "#17b3ec",
				fontWeight: "normal",
				fontSize: 15
			},
			x: "center"
		},
		//		calculable: true,
		grid: {
			x: '8%',
			x2: '8%',
			//			width:'100%'
		},
		tooltip: {
			show: true,
			showContent: true,
			trigger: "axis"
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: xAxisArray
		}],
		yAxis: [{
			type: 'value',
			name: "Kg",
			scale: true
		}],
		series: [{
			name: "体重",
			type: 'line',
			data: data1,
			markPoint: {
				data: [{
					type: 'max',
					symbolSize: 10,
					name: '最大值',
					itemStyle: {
						normal: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						},
						emphasis: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						}
					}
				}, {
					type: 'min',
					symbolSize: 10,
					name: '最小值',
					itemStyle: {
						normal: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						},
						emphasis: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						}
					}
				}]
			}
		}]
	};
	ech.setOption(option);
	plus.nativeUI.closeWaiting();
}
/*
 * 显示腰围图表
 */
function showChartWaistline(list) {
	if(list.length == 0) {
		return
	}

	var xAxisArray = new Array();
	var seriesArray = new Array();

	var data1 = new Array();

	for(var i = 0; i < list.length; i++) {
		var data = list[i];
		if(!data) {
			continue;
		}
		xAxisArray.push(data.date.substr(5, 5));
		data1.push(data.value1);
	}

	var ech = echarts.init(document.getElementById('echarts10'));
	var option = {
		title: {
			text: "腰  围",
			textStyle: {
				color: "#17b3ec",
				fontWeight: "normal",
				fontSize: 15
			},
			x: "center"
		},
		grid: {
			x: '8%',
			x2: '8%'
		},
		//calculable: true,
		tooltip: {
			show: true,
			showContent: true,
			trigger: "axis"
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: xAxisArray
		}],
		yAxis: [{
			type: 'value',
			name: "cm",
			scale: true
		}],
		series: [{
			name: "腰围",
			type: 'line',
			data: data1,
			markPoint: {
				data: [{
					type: 'max',
					symbolSize: 12,
					name: '最高值',
					itemStyle: {
						normal: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						},
						emphasis: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						}
					}
				}, {
					type: 'min',
					symbolSize: 12,
					name: '最低值',
					itemStyle: {
						normal: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						},
						emphasis: {
							label: {
								textStyle: {
									fontSize: '10'
								}
							}
						}
					}
				}]
			}
		}]
	};
	ech.setOption(option);
	plus.nativeUI.closeWaiting();
}

function buildData(value, max, min) {
	if((value > 0 && value < min) || value > max) {
		return {
			value: value,
			symbol: 'pin',
			//			symbol: 'star6',
			symbolSize: 10,
			itemStyle: {
				normal: {
					color: "red"
				},
				emphasis: {
					label: {
						show: true,
						position: 'inside',
						textStyle: {
							fontSize: '10'
						}
					},
					color: "red"
				}
			}
		}
	} else {
		return value;
	}
}