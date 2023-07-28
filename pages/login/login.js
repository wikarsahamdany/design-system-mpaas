const app = getApp()

Page({
  data: {
    agreementModal:false
  },
  onLoad() {},
  onShow(){
    
  },
  submitHandler(e){
    let {username, password} = e.detail.value

    my.httpRequest({
      url:  app.globalData.address + '/users/login',
      headers: {},
      method: 'post',
      data: {
        password, 
        username
      },
      timeout: 30000,
      dataType: "JSON",
      success: (result) => {

        my.setStorageSync({key:"accessToken",data:result.data.accessToken})
        my.setStorageSync({key:"refreshToken", data:result.data.refreshToken})

        app.globalData.username = result.data.username
        
        // USER HAS COLUMN ABOUT AGREEMENT STATUS ON DATABASE
        if(!result.data.isAgree){
          this.setData({agreementModal: !this.data.agreementModal})
        }else{
          my.navigateTo({
            url: '/pages/index/index'
          })
        }
      
      },
      fail: (error) => {
        console.log(error);
        this.setData({error: {message: error.data.message, status:true}})
      
      },
      complete: (result) => {
    
      }
    });

  
  },
  handleCloseToast(){
    this.setData({error:{...this.data.error, status:false}})
  }
  
});