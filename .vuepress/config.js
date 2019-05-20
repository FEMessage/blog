require('dotenv').config()

const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const chokidar = require('chokidar')

const patterns = ['post/**/*.md']
const posts = new Set(fg.sync(patterns))

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
      if (name.startsWith('_') && file.includes(item.folder)) {
        item.title = fs.readFileSync(file, { encoding: 'utf-8' }).trim()
      } else if (file.includes(item.folder)) {
        item.children.push('/' + file)
      }
    })
  })

  console.log('_sidebar :', _sidebar)

  return _sidebar
}

let sidebar = generateSidebar()
const watcher = chokidar.watch(patterns, { ignoreInitial: true })

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
    sidebar
  },
  // 站点配置
  plugins: []
}
