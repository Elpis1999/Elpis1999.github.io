/**
 * 适配 pjax
 * common.js 统一存放变量、函数
 * run.js 统一调用变量、函数
 */

// ----------------------------------------

// 星空背景特效
const dark = function () {
  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame

  let n,
    e,
    i,
    h,
    t = 0.05,
    s = document.getElementById('universe'),
    o = !0,
    a = '180,184,240',
    r = '226,225,142',
    d = '226,225,224',
    c = []

  function f() {
    ;(n = window.innerWidth),
      (e = window.innerHeight),
      (i = 0.216 * n),
      s.setAttribute('width', n),
      s.setAttribute('height', e)
  }

  function u() {
    h.clearRect(0, 0, n, e)
    for (let t = c.length, i = 0; i < t; i++) {
      let s = c[i]
      s.move(), s.fadeIn(), s.fadeOut(), s.draw()
    }
  }

  function y() {
    ;(this.reset = function () {
      ;(this.giant = m(3)),
        (this.comet = !this.giant && !o && m(10)),
        (this.x = l(0, n - 10)),
        (this.y = l(0, e)),
        (this.r = l(1.1, 2.6)),
        (this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t),
        (this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120)),
        (this.fadingOut = null),
        (this.fadingIn = !0),
        (this.opacity = 0),
        (this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet + 1 - 1))),
        (this.do = l(5e-4, 0.002) + 0.001 * (this.comet + 1 - 1))
    }),
      (this.fadeIn = function () {
        this.fadingIn &&
          ((this.fadingIn = !(this.opacity > this.opacityTresh)),
          (this.opacity += this.do))
      }),
      (this.fadeOut = function () {
        this.fadingOut &&
          ((this.fadingOut = !(this.opacity < 0)),
          (this.opacity -= this.do / 2),
          (this.x > n || this.y < 0) && ((this.fadingOut = !1), this.reset()))
      }),
      (this.draw = function () {
        if ((h.beginPath(), this.giant))
          (h.fillStyle = 'rgba(' + a + ',' + this.opacity + ')'),
            h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1)
        else if (this.comet) {
          ;(h.fillStyle = 'rgba(' + d + ',' + this.opacity + ')'),
            h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1)
          for (let t = 0; t < 30; t++)
            (h.fillStyle =
              'rgba(' +
              d +
              ',' +
              (this.opacity - (this.opacity / 20) * t) +
              ')'),
              h.rect(
                this.x - (this.dx / 4) * t,
                this.y - (this.dy / 4) * t - 2,
                2,
                2
              ),
              h.fill()
        } else
          (h.fillStyle = 'rgba(' + r + ',' + this.opacity + ')'),
            h.rect(this.x, this.y, this.r, this.r)
        h.closePath(), h.fill()
      }),
      (this.move = function () {
        ;(this.x += this.dx),
          (this.y += this.dy),
          !1 === this.fadingOut && this.reset(),
          (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
      }),
      setTimeout(function () {
        o = !1
      }, 50)
  }

  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }

  function l(t, i) {
    return Math.random() * (i - t) + t
  }
  f(),
    window.addEventListener('resize', f, !1),
    (function () {
      h = s.getContext('2d')
      for (let t = 0; t < i; t++) (c[t] = new y()), c[t].reset()
      u()
    })(),
    (function t() {
      let theme = document
        .getElementsByTagName('html')[0]
        .getAttribute('data-theme')

      if (theme === 'light') {
        s.style.display = 'none'
      } else {
        s.style.display = 'block'
      }
      theme == 'dark' && u(), window.requestAnimationFrame(t)
    })()
}

// ----------------------------------------

// 防抖全局计时器
let TT = null
const debounce = (fn, time) => {
  if (TT !== null) clearTimeout(TT)
  TT = setTimeout(fn, time)
}

// ----------------------------------------

