## Webpack

### 1.认识webpack

#### 什么是webpack

webpack是一个现代的JavaScript应用的静态模板打包工具。

当我们的文件中存在.less或者.sass这些后缀文件时，浏览器是不认识的，所以我们需要通过webpack来将其打包成浏览器认识的文件格式。

#### 打包

就是将webpack中的各种资源模块进行打包合并成一个或多个包(Bundle)。

并且在打包的过程中，还可以对资源进行处理，比如压缩图片，将scss转成css，将ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作。

#### grunt/gulp

grunt/gulp的核心是Task

- 我们可以配置一系列的task，并且定义task要处理的事务（例如ES6、ts转化，图片压缩，scss转成css）

- 之后让grunt/gulp来依次执行这些task，而且让整个流程自动化。

- 所以grunt/gulp也被称为前端自动化任务管理工具。

我们来看一个gulp的task

下面的task就是将src下面的所有js文件转成ES5的语法,并且最终输出到dist文件夹中。

```
const gulp = require('gulp')
const babel = require('gulp-babel')
gulp.task('js',()=>
	gulp.src('src/*.js')
		.pipe(babel({
			presets:['es2015']
		}))
		.pipe(gulp.dest('dist'))
)
```

**什么时候用grunt/gulp呢？**

如果你的工程模块依赖非常简单，甚至是没有用到模块化的概念。

只需要进行简单的合并、压缩，就使用grunt/gulp即可。

但是如果整个项目使用了模块化管理，而且相互依赖非常强，我们就可以使用更加强大的webpack了。

**grunt/gulp和webpack有什么不同呢？**

- grunt/gulp更加强调的是前端流程的自动化，模块化不是它的核心。

- webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能，是他附带的功能。

### 2.安装

```
//全局安装
npm install webpack -g
//局部安装
npm install webpack --save-dev
```

### 3.起步

#### 文件和文件夹解析

- dist文件夹：用于存放之后打包的文件

- src文件夹：用于存放我们写的源文件

  - main.js：项目的入口文件

    ```
    //示例代码
    //使用commonjs的模块规划
    const math = require('./mathUtils')
    console.log('hello webpack')
    console.log(math.add(10,20))
    console.log(math.mul(10,20))
    
    //使用es6的模块规划
    import{name,age,height} from './info'
    console.log(name)
    ```

  - mathUtils.js:定义了一些数学工具函数，可以在其他地方引用并且使用

    ```
    function add(num1,num2){
    	return num1+num2
    }
    function mul(num1,num2){
    	return num1*num2
    }
    module.exports = {
    	add,
    	mul
    }
    ```

- index.html:浏览器打开展示的首页

- package.json:通过npm init生成，npm包管理文件

#### JS文件的打包

当js文件使用了模块化的方式，如果直接在index.html引入这两个js文件，浏览器并不识别其中的模块化代码。

我们需要对多个js文件进行打包。

webpack就是模块化的打包工具，所以它支持我们代码中写模块化，可以对模块化的代码进行处理。

```
//打包指令  src/main.js为设置的入口文件  dist/bundle.js是设置的输出文件
webpack src/main.js dist/bundle.js
```

#### 打包后的文件

打包后会在dist文件下，生成一个bundle.js文件。

bundle.js文件，是webpack处理了项目直接文件依赖后生成的一个js文件，我们只需要将这个js文件在index.html中引入即可。

```
<script src = './dist/bundle.js'></script>
```

### 4.webpack配置

#### 入口和出口

如果每次打包的时候都要写打包指令的入口和出口会很麻烦

```
//打包指令  src/main.js为设置的入口文件  dist/bundle.js是设置的输出文件
webpack src/main.js dist/bundle.js
```

所以我们创建一个webpack.config.js文件，将两个参数写到配置中，运行时直接读取

