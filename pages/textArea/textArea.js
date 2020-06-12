Page({
  data: {
    showMask: false
  },
  toggleMask(){
    this.setData({ showMask: !this.data.showMask });
  }
})