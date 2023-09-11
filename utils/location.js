// import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js';

export function openLocation(lat, lng, museum_name = "嘎嘎充电") {

	uni.getLocation({
		success(res) {

			uni.openLocation({
				name: museum_name,
				latitude: lat,
				longitude: lng,
				scale: 18

			})
		}
	})
}
// 位置授权
function getAuthorizeInfo() {
	const that = this;
	uni.authorize({
		scope: 'scope.userLocation',
		success() {
			// 允许授权
			that.getCity();
		},
		fail(err) {

			// 拒绝授权
			that.openConfirm();
		}
	});
}
// 再次获取授权
// 当用户第一次拒绝后再次请求授权
function openConfirm() {
	let that = this;
	uni.showModal({
		title: '请求授权当前位置',
		content: '需要获取您的地理位置，请确认授权',
		success: res => {
			if (res.confirm) {
				uni.openSetting({
					success: function(data) {
						if (data.authSetting['scope.userLocation'] === true) {
							getCity();
							uni.showToast({
								title: '授权成功',
								icon: 'success',
								duration: 1000,
								success() {}
							});
						} else {
							uni.showToast({
								title: '授权失败',
								icon: 'success',
								duration: 1000
							});
						}
					}
				});
			} else if (res.cancel) {
				uni.showToast({
					title: '你拒绝了授权，无法获得周边信息',
					icon: 'none',
					duration: 1000
				});
			}
		}
	});
}


function getCity() {
	return new Promise((resolve, reject) => {
		// 获取授权信息
		uni.getSetting({
			success: res => {
				console.log(res)
				if (res.authSetting && res.authSetting.hasOwnProperty(
						'scope.userLocation')) {
					if (res.authSetting['scope.userLocation']) {
						getCityInfo();
					} else {
						uni.showModal({
							title: '提示',
							content: '请重新授权获取你的地理位置，否则部分功能将无法使用',
							success: res => {
								if (res.confirm) {
									uni.openSetting({
										success: () => getCityInfo()
									});
								} else {
									reject('请授权获取你的地理位置，否则部分功能将无法使用！');
								}
							}
						});
					}
				} else {
					getCityInfo();
				}
			}
		});
	});
}

function getCityInfo() {
	// 腾讯地图Api
	const qqmapsdk = new QQMapWX({
		key: 'K35BZ-3KUE3-UFH36-3HTYR-UXHTJ-OKFDZ'
	});
	// 授权
	uni.authorize({
		scope: 'scope.userLocation',
		success: () => {
			uni.getLocation({
				type: 'gcj02', //  wgs84: 返回GPS坐标，gcj02: 返回国测局坐标
				success: res => {
					const {
						latitude,
						longitude
					} = res;
					const location = {
						latitude,
						longitude
					};
					qqmapsdk.reverseGeocoder({
						location,
						success: res => {
							console.log(res)
						},
						fail: err => {
							console.log(JSON.stringify(err));
						}
					});
				}
			});
		},
		fail: () => reject('请授权获取你的位置，否则部分功能将无法使用！')
	});
}
