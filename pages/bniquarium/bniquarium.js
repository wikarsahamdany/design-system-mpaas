const app = getApp()

Page({
  data: {
    url: 'http://10.53.129.198:5002',
    score: 0,
    flagfetch: false,
    flag: false
  },
  onShareAppMessage(option){
    // console.log(option, '<<<<<<<<<<<<onsam')
  },
  onLoad(e) {
    // console.log(e, '<<<<<<<<<onload')
  },
  onWebViewLoad() {
    this.webViewContext = my.createWebViewContext('web-view')
  },
  onMessage(e) {
    // console.log(e.detail, '<<<<<<onmsg')

    // this.setData({ 
    //   score: e.detail.score
    // })

    // let payload = 23

    // console.log(payload, '<<<<<<<<<<<<<payload MPAAS')
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    // if (payload) {
    //   this.webViewContext = my.createWebViewContext('web-view')
    //   this.webViewContext.postMessage({
    //     webviewId: 'web-view',
    //     message: `Hello from MPASS ${payload}`,
    //     score: payload
    //   })
    // }
    let {
      message,
      score
    } = e.detail

    if (message == 'Loading data') {
      if (!this.data.flagfetch) {
        console.log(e)
        app.refreshAccessToken()
          .then((res) => {
            this.webViewContext.postMessage({
              'sendToWebView': my.getStorageSync({
                key: 'accessToken'
              }).data
            })

            this.setData({
              flagfetch: true
            })
          })

          .catch((err) => {
            console.log(err)
            app.logOut()
          })
      }
    } else if (message == 'Hello from game') {
      this.setData({
        score: score
      })

      // if (!this.data.flag) {
        console.log(e)
        app.refreshAccessToken()
          .then((res) => {
            this.webViewContext.postMessage({
              'sendToWebView': my.getStorageSync({
                key: "accessToken"
              }).data
            })

            this.setData({
              flag: true
            })
          })
          .catch((err) => {
            console.log(err)
          })
      // }
    }
  }
});
