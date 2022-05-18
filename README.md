## 简介

> 如果觉得还不错，可以给个 star✨ 支持一下 😊

> 简而言之: 举例看抖音，下一个视频永远都是加载好的，所以你感受不到缓存视频卡顿感，该插件就是预加载你博客的页面，可实现秒开下一个页面的效果

当浏览器**网络空闲**的时候，为当前页面的所有超链接地址进行资源**预加载**，能使用户点开谋篇文章时，达到秒开的效果

它不会影响页面打开速度，只有当前页面的所有请求结束后，网络处于空闲状态时才会对文件进行预加载

**使用需谨慎，这会消耗用户更多的带宽流量，如果是手机用户，可能会消耗很多流量**

**同时如果你使用了 CDN，也会消耗 CDN 的带宽流量，这一点请注意，建议使用该插件前开启 HTTP 强制缓存 1-30 天**

如何让 HTTP 强制缓存获得最新资源，可以使用 [Hexo-Hash](https://github.com/Lete114/Hexo-hash) 插件

## 安装

```bash
npm install hexo-prefetch --save
```

## 添加配置信息

> 这些功能只有你需要自定义的时候才会用到
> 如果不写配置，则使用默认的配置

在 hexo 的配置文件中添加配置(以下配置示例为默认配置)

```yml
# Hexo-prefetch
# https://github.com/Lete114/Hexo-prefetch
prefetch:
  enable: true     # 是否启用
  page: true       # 是否对页面进行预加载
  img: true        # 是否对图片进行预加载
  priority: 1      # 优先级(指当前插件优先级别，其它插件默认优先级为10，优先级数字小的先执行)
  imgSrc: src      # 如果你使用的主题启用了图片懒加载，一般情况下当用户滚动到图片位置上会立即呈现(假设开启了图片懒加载，那么真实图片的src可能是data-src之类的)
  custom: []       # 自定义预加载文件
  # 举例：当你的文章越来越多时
  # 你的本地搜索文件(search.json/xml)会越来越大
  # 当用户想要使用搜索时，用户等待请求本地搜索文件(search.json/xml)就会越久
  # 如果使用了自定义预加载文件，当用户使用搜索的时候，就能立即搜索内容
  # custom: ['search.json']
```
