<div align="center">
    <h1>Easy-Admin</h1>
</div>

---

**项目使用**

```bash
# 安装依赖
npm install

# 运行项目
npm run dev

# 打包项目
npm run build

# 克隆项目
git clone https://github.com/gg3081779049/easy-admin.git
```

**目录结构**
```
├── bin  命令文件
├── dist 打包出来的文件
├── mock 模拟数据
│   ├── modules  模拟数据模块
│   └── index.js  模拟数据入口文件
├── public  静态文件
│   ├── favicon.ico  网站图标
│   └── index.html  网站入口文件
├── src  开发的总目录
│   ├── api  接口api
│   ├── assets  静态文件
│   │   ├── images  图片文件
│   │   ├── gif  gif文件
│   │   ├── styles  全局的样式文件
│   │   └── svg  全局svg文件
│   │       ├── icons  普通图标
│   │       ├── menu  菜单图标
│   │       ├── layout  布局图标
│   │       ├── state  http状态图标
│   │       ├── svgo.yml  svg配置文件
│   │       └── index.js  导入所有图标文件
│   ├── components  通用组件和业务的组件
│   ├── directive  指令
│   │   ├── modules  指令模块
│   │   └── index.js  指令入口文件
│   ├── layout  布局文件
│   │   ├── components  布局组件模块
│   │   ├── layouts  多布局模块
│   │   └── index.js  布局入口文件
│   ├── locales  国际化文件
│   │   ├── lang  多语言模块
│   │   └── index.js  国际化入口文件
│   ├── plugins  插件
│   ├── router  路由
│   ├── store  数据状态管理
│   │   ├── modules  状态管理划分的模块
│   │   └── index.js  pinia入口文件
│   ├── styles  全局的样式文件
│   ├── utils  全局的公共方法和工具
│   ├── views  所有的页面
|   │   ├──modules  页面模块
│   │   ├── 401  401页面
│   │   ├── 404  404页面
│   │   ├── login  登录页面
│   │   ├── applylicense  申请license页面
│   │   └── register  注册页面
│   ├── App.vue  vue最外层组件
│   ├── main.js  vue入口文件
│   ├── permission.js  全局路由守卫
│   └── settings.js  系统配置文件
```