```
const path = require('path')

module.exports = {
	//入口：可以实字符串/数组/对象，我们入口只有一个，所以写一个字符串即可
	entry:'./src/main.js'
	//出口：通常是一个对象，里面至少包含两个属性，path和filename
	output:{
		path:path.resolve(__durname,'dist')//注意：path通常是一个绝对路径
		filename:'bundle.js'
	}
}
```

#### 局部安装webpack

一个项目往往依赖特定的webpack版本，全局的版本可能和这个项目的webpack版本不一致，导致打包出现问题，所以通常一个项目，都有自己局部的webpack。

- 1.安装局部  `npm install webpack@3.6.0 --save-dev`
- 2.通过`node_modules/.bin/webpack`启动webpack打包

#### package.json定义启动

```
{
	"name":"meetwebpack",
	"version":"1.0.0",
	"description":"",
	"main":"index.js",
	"scripts":{
		"bulid":"webpack"
	},
	"author":"",
	"license":"ISC",
	"devDependencies":{
		"webpack":"^3.6.0"
	}
}
```

package.json中的script的脚本在执行时，会按照一定的顺序寻找命令对应的位置。

- 首先寻找本地的node_modules/.bin路径中对应的命令
- 没有找到之后会去全局的环境变量中找

执行我们的build指令

```
npm run build
```

### 5.loader

#### loader概念

webpack会自动处理js之间相关的依赖，但是我们在开发过程中不仅仅有基础的js代码，我们也需要加载css、图片，也包括一些高级的将es6转换成es5代码，将TypeScript转成es5代码，将scss、less转成css，将.jsx、.vue转成js文件等等

但是webpack本身的能力来说，对于这些转换是不支持的。所以我们需要给webpack扩展对应的loader

#### loader使用

1. 通过npm安装需要使用的loader
2. 在webpack.config.js中的modules关键字下进行配置
3. 大部分loader我们都可以在webpack官网找到

#### css-loader和style-loader

在使用样式之前，我们必须对该样式文件在入口文件中先进行引用。

`require('./css/normal.css')`

打包完成之后会报错误告诉我们缺少loader

这时我们按照webpack官网安装css-loader

之后发现样式没有生效，这是因为css-loader只负责加载css文件，并不负责将css具体样式嵌入到文档中，这时候我们还要额外下载安装style-loader。

```
const path = require('path')

module.exports = {
	//入口：可以实字符串/数组/对象，我们入口只有一个，所以写一个字符串即可
	entry:'./src/main.js'
	//出口：通常是一个对象，里面至少包含两个属性，path和filename
	output:{
		path:path.resolve(__durname,'dist')//注意：path通常是一个绝对路径
		filename:'bundle.js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:['style-loader','css-loader']
			}
		]
	}
}
```

注意：style-loader需要放在css-loader前面，虽然我们的逻辑是在处理css文件过程中，css-loader先加载文件，再有style-loader处理文件，逻辑没有错，但是webpack在读取使用loader的过程中，是按照从右往左的顺序读取。

#### less-loader

```
//注意这里还安装了less，因为webpack会使用less对less文件进行编译
npm install --save-dev less-loader less
```

```
//添加rules选项用于处理.less文件
{
	 test:/\.less$/,
	 use:[{
	 	loader:'style-loader',
	 },{
	 	loader:"css-loader"
	 },{
	 	loader:'less-loader'
	 }]
}
```

#### 图片文件处理url-loader和file-loader

有两种情况，一是图片较小小于8k，一是图片较大大于8k

```
//图片较小情况下使用url-loader
body{
	background-color:red;
	background:url(../imgs/test01.jpeg)
}
打包完成时，图片是通过base64显示出来的
```

较大情况下使用file-loader

当打包完成时，会发现dist文件夹下多了一个图片文件。

##### 修改文件名称

webpack会自动帮我们生成非常长的32位hash值的名字，我们可以修改名字。

```
options:{
	limit:8192,
	//img 文件要打包到的文件夹 name获取图片原来的名字 hash:8防止图片名字冲突，保留8位 ext 使用图片原来的扩展名
	name:"img/[name].[hash:8].[ext]"
}
```

