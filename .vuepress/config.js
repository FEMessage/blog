require('dotenv').config()

const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const chokidar = require('chokidar')

const patterns = ['post/**/*.md'] // 只查询 post 目录
const posts = new Set(fg.sync(patterns))

// 生成 _sidebar 数组
function generateSidebar() {
  const _sidebar = []
  const folders = fs.readdirSync('post', { encoding: 'utf-8' })

  folders.forEach(folder => {
    _sidebar.push({
      collapsable: false,
      children: [],
      folder
    })
  })

  posts.forEach(file => {
    const name = path.basename(file, '.md')

    _sidebar.forEach(item => {
      // 如果文件名以 '_' 开头说明是侧边栏的标题文件
      if (name.startsWith('_') && file.includes(item.folder)) {
        item.title = fs.readFileSync(file, { encoding: 'utf-8' }).trim()
      } else if (file.includes(item.folder)) {
        item.children.push('/' + file)
      }
    })
  })

  return _sidebar
}

let sidebar = generateSidebar()
const watcher = chokidar.watch(patterns, { ignoreInitial: true }) // 创建监听文件变化的观察者

watcher
  .on('add', file => {
    posts.add(file)
    sidebar = generateSidebar()
  })
  .on('change', file => {
    const name = path.basename(file, '.md')

    if (name.startsWith('_')) {
      sidebar = generateSidebar()
    }
  })
  .on('unlink', file => {
    posts.add(file)
    sidebar = generateSidebar()
  })

module.exports = {
  title: 'FEMessage blog',
  description: 'things every member should konw',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://avatars3.githubusercontent.com/u/39977793?s=200&v=4'
      }
    ]
  ],
  base: '/blog/',
  themeConfig: {
    repo: 'FEMessage/blog',
    editLinks: true,
    editLinkText: '帮助我们完善此页面',
    sidebar // 传入配置项
  },
  // 站点配置
  plugins: []
}
