Page({
  data:{
    count: 0,
    inputValue: '',
    users: null
  },
  onLoad(query) {
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onShareAppMessage() {
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  onChange(e) {
    this.setData({
      inputValue: e
    })
  },
  submitHandler() {
    if (this.data.inputValue.length === 0){
      my.alert({
        content: "Please Input User's Name"
      })
    } else {
      my.showLoading({
        content: 'Please wait...',
        success: () => {
          setTimeout(() => {
            my.request({
              url:  `https://dummyjson.com/users/search?q=${this.data.inputValue}`,
              success: (res) => {
                this.setData({
                  users: res.data.users
                })
              },
              fail: () => {
                my.alert({
                  content: 'Oops! something went horribly wrong!!'
                })
              }
            });
            my.hideLoading();
          }, 3000)
        },
        fail: (err) => {
          console.log(err)
        }
      })
    }
  },
  onConfirm(){
    this.submitHandler()
  },
  previewImage(e){
    console.log(e.target.dataset.id)
    my.navigateTo({
      url: `/pages/details/details?id=${e.target.dataset.id}`
    })
  },
  bniquarium(){
    my.navigateTo({
      url: "/pages/bniquarium/bniquarium"
    })
  },
  logoutHandler() {
    my.clearStorageSync()
    my.navigateTo({
      url: '/pages/login/login'
    })
    my.alert({
      content: "Logout successful!"
    })
  }
});
