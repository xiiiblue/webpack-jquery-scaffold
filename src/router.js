import $ from 'jquery'
import state from './state'


/**
 * 动态路由
 */
export default {
  /**
   * 页面跳转
   * @param page 页面名称
   */
  go(page) {
    console.log('goto: ' + page)
    const wrapper = $('#wjs-wrapper')
    let that = this
    if (wrapper.length === 0) {
      // 如果窗体不存在，则先渲染窗体
      this.initWrapper(function () {
        that.renderPage(page)
      })
    } else {
      // 渲染页面
      this.renderPage(page)
    }
  },

  /**
   * 渲染页面
   */
  renderPage(page) {
    let that = this
    // 使用import()动态加载时会产生多余JS
    const tpl = require('./pages/' + page + '.tpl')
    const mod = require('./pages/' + page + '.js')
    const $wrapper = $('#wjs-wrapper')
    $wrapper.fadeOut(500, function () {
      $wrapper.empty().append(tpl)
      $wrapper.fadeIn(500, function () {
        $('.clsBtn').unbind('click').click(function (data) {
          that.closeWrapper('8888', '用户取消' + $('#wjs-title-name').text() + '操作')
        })
        mod.default.init()
      })
    })
  },

  /**
   * 打开浮动窗体
   * @param callback 成功回调
   */
  initWrapper(callback) {
    let u = navigator.userAgent
    // let app = navigator.appVersion
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    let isMobile = isAndroid || isiOS

    // 禁用页面滚动
    $(document.body).addClass('html-body-overflow')
    // 渲染窗体
    const tpl = require('./pages/wrapper.tpl')
    $('body').append(tpl)
    if (isMobile) {
      $('#wjs-frame').addClass('wjs-frame-mobile')
      $('#wjs-modal-content').addClass('wjs-modal-content-mobile')
    }
    // 皮肤
    // if (state.cfg.skin && state.cfg.skin !== 'default') {
    //   let skinName = state.cfg.skin
    //   $('#wjs-frame').addClass('skin-' + skinName)
    // }
    // 动画
    let frameTop = '15%'
    if (isMobile) {
      frameTop = '3.5%'
    }
    $('#wjs-frame').show(1000).animate({top: frameTop}, function () {
      if (typeof callback === 'function') {
        callback()
      }
    })
  },

  /**
   * 关闭浮动窗体
   * @param result 0000-成功 其它-失败
   * @param msg 报错信息
   */
  closeWrapper(result, msg) {
    // 如果异常，则弹窗报错
    if (result !== '0000') {
      console.log(msg)
    }
    let res = {}
    if (state.mode === 'verify') {
      res = {
        result: result,
        name: state.xm,
        idCard: state.sfzh,
        authid: state.authid,
        msg: msg
      }
    } else if (state.mode === 'confirm') {
      res = {
        result: result,
        msg: msg
      }
    } else {
      console.log('mode状态不正确')
    }
    // 参数回传
    let callback = state.responseCallback
    if (typeof callback === 'function') {
      callback(res)
    }
    $(document.body).removeClass('html-body-overflow')
    // 动画
    $('#wjs-frame').animate({top: '-60%'}, function () {
      $('#wjs-bg').remove()
    })
  },
}