// 生成分享信息，并展示弹窗
const share_ = () => {
  // 获取路由
  let url = window.location.origin + window.location.pathname
  try {
    // 截取标题
    let title = document.title
    let subTitle = title.endsWith('| Elpis')
      ? title.substring(0, title.length - 14)
      : title
    navigator.clipboard.writeText(
      'Elpis的站内分享\n标题：' +
        subTitle +
        '\n链接：' +
        url +
        '\n欢迎来访！🍭🍭🍭'
    )

    new Vue({
      data() {
        this.$notify({
          title: '成功复制分享信息🎉',
          message: '您现在可以通过粘贴直接跟小伙伴分享了！',
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: 'success',
          duration: 5000
        })
      }
    })
  } catch (error) {
    console.error('复制失败！', err)
  }
}

// ----------------------------------------

// 防抖包装 share_ 函数
const share = () => {
  debounce(share_, 500)
}

// ----------------------------------------

// 计算并渲染，阅读百分比
const percent = () => {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度
    result = Math.round((a / b) * 100), // 计算百分比
    up = document.querySelector('#go-up') // 获取按钮

  if (result <= 95) {
    up.childNodes[0].style.display = 'none'
    up.childNodes[1].style.display = 'block'
    up.childNodes[1].innerText = `${result}%`
  } else {
    up.childNodes[1].style.display = 'none'
    up.childNodes[0].style.display = 'block'
  }
}

// ----------------------------------------

// 自定义鼠标样式
let CURSOR

const lerp = (a, b, n) => (1 - n) * a + n * b

const getStyle = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr]
  } catch (e) {}
  return ''
}

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null }
    this.pt = []
    this.create()
    this.init()
    this.render()
  }

  move(left, top) {
    this.cursor.style['left'] = `${left}px`
    this.cursor.style['top'] = `${top}px`
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement('div')
      this.cursor.id = 'cursor'
      this.cursor.classList.add('hidden')
      document.body.append(this.cursor)
    }

    var el = document.getElementsByTagName('*')
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], 'cursor') == 'pointer') this.pt.push(el[i].outerHTML)

    document.body.appendChild((this.scr = document.createElement('style')))
    // 这里改变鼠标指针的颜色 由svg生成
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='rgb(33, 140, 116)'/></svg>") 4 4, auto}`
  }

  refresh() {
    this.scr.remove()
    this.cursor.classList.remove('hover')
    this.cursor.classList.remove('active')
    this.pos = { curr: null, prev: null }
    this.pt = []

    this.create()
    this.init()
    this.render()
  }

  init() {
    document.onmouseover = e =>
      this.pt.includes(e.target.outerHTML) && this.cursor.classList.add('hover')
    document.onmouseout = e =>
      this.pt.includes(e.target.outerHTML) &&
      this.cursor.classList.remove('hover')
    document.onmousemove = e => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8)
      this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }
      this.cursor.classList.remove('hidden')
    }
    document.onmouseenter = e => this.cursor.classList.remove('hidden')
    document.onmouseleave = e => this.cursor.classList.add('hidden')
    document.onmousedown = e => this.cursor.classList.add('active')
    document.onmouseup = e => this.cursor.classList.remove('active')
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = lerp(this.pos.prev.x, this.pos.curr.x, 0.15)
      this.pos.prev.y = lerp(this.pos.prev.y, this.pos.curr.y, 0.15)
      this.move(this.pos.prev.x, this.pos.prev.y)
    } else {
      this.pos.prev = this.pos.curr
    }
    requestAnimationFrame(() => this.render())
  }
}

// ----------------------------------------

// 使用腾讯地图 API 获取用户地理位置信息，并在侧边栏渲染欢迎信息
const tencentMapUrl = 'https://apis.map.qq.com/ws/location/v1/ip'
const tencentMapKey = 'PSJBZ-OE4W7-TLPXV-PHR2W-UWIVH-NCBMT'

// 获取用户地理位置信息, promise 化 $.ajax
const getiIpLoacation = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      // jsonp 获取用户地理位置信息
      type: 'get',
      url: tencentMapUrl,
      data: {
        key: tencentMapKey,
        output: 'jsonp'
      },
      dataType: 'jsonp',
      success: function (res) {
        return resolve(res)
        // ipLoacation = res
      }
    })
  })
}

