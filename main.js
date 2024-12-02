import App from './App'

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  onLaunch() {
    checkForUpdates(); // Kiểm tra cập nhật khi ứng dụng khởi chạy
  }
});
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App);

  // Kiểm tra cập nhật khi ứng dụng khởi chạy
  app.config.globalProperties.$onLaunch = () => {
    checkForUpdates();
  };

  return {
    app,
  }
}
// #endif

// Hàm kiểm tra cập nhật
function checkForUpdates() {
  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform !== 'android') {
    console.log('Cập nhật APK chỉ hỗ trợ trên Android.');
    return;
  }

  // Lấy phiên bản hiện tại từ manifest.json
  const currentVersion = plus.runtime.version;
  console.log('Phiên bản hiện tại:', currentVersion);

  // Gửi yêu cầu tới file JSON chứa thông tin phiên bản
  uni.request({
    url: 'http://10.30.3.50:8083/uploadfile/UniappUpdate/latest.json', // URL kiểm tra phiên bản
    success: (res) => {
      const newVersion = res.data.version;
      console.log('Phiên bản mới:', newVersion);

      // So sánh phiên bản
      if (compareVersions(newVersion, currentVersion) > 0) {
        uni.showModal({
          title: 'Cập nhật mới',
          content: res.data.changelog || 'Đã có phiên bản mới, bạn muốn cập nhật không?',
          success: (modalRes) => {
            if (modalRes.confirm) {
              downloadAndInstallAPK(res.data.url);
            }
          }
        });
      } else {
        console.log('Ứng dụng đã ở phiên bản mới nhất.');
      }
    },
    fail: (err) => {
      console.error('Lỗi khi kiểm tra phiên bản:', err);
    }
  });
}

// Hàm tải và cài đặt APK
function downloadAndInstallAPK(apkUrl) {
  uni.showLoading({ title: 'Đang tải bản cập nhật...' });
  const downloadTask = plus.downloader.createDownload(apkUrl, {}, (download, status) => {
    if (status === 200) {
      uni.hideLoading();
      uni.showToast({ title: 'Tải xong, đang cài đặt...' });
      plus.runtime.install(download.filename, {}, () => {
        plus.runtime.restart(); // Khởi động lại ứng dụng
      }, (error) => {
        console.error('Cài đặt thất bại:', error);
        uni.showToast({ title: 'Cài đặt thất bại', icon: 'none' });
      });
    } else {
      uni.hideLoading();
      uni.showToast({ title: 'Tải thất bại', icon: 'none' });
    }
  });
  downloadTask.start();

  // Theo dõi tiến trình tải
  downloadTask.onProgressUpdate((res) => {
    console.log('Tiến trình tải:', res.progress + '%');
    uni.showLoading({ title: `Đang tải: ${res.progress}%` });
  });
}

// Hàm so sánh phiên bản
function compareVersions(v1, v2) {
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const part1 = v1Parts[i] || 0;
    const part2 = v2Parts[i] || 0;
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  return 0; // Hai phiên bản bằng nhau
}
