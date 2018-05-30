import $ from 'jquery'
import util from '../util'

/**
 * DEBUG MENU
 */
export default {
  /**
   * 页面初始化
   */
  init() {
    $('#wjs-btn-alertTest').click(function () {
      util.modalDialog('alert', '我是标题', '我是内容。。。。', null, null, function () {
        console.log('点击了确认按钮')
      })
    })
    $('#wjs-btn-confirmTest').click(function () {
      util.modalDialog('confirm', '我是标题', '我是内容。。。。', null, null,
        function () {
          console.log('点击了确认按钮')
        },
        function () {
          console.log('点击了取消按钮')
        })
    })
  },
}
