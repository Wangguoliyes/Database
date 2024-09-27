// app.js
App({
  onLaunch() {
    if (!wx.cloud) {
     wx.showToast({
       title: '云服务启动失败',
     })
    } else {
      wx.cloud.init({
        env: 'document-8g25jiph76464510', // 云开发环境ID
        traceUser: true
      });
    }

  },

})
