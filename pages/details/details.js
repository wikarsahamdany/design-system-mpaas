Page({
  data: {
    user: null
  },
  onLoad(query) {
    my.request({
      url: `https://dummyjson.com/users/${query.id}`,
      success: (res) => {
        this.setData({
          user: res.data
        })
        console.log(this.data.user)
      },
      fail: () => {
        my.alert({
          content: 'Oops! Something Went horribly wrong'
        })
      }
    })
  },
  openLocation() {
    my.openLocation({
      longitude: this.data.user.address.coordinates.lng,
      latitude: this.data.user.address.coordinates.lat,
      address: this.data.user.address.address,
      name: `${this.data.user.lastName}'s Residence`,
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
});
