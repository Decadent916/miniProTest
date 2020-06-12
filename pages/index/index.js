const app = getApp()

Page({
  data: {
    bgTextStyle: 'dark',
    scrollTop: undefined,
    bgColor: '#ff0000',
    bgColorTop: '#00ff00',
    bgColorBottom: '#0000ff',
    nbTitle: '原标题',
    nbLoading: false,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    menuColor: 0,
    timeoutId: null
  },
  scrollTo100: function () {
    this.setData({
      scrollTop: '200rpx'
    })
  },
  debounce: function(fn,ms){
    const self = this;
    let { timeoutId = null } = this.data;
    return function(...args){
      if (timeoutId){
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn.apply(this,args);
      },ms);
      self.setData({
        timeoutId
      });
    }
  },
  pageScroll: function (e) {
    const self = this;
    let menuColor = e.detail.scrollTop / 200;
    if (menuColor > 1) {
      menuColor = 1;
    }
    self.setData({
      menuColor
    });
    // let handle = this.debounce(() => {
    //   let menuColor = e.detail.scrollTop / 200;
    //   if (menuColor > 1) {
    //     menuColor = 1;
    //   }
    //   console.log(menuColor);
    //   self.setData({
    //     menuColor
    //   });
    // },0);
    // handle();
  },
  pageScrollDone: function (e) {
    console.log('scrolldone', e.detail)
  },
  pageNav(){
    wx.navigateTo({
      url: '/pages/rich/rich'
    })
  }
})
