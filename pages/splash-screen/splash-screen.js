Page({
  data: {},
  onLoad() {

  },

  onShow(){
  setTimeout(() => {
      if(my.getStorageSync({key:"accessToken"})){
        my.navigateTo({
          url: '/pages/login/login'
        });
      } else {
        my.navigateTo({url:'/pages/index/index'})
      }
  }, 2000);
  }
});