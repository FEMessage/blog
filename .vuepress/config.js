require('dotenv').config()

module.exports = {
 // 站点配置
 plugins: [
   [
     'vuepress-plugin-yuque', {
		   html: true,
       repoUrl: 'https://www.yuque.com/deepexi-company/blog-in130r',
			 authToken: process.env.TOKEN
     }
   ]
 ]
} 