const getDistance = (e1, n1, e2, n2) => {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
    e *= PI / 180
    n *= PI / 180
    return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }

  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r)
}

async function showWelcome() {
  let ipLoacation = await getiIpLoacation()
  let dist = getDistance(
    103.74082,
    30.8672,
    ipLoacation.result.location.lng,
    ipLoacation.result.location.lat
  ) //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation
  let ip
  let posdesc
  //根据国家、省份、城市信息自定义欢迎语
  switch (ipLoacation.result.ad_info.nation) {
    case '日本':
      posdesc = 'よろしく，一起去看樱花吗'
      break
    case '美国':
      posdesc = 'Let us live in peace!'
      break
    case '英国':
      posdesc = '想同你一起夜乘伦敦眼'
      break
    case '俄罗斯':
      posdesc = '干了这瓶伏特加！'
      break
    case '法国':
      posdesc = "C'est La Vie"
      break
    case '德国':
      posdesc = 'Die Zeit verging im Fluge.'
      break
    case '澳大利亚':
      posdesc = '一起去大堡礁吧！'
      break
    case '加拿大':
      posdesc = '拾起一片枫叶赠予你'
      break
    case '中国':
      pos =
        ipLoacation.result.ad_info.province +
        ' ' +
        ipLoacation.result.ad_info.city +
        ' ' +
        ipLoacation.result.ad_info.district
      ip = ipLoacation.result.ip
      switch (ipLoacation.result.ad_info.province) {
        case '北京市':
          posdesc = '北——京——欢迎你~~~'
          break
        case '天津市':
          posdesc = '讲段相声吧。'
          break
        case '河北省':
          posdesc = '山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。'
          break
        case '山西省':
          posdesc = '展开坐具长三尺，已占山河五百余。'
          break
        case '内蒙古自治区':
          posdesc = '天苍苍，野茫茫，风吹草低见牛羊。'
          break
        case '辽宁省':
          posdesc = '我想吃烤鸡架！'
          break
        case '吉林省':
          posdesc = '状元阁就是东北烧烤之王。'
          break
        case '黑龙江省':
          posdesc = '很喜欢哈尔滨大剧院。'
          break
        case '上海市':
          posdesc = '众所周知，中国只有两个城市。'
          break
        case '江苏省':
          switch (ipLoacation.result.ad_info.city) {
            case '南京市':
              posdesc = '这是我挺想去的城市啦。'
              break
            case '苏州市':
              posdesc = '上有天堂，下有苏杭。'
              break
            default:
              posdesc = '散装是必须要散装的。'
              break
          }
          break
        case '浙江省':
          posdesc = '东风渐绿西湖柳，雁已还人未南归。'
          break
        case '河南省':
          switch (ipLoacation.result.ad_info.city) {
            case '郑州市':
              posdesc = '豫州之域，天地之中。'
              break
            case '南阳市':
              posdesc = '臣本布衣，躬耕于南阳。此南阳非彼南阳！'
              break
            case '驻马店市':
              posdesc = '峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！'
              break
            case '开封市':
              posdesc = '刚正不阿包青天。'
              break
            case '洛阳市':
              posdesc = '洛阳牡丹甲天下。'
              break
            default:
              posdesc = '可否带我品尝河南烩面啦？'
              break
          }
          break
        case '安徽省':
          posdesc = '蚌埠住了，芜湖起飞。'
          break
        case '福建省':
          posdesc = '井邑白云间，岩城远带山。'
          break
        case '江西省':
          posdesc = '落霞与孤鹜齐飞，秋水共长天一色。'
          break
        case '山东省':
          posdesc = '遥望齐州九点烟，一泓海水杯中泻。'
          break
        case '湖北省':
          posdesc = '来碗热干面！'
          break
        case '湖南省':
          posdesc = '74751，长沙斯塔克。'
          break
        case '广东省':
          posdesc = '老板来两斤福建人。'
          break
        case '广西壮族自治区':
          posdesc = '桂林山水甲天下。'
          break
        case '海南省':
          posdesc = '朝观日出逐白浪，夕看云起收霞光。'
          break
        case '四川省':
          posdesc = '康康川妹子。'
          break
        case '贵州省':
          posdesc = '茅台，学生，再塞200。'
          break
        case '云南省':
          posdesc = '玉龙飞舞云缠绕，万仞冰川直耸天。'
          break
        case '西藏自治区':
          posdesc = '躺在茫茫草原上，仰望蓝天。'
          break
        case '陕西省':
          posdesc = '来份臊子面加馍。'
          break
        case '甘肃省':
          posdesc = '羌笛何须怨杨柳，春风不度玉门关。'
          break
        case '青海省':
          posdesc = '牛肉干和老酸奶都好好吃。'
          break
        case '宁夏回族自治区':
          posdesc = '大漠孤烟直，长河落日圆。'
          break
        case '新疆维吾尔自治区':
          posdesc = '驼铃古道丝绸路，胡马犹闻唐汉风。'
          break
        case '台湾省':
          posdesc = '我在这头，大陆在那头。'
          break
        case '香港特别行政区':
          posdesc = '永定贼有残留地鬼嚎，迎击光非岁玉。'
          break
        case '澳门特别行政区':
          posdesc = '性感荷官，在线发牌。'
          break
        default:
          posdesc = '带我去你的城市逛逛吧！'
          break
      }
      break
    default:
      posdesc = '带我去你的国家逛逛吧。'
      break
  }

  // 根据本地时间切换欢迎语
  let timeChange
  let date = new Date()
  if (date.getHours() >= 5 && date.getHours() < 11)
    timeChange = '<span>上午好</span>，一日之计在于晨！'
  else if (date.getHours() >= 11 && date.getHours() < 13)
    timeChange = '<span>中午好</span>，该摸鱼吃午饭了。'
  else if (date.getHours() >= 13 && date.getHours() < 15)
    timeChange = '<span>下午好</span>，懒懒地睡个午觉吧！'
  else if (date.getHours() >= 15 && date.getHours() < 16)
    timeChange = '<span>三点几啦</span>，一起饮茶呀！'
  else if (date.getHours() >= 16 && date.getHours() < 19)
    timeChange = '<span>夕阳无限好！</span>'
  else if (date.getHours() >= 19 && date.getHours() < 24)
    timeChange = '<span>晚上好</span>，夜生活嗨起来！'
  else timeChange = '夜深了，早点休息，少熬夜。'

  try {
    // 自定义文本和需要放的位置
    document.getElementById(
      'welcome-info'
    ).innerHTML = `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`
  } catch (err) {
    // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
  }
}

// ----------------------------------------

// 页脚计时器
let now = new Date()

function createTime() {
  // 当前时间
  now.setTime(now.getTime() + 1000)
  let start = new Date('08/01/2022 00:00:00') // 旅行者1号开始计算的时间
  let dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17) // 距离=秒数*速度 记住转换毫秒
  let unit = (dis / 149600000).toFixed(6) // 天文单位
  // 网站诞生时间
  let grt = new Date('04/23/2023 00:00:00')
  let days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours)
  1 == String(hnum).length && (hnum = '0' + hnum)
  let minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes)
  1 == String(mnum).length && (mnum = '0' + mnum)
  let seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds)
  1 == String(snum).length && (snum = '0' + snum)
  let currentTimeHtml = ''
  ;(currentTimeHtml =
    hnum < 18 && hnum >= 9
      ? `<div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
      : `<div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById('workboard') &&
      (document.getElementById('workboard').innerHTML = currentTimeHtml)
}

let timeTimer = null
// 设置重复执行函数，一秒一刷新
const renderTime = () => {
  // 适配 pjax 需要先清除定时器
  if (timeTimer) clearInterval(timeTimer)
  timeTimer = setInterval(() => createTime(), 1000)
}

// ----------------------------------------
