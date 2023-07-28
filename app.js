import jwtDecode  from "jwt-decode" 

App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
    my.on('nativeToTiny', (res) => {
      my.showToast({
        type: 'none',
        content: JSON.stringify(res),
        duration: 3000,
        success: () => {

        },
        fail: () => {

        },
        complete: () => {

        }
      });
    })

  },
  onShow() {
    console.log('App Show');
    my.navigateTo({
      url: "/pages/splash-screen/splash-screen"
    })

    let token = my.getStorageSync({key:"accessToken"})
    if(!token.data){
      console.log("xxxxxxx");
      my.navigateTo({url:"/pages/login/login"})
    }

  },
  onHide() {
    console.log('App Hide');
  },

  getUserData() {
    return new Promise((resolve, reject) => {
      my.httpRequest({
        url:  this.globalData.address + "/users",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true',

          "access_token": my.getStorageSync({
            key: "accessToken"
          }).data
        },
        dataType: "json",
        timeout: 30000,
        success: (result) => {
            let {
              saldo,
              rekening,
              username,
              isAgree
            } = result.data
            
            console.log("<<<<<<success");
          
            resolve({
              saldo,
              rekening,
              username,
              isAgree
            })
        },
        error: (error) => {
          console.log(error, "<<<<<<");
          reject({
            error
          })
        },
        complete: () => {

        }
      })
    })

  },

  //THIS FUNCTION IS CALLED EVERYTIME THIS PROGRAM WANT TO SEND REQUEST TO ANOTHER API FROM PAGES AND COMPONENTS
  refreshAccessToken(){
    return new Promise((resolve,reject) =>{

      //IN HERE THE ACCESSTOKEN DECODED BY A PACKAGE CALLED 'JWT-DECODE', TO CHECK THE EXPIRY TIME
      let decoded = jwtDecode(my.getStorageSync({key:"accessToken"}).data)
    

      if(decoded.exp < Date.now()/1000){
        //IF THE ACCESSTOKEN EXPIRED, THIS CODE EXECUTE
        console.log("expired");

        my.httpRequest({
          url:  this.globalData.address + "/users/refreshAccess",
          method:"GET",
          headers:{
            refresh_token: my.getStorageSync({key:"refreshToken"}).data,
            "content-type":"application/json",
            'ngrok-skip-browser-warning': 'true',
          },
          dataType:"JSON",
          timeout: 30000,
          success: (result)=>{
            //IF THE ACCESSTOKEN SUCCESSFULLY RENEWED, THIS CODE RUN
            console.log(" refresh token success");            
            my.setStorageSync({"key":"accessToken", data:result.data.accessToken})
            resolve("refreshed")
          },
          fail: (error) =>{
            //IF THE ACCESSTOKEN FAILED TO BE RENEWED (BECAUSE OF THE REFRESHTOKEN HAS BEEN EXPIRED), THIS CODE RUN
            my.showToast({
              content: error.data.message
            });
            reject(error)
          },
          complete:(result) =>{

          }
        })

      } else {
        //IF THE ACCESSTOKEN IS NOT EXPIRED YET, THIS CODE RUN, AND RETURN ONLY STRING 
        console.log("refresh token still valid");
        resolve("fresh")
      }
    })
  },
  
  logOut(){
    my.clearStorageSync();

    my.navigateTo({url:"/pages/login/login"})
  },

  globalData: {
    accessToken: "",
    cart: [],
    totalSelected: 0,
    username: 0,
    address: "https://2d89-103-144-175-27.ngrok-free.app"
  },
});