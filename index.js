'use strict'

const { JSDOM } = require('jsdom')
const defaultConfig = { page: true, img: true, priority: 1, imgSrc: 'src', custom: [] }
const { enable, page, img, priority, imgSrc, custom } = { ...defaultConfig, ...(hexo.config.prefetch || {}) }
// 插件link标签
function createLink(dom, href) {
  const link = dom.window.document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  dom.window.document.head.appendChild(link)
}

const prefetchHandler = ({ dom, query, attr }) => {
  const array = dom.window.document.querySelectorAll(query)
  array.forEach((el) => createLink(dom, el.getAttribute(attr)))
}

function prefetchCustom(dom, customs) {
  for (let v of customs) createLink(dom, v)
}

function prefetch(result) {
  if (!enable) return
  const dom = new JSDOM(result)
  // 预加载页面
  if (page) prefetchHandler({ dom, query: 'a:not([target=_blank])', attr: 'href' })
  // 预加载图片
  if (img) prefetchHandler({ dom, query: 'img', attr: imgSrc })
  // 自定义预加载
  prefetchCustom(dom, custom)

  // 判断是否有h5标准头信息
  const isH5 = result.match(/^<!DOCTYPE html>/i)
  result = dom.window.document.documentElement.outerHTML
  if (isH5) isH5[0] += result
  return result
}

hexo.extend.filter.register('after_render:html', prefetch, priority)
