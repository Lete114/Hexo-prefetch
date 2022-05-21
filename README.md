## 简介

> 如果觉得还不错，可以给个 star✨ 支持一下 😊

具体请看: [https://github.com/Lete114/prefetch-page](https://github.com/Lete114/prefetch-page)

如何让 HTTP 强制缓存获得最新资源，可以使用 [Hexo-Hash](https://github.com/Lete114/Hexo-hash) 插件

## 安装

```bash
npm install hexo-prefetch --save
```

## 添加配置信息

```yml
# Hexo-prefetch
# https://github.com/Lete114/Hexo-prefetch
prefetch:
  enable: true # 是否启用预加载
  entry: head_end # 具体内容说明: https://hexo.io/zh-cn/api/injector#entry-lt-string-gt
  pageType: default # 具体内容说明: https://hexo.io/zh-cn/api/injector#to-lt-string-gt
  delay: 1000 # 延迟1秒后预加载
  threshold: 25 # 目标元素在浏览器可视区域25%时触发预加载
  # 更多配置信息请看: https://github.com/Lete114/prefetch-page
  # 自定义预加载资源，如果你开启了本地搜索功能，可以将下方的注释去掉，当使用搜索时不用等太长的请求时间
  # customs: [/seatch.json]
```
