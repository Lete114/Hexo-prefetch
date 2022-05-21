'use strict'

const { join } = require('path')
const { readFileSync, statSync } = require('fs')
const { parse, stringify } = JSON

const node_modules = 'node_modules/prefetch-page/dist/prefetch.attr.js'
const cwd_node_modules = join(process.cwd(), node_modules)
const current_node_modules = join(__dirname, node_modules)
let flag = true

/**
 * Read file contents
 * @param {String} file prefetch-page file page
 * @returns {String}
 */
function handler(file) {
  try {
    const stat = statSync(file)
    if (stat.isFile()) return readFileSync(file).toString()
  } catch (e) {
    if (flag) {
      flag = false
      return handler(current_node_modules)
    }
    throw new Error('Not found "prefetch-page" dependency package')
  }
}

/**
 * Handling script tag attributes
 * @param {Object} options Hexo-prefetch config
 * @returns {String}
 */
function setAttribute(options) {
  // Deep Clone
  options = parse(stringify(options))
  delete options.enable
  delete options.entry
  delete options.pageType
  let attr = ''
  // Turning two-dimensional arrays and structuring
  for (const [k, v] of Object.entries(options)) {
    attr += `${k}="${v}" `
  }
  return attr.trim()
}

hexo.extend.filter.register('after_generate', function () {
  const { prefetch } = this.config
  const content = `<script ${setAttribute(prefetch)}>${handler(cwd_node_modules)}</script>`
  hexo.extend.injector.register(prefetch.entry || 'head_end', content, prefetch.pageType || 'default')
})
