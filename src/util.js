import $ from 'jquery'
import state from './state'

export default {
  /**
   * HTTP调用封装
   * @param url
   * @param payload
   * @param callback
   */
  invokeSvc(sysType, url, payload, callback) {
    let that = this
    this.showLoading()
    let apiUrl = state.url.apiBaseUrl + url
    console.log('请求', apiUrl, payload)
    $.ajax({
      type: 'POST',
      url: apiUrl,
      dataType: 'json',
      // headers: headers,
      data: payload,
      contentType: 'application/json',
      beforeSend: function (req) {
        that.showLoading()
      },
      success: function (result) {
        console.log('响应', result)
        if (typeof callback === 'function') {
          let jsonResult = null
          if (typeof result === 'string') {
            jsonResult = JSON.parse(result)
          } else {
            jsonResult = result
          }
          callback(jsonResult)
        }
      },
      complete: function (XMLHttpRequest, textStatus) {
        that.hideLoading()
      },
      error: function (jqXHR) {
        console.log(jqXHR)
      }
    })
  },
  /**
   * 显示读取中
   */
  showLoading() {
    $('#wjs-loading').fadeIn(300)
    $('#wjs-loading span').css('margin-top', ($(window).height() - $('#wjs-loading span').height()) / 2)
  },

  /**
   * 隐藏读取中
   */
  hideLoading() {
    $('#wjs-loading').fadeOut(300)
  },

  /**
   * 模态窗口
   * @param type 窗口类型 alert/confirm
   * @param title 标题
   * @param msg 消息
   * @param submitBtnText 确认按钮文字
   * @param cancelBtnText 取消按钮文字
   * @param submitCallback 确认回调
   * @param cancelCallback 取消回调
   */
  modalDialog(type, title, msg, submitBtnText, cancelBtnText, submitCallback, cancelCallback) {
    // 窗口类型 alert/confirm
    if (type === 'alert') {
      $('#wjs-modal-btn-cancel').hide()
    } else if (type === 'confirm') {
      $('#wjs-modal-btn-cancel').show()
    } else {
      console.log('参数错误')
      return
    }

    // 按钮文本
    if (typeof submitBtnText === 'string') {
      $('#wjs-modal-btn-submit').text(submitBtnText)
    } else {
      $('#wjs-modal-btn-submit').text('确定')
    }
    if (typeof cancelBtnText === 'string') {
      $('#wjs-modal-btn-cancel').text(cancelBtnText)
    } else {
      $('#wjs-modal-btn-cancel').text('取消')
    }
    // 标题
    $('#wjs-modal-title').text(title)
    // 消息文本
    $('#wjs-modal-body').text(msg)

    // 点击事件
    $('#wjs-modal-btn-submit').unbind('click').click(function () {
      $('#wjs-modal-bg').fadeOut(500, function () {
        if (typeof submitCallback === 'function') {
          $('#wjs-modal-content').css({'top': '-50%'})
          submitCallback()
        }
      })
    })
    $('#wjs-modal-btn-cancel').unbind('click').click(function () {
      $('#wjs-modal-bg').fadeOut(500, function () {
        if (typeof cancelCallback === 'function') {
          $('#wjs-modal-content').css({'top': '-50%'})
          cancelCallback()
        }
      })
    })
    // 页面展现
    $('#wjs-modal-bg').fadeIn(500, function () {
      let top = ($(window).height() - $('#wjs-modal-content').height()) / 2
      $('#wjs-modal-content').animate({'top': top})
    })
  }
}
