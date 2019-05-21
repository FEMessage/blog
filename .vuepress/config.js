require('dotenv').config()

const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')
const chokidar = require('chokidar')
const docsDir = 'docs'

const patterns = [`${docsDir}/**/*.md`] 
const docs = new Set(fg.sync(patterns))

let sidebar = [] 

// 生成 sidebar 数组
function generateSidebar() {
  let _sidebar = []
  const folders = fs.readdirSync(docsDir, { encoding: 'utf-8' })
	const isDirFile = (fullpath, dir) => fullpath.split('/')[1] == dir

  _sidebar = folders.map(folder => ({collapsable: false, children: [], folder}))

  docs.forEach(doc => {
    const name = path.basename(doc, '.md')

    _sidebar.forEach(item => {
      // 如果文件名以 '_' 开头说明是侧边栏的标题文件
      if (name.startsWith('_') && isDirFile(doc, item.folder)) {
        item.title = fs.readFileSync(doc, { encoding: 'utf-8' }).trim()
      } else if (isDirFile(doc, item.folder)) {
        item.children.push('/' + doc)
      }
    })
  })

	//console.log(_sidebar)

  return _sidebar
}

// 监听文件变化
const watcher = chokidar.watch(patterns, { ignoreInitial: true }) 

watcher
  .on('add', file => {
    docs.add(file)
    sidebar = generateSidebar()
  })
  .on('change', file => {
    const name = path.basename(file, '.md')

    if (name.startsWith('_')) {
      sidebar = generateSidebar()
    }
  })
  .on('unlink', file => {
    docs.add(file)
    sidebar = generateSidebar()
  })

// 初始化sidebar
sidebar = generateSidebar()

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
