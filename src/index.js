import './style/index.less'
import router from './router'

window.wjsApp = (function () {
  let debug = function () {
    router.go('debugMenu')
  }
  return {
    debug: debug
  }
}())