```
//我们发现图片没有显示，这是由于图片使用的路径不对
//默认情况下，webpack会将生成的路径直接返回给使用者，但是我们程序是打包在dist文件夹下，所以我们需要在路径下再添加一个dist/
output:{
		path:path.resolve(__durname,'dist')//注意：path通常是一个绝对路径
		filename:'bundle.js',
		publicPath:"dist/"
	},
```

#### es6语法处理babel-loader

将es6语法转换成es5语法

`npm install --save-dev babel-loader@7 babel-core babel-preset-es2015`

```
//配置webpack.config.js
{
	test:/\.m?js$/,
	exclude:/(node_modules|bower_components)/,
	use:{
		loader:"babel-loader",
		options:{
			presets:['es2015']
		}
	}
}

```

#### vue文件处理vue-loader

可以处理.vue后缀的文件

```
<template>
  <h2 class="title">{{name}}</h2>
</template>

<script >
export default {
  name:'App', 
  data() {
    return {
      name:"我是.vue的App组件"
    }
  },

}
</script>

<style scoped>
  .title{
    color:blue
  }
</style>

```

安装vue-loader和vue-template-compiler

`npm install vue-loader vue-template-compiler --save-dev`

```
//修改
{
	test:/\.vue$/,
	use:['vue-loader']
}
```

### 6.plugin

plugin是插件的意思

#### loader和plugin的差别

- loader主要用于转换某些类型的模块，它是一个转换器
- plugin是插件，它是对webpack本身的扩展，是一个扩展器

#### plugin使用步骤

1. 通过npm安装需要使用的plugins（某些webpack已经内置的插件不需要安装）
2. 在webpack.config.js中的plugins中配置插件

#### 版权BannerPlugin

为打包的文件添加版权声明BannerPlugin，是webpack自带的插件

```
//配置webpack.config.js文件
const path = require("path")
const webpack=require('webpack')

module.exports={
	...
	plugins:[
		new webpack.BannerPlugin('最终版权归我所有')
	]
}
```

```
//重新打包，查看bundle.js文件头部
/*!最终版权归我所有*/
/******/(function(modules){})
```

#### 打包html HtmlWebpackPlugin

HtmlWebpackPlugin插件可以

- 自动生成一个index.html文件（可以指定模板来生成）
- 将打包的js文件，自动通过script标签插入到body中

`npm install html-webpack-plugin --save-dev`

```
plugins:[
		new webpack.BannerPlugin('最终版权归我所有'),
		new htmlWebpackPlugin({
			//template表示根据什么模板生成index.html文件
			//另外我们需要删除output中添加的publicPath属性，否则插入的script标签的src可能会出现问题
			template:'index.html'
		})
	]
```

#### js压缩

`npm install uglifyjs-webpack-plugin --save-dev`

```
//配置webpack.config.js文件
const path = require("path")
const webpack=require('webpack')
const uglifuJsPlugin = require("uglifyjs-webpack-plugin")

module.exports={
	...
	plugins:[
		new webpack.BannerPlugin('最终版权归我所有'),
		new uglifuJsPlugin()
	]
}
//查看打包后的bundle.js文件，已经被压缩
```

### 7.本地服务器

webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器自动刷新显示我们修改后的结果。

不过它是一个单独的模块，在webpack中使用之前需要先安装它

`npm install --save-dev webpack-dev-server`

```
//devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：
//contentBase：为哪一个文件夹提供本地服务，默认是根文件夹，我们这里要填写./dist
//port：端口号
//inline：页面实时刷新
//historyApiFallback：在SPA页面中，依赖HTML5的history模式
//webpack.config.js文件配置修改
devServer:{
	contentBase:'./dist',
	inline:true
}
//我们可以再配置另外一个scripts
//--open参数表示直接打开浏览器
"dev":"webpack-dev-server --open"
	
```

