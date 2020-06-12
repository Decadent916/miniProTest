const util = require('../../utils/util.js');
let pageData = {};
Page({
  data: {
    navList:[
      { id: 0, name: 'test1', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 1, name: 'test2', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 2, name: 'test3', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 3, name: 'test4', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 4, name: 'test5', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 5, name: 'test6', isFresh: false, showLoading: false, cardNum: 20 },
      { id: 6, name: 'test7', isFresh: false, showLoading: false, cardNum: 20 }
    ],
    activeNavIndex: 0,
    canSwitch: true,
    systemFresh: false,
    freshDistance: 0
  },
  onLoad(){
    // console.log(util)
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },
  switchPage(e) {
    const { navindex = 0 } = e.currentTarget.dataset;
    this.setData({ activeNavIndex: navindex });
  },
  touchStart(e) {
    const { clientX = 0, clientY = 0 } = e.changedTouches[0];
    Object.assign(pageData, { startX: clientX, startY: clientY });
  },
  touchMove(e) {
    const { clientX = 0, clientY = 0 } = e.changedTouches[0], { startY = 0, startX = 0 } = pageData;
    let { canSwitch = true, navList = [], activeNavIndex = 0 } = this.data;
    let distanceY = clientY - startY, distanceX = clientX - startX;
    if (canSwitch){
      if (Math.abs(distanceX) < Math.abs(distanceY) && Math.abs(distanceX) < 5){
        if (distanceY > 0) {
          Object.assign(navList[activeNavIndex], { isFresh: true, });
          this.setData({ freshDistance: distanceY, canSwitch: false, navList });
        }
      }
    }else{
      if (distanceY > 0) {
        Object.assign(navList[activeNavIndex], { isFresh: true, });
        this.setData({ freshDistance: distanceY, canSwitch: false, navList });
      }
    }
  },
  touchEnd(e) {
    const { clientX = 0 } = e.changedTouches[0], { startX = 0 } = pageData;
    let { activeNavIndex = 0, canSwitch = true, navList = [], freshDistance = 0 } = this.data;
    if (canSwitch){
      let distanceX = clientX - startX, direction = distanceX > 0 ? 'switchLeft' : (distanceX < 0 ? 'switchRight' : 'current');
      distanceX = Math.abs(distanceX);
      if (distanceX >= 20) {
        if (direction === 'current') {
          this.setData({ activeNavIndex });
        } else if (direction === 'switchLeft') {
          this.setData({ activeNavIndex: activeNavIndex ? activeNavIndex - 1 : activeNavIndex });
        } else if (direction === 'switchRight') {
          this.setData({ activeNavIndex: activeNavIndex === navList.length - 1 ? activeNavIndex : activeNavIndex + 1 });
        }
      } else {
        this.setData({ activeNavIndex });
      }
    }else{
      if (freshDistance < 20) {
        this.setData({ freshDistance: 0, canSwitch: true });
      } else {
        this.setData({ freshDistance: 20 }, () => {
          setTimeout(() => {
            Object.assign(navList[activeNavIndex], { isFresh: false, cardNum: 20 });
            this.setData({ freshDistance: 0, canSwitch: true, navList })
          }, 2000);
        });
      }
    }
  },
  touchCancel(e) {
    const { clientX = 0 } = e.changedTouches[0], { startX = 0 } = pageData;
    let { activeNavIndex = 0, canSwitch = true, navList = [], freshDistance = 0 } = this.data;
    if (canSwitch) {
      let distanceX = clientX - startX, direction = distanceX > 0 ? 'switchLeft' : (distanceX < 0 ? 'switchRight' : 'current');
      distanceX = Math.abs(distanceX);
      if (distanceX >= 20) {
        if (direction === 'current') {
          this.setData({ activeNavIndex });
        } else if (direction === 'switchLeft') {
          this.setData({ activeNavIndex: activeNavIndex ? activeNavIndex - 1 : activeNavIndex });
        } else if (direction === 'switchRight') {
          this.setData({ activeNavIndex: activeNavIndex === navList.length - 1 ? activeNavIndex : activeNavIndex + 1 });
        }
      } else {
        this.setData({ activeNavIndex });
      }
    } else {
      if (freshDistance < 20) {
        this.setData({ freshDistance: 0, canSwitch: true });
      } else {
        this.setData({ freshDistance: 20 }, () => {
          setTimeout(() => {
            Object.assign(navList[activeNavIndex], { isFresh: false, cardNum: 20 });
            this.setData({ freshDistance: 0, canSwitch: true, navList })
          }, 2000);
        });
      }
    }
  },
  //小程序自带下拉刷新，需高版本支持
  beginFresh(e) {
    let { activeNavIndex = 0, navList = [] } = this.data;
    setTimeout(() => {
      Object.assign(navList[activeNavIndex], { isFresh: false, });
      this.setData({ navList });
    }, 2000);
  },
  //自定义下拉刷新
  listScroll(e) {
    this.setData({ canSwitch: false });
    // const { scrollTop = 0 } = e.detail;
    // if (scrollTop < 5) {
    //   this.setData({ toUpper: true });
    // } else {
    //   this.setData({ toUpper: false });
    // }
  },
  bottomLoad(e){
    let { activeNavIndex = 0, navList = [] } = this.data;
    Object.assign(navList[activeNavIndex], { showLoading: true, });
    this.setData({ navList }, () => {
      setTimeout(() => {
        Object.assign(navList[activeNavIndex], { showLoading: false, cardNum: navList[activeNavIndex].cardNum + 20 });
        this.setData({ navList });
      }, 2000);
    });
  }
})