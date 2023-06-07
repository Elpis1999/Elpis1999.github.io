/**
 * 适配 pjax
 * common.js 统一存放变量、函数
 * run.js 统一调用变量、函数
 */

// 监听复制事件，展示element UI弹窗
$(document).on('copy', () => {
  debounce(() => {
    new Vue({
      data() {
        this.$notify({
          title: '复制成功🍬',
          message: '若要转载最好保留原文链接哦，给你一个大大的赞！',
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: 'success',
          duration: 5000
        })
      }
    })
  }, 500)
})

// 监听滚动事件，计算阅读百分比
$(document).on('scroll', percent)

// 当页面加载完成后，统一调用
$(document).ready(() => {
  dark() // 星空背景特效
  CURSOR = new Cursor() // 实例化自定义鼠标样式
  // 需要重新获取列表时，使用 CURSOR.refresh()
  showWelcome() // 渲染欢迎信息
  renderTime() // 渲染页脚计时器
})

// pjax 适配
$(window).on('pjax:complete', () => {
  showWelcome()
})
