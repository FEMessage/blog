require('dotenv').config()
let glob = require('glob')
let markdownFiles = glob.sync('*.md').filter(file => file != 'README.md').map(file => '/' + file)

module.exports = {
  title: 'FEMessage blog',
  description: 'things every member should konw',
  head: [
    ['link', {rel: 'icon', href: 'https://avatars3.githubusercontent.com/u/39977793?s=200&v=4'}]
  ],
  base: '/blog/',
  themeConfig: {
    repo: 'FEMessage/blog',
    editLinks: true,
    editLinkText: '帮助我们完善此页面',
    sidebar: markdownFiles
  },
  // 站点配置
  plugins: []
} 
