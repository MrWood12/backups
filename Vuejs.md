## Vue

### 1.介绍

#### 1.1Vue初体验

`el:'#app'`挂载管理元素

`data:{}`定义数据

```shell
<div id="app">
  <h2>{{ message }}</h2>
  <h1>{{ name }}</h1>
</div>
<div>{{message}}</div>//这里是不会有效果的，因为该DOM元素没有被管理
```

```shell
const app = new Vue({
  el: '#app',//用于要挂载管理的元素
  data: {//定义数据
    message: 'Hello Vue!',
    name:"Vue"
  }
})
```

#### 1.2Vue列表展示

`v-for=‘item in movies’` 遍历数组

```shell
<div id="app">
	<ul>
		<li v-for="item in movies">{{item}}</li>
	</ul>
</div>
```

```shell
const app = new Vue({
	el:'#app',
	data:{
		movies:['电影1','电影2','电影3']
	}
})
```

#### 1.3简单计数器

`v-on:click = 'add'`

`@click = 'add'`   事件监听器 

`methods:{add:function(){}}`存放方法 

```html
<div id="app">
		<h2>当前计数：{{count}}</h2>
		<!-- <button v-on:click='count++'>+</button>
		<button v-on:click='count--'>-</button> -->
		<button @click='add'>+</button>
		<button v-on:click='sub'>-</button>
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			count:0
		},
		methods:{//用来存放方法
			add:function(){
			//this指向的是该对象，这里的this指向的是app这个对象，不能直接写count，要不然会在全局作用域中找count是找不到的
				this.count++
			},
			sub:function(){
				this.count--
			}
		}
	})
```

#### 1.4生命周期

<img src="https://upload-images.jianshu.io/upload_images/13119812-5890a846b6efa045.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp" alt="img" style="zoom:33%;" />

### 2.插值操作

将值插入到我们的模板内容当中,即内容的动态绑定。

#### 2.1Mustache语法

`{{message}}`双大括号，数据是响应式的，即在浏览器调试中改变值，浏览器内容也发生改变`app.message = '456'`

```html
<div id="app">
		<h2>{{message}}</h2>
		<h2>{{message}},Vue</h2>
		<h2>{{firstName +' '+ lastName}}</h2>
		<h2>{{firstName }} {{lastName}}</h2>
		<h2>{{count * 2}}</h2>
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			message:'Hello',
			firstName:'123',
			lastName:'456',
			count:100
		}
	})
```

#### 2.2v-once

只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。

```html
	<div id="app">
		<h2>{{message}}</h2>
		<h2 v-once>{{message}}</h2>//当重新渲染的时候，该值不会被改变，仍然是Hello
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			message:'Hello'
		}
	})
```

#### 2.3v-html

v-html会将传递过来的带标签的数据转变成**html格式**。

- 不能用在表单提交等关键数据里面，会很容易被攻击

```
<div id="app">
		<h2 v-html='url'></h2>
</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			//服务器发给客户端的数据是字符串的形式出现的，所以往往会带着标签
			url:'<a href="http://www.baidu.com">百度一下</a>'
		}
	})
```

#### 2.4v-text

v-text和Mustache语法作用相似,但是相比起来v-text不够灵活，因为会覆盖原本的内容

```html
<div id="app">
		<h2>{{message}},Vue</h2>//你好,Vue
		<h2 v-text='message'>,vue</h2>//你好
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			message:'你好'
		}
	})
```

#### 2.5v-pre

`v-pre`会将里面的内容原封不动的输出出来，和<pre></pre>标签一样

```html
<div id="app">
		<h2>{{message}}</h2>//你好
		<h2 v-pre>{{message}}</h2>//{{message}}
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			message:'你好'
		}
	})
```

#### 2.6v-cloak

cloak：斗篷，遮盖物

`v-cloak`这个指令保持在元素上直到关联实例结束编译。

```css
//v-cloak属性设置的样式
[v-cloak] {
  display: none;
}
```

```html
//在vue解析之前，div中有一个属性v-cloak
//在vue解析之后，div会删除存在的v-cloak属性
<div id='app' v-cloak>
  {{ message }}
</div>
```

```js
setTimeout(function(){
		const app = new Vue({
		el:'#app',
		data:{
			message:'你好'
		}
	})
},1000)//一秒之后才解析app这个实例对象
```

### 3.属性绑定操作

属性动态绑定，比如动态绑定a元素的href属性，img元素的src属性

#### 3.1v-bind

##### 动态绑定属性

```html
<div id="app">
		<!-- 错误的,会直接报错，Mustache语法不能用在属性里面，是用在标签内容里面的。
		<img src="{{imgUrl}}" alt=""> -->
		<img v-bind:src="Url" alt="">
		<a :href="Url"></a>
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			Url:'https://www.bilibili.com/video/BV15741177Eh?p=15',  
		}
	})
```

##### 动态绑定class

- 绑定方式:对象语法，class后面跟的是一个对象
- 1.可以通过{}绑定一个类
- 2.可以通过判断，传入多个值
- 3.和普通类同时存在不冲突
- 4.如果过于复杂可以放在一个methods或者computed中

```html
<style>
		.active {
			background-color: red;
		}
  	.bind {
			color: blue;
		}
</style>
<div id="app">
  	//1.最基本的使用方法
		<h2 :class='active'>{{message}}</h2>
  	//2.当该类名为true的时候添加该类名，为false不添加该类名
  	//<h2 v-bind:class="{类名1:true,类名2:false}">
  	<h2 v-bind:class="{active:isActive,bind:isLine}">{{message}}</h2>
  	//3.简单例子
  	<h2 v-bind:class="{active:isActive,bind:isLine}">{{message}}</h2>
  	<button @click='btnClick'>Active显示按钮</button>
  	//4.复杂可methods使用
  	<h2 v-bind:class="getClasses()">{{message}}</h2>
</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			message:'Hello',
			active:'active'
			isActive:true,
			isLine:false
		},
		methods:{
			btnClick:function(){
				this.isActive = !this.isActive
			}，
			getClasses:function(){
				return {active:this.isActive,bind:this.isLine}
			}
		}
})
```

##### 动态绑定style

`:style="{'属性名','属性值'}"`

都要给属性名（当属性名有 - 存在时）和属性值增加引号，因为如果不增加，vue会认为你是一个变量，会去data里面寻找，所以增加引号，告诉它是字符串形式。

```html
<div id="app">
		<h2 :style="{'font-size':'50px'}">{{message}}</h2>
		<h2 :style="{'font-size':FontSize,color:finalColor}">{{message}}</h2>
		<h2 :style="{'font-size':FontSize2 + 'px'}">{{message}}</h2>
		<h2 :style="getStyles()">{{message}}</h2>
	</div>
```

```js
const app = new Vue({
		el:'#app',
		data:{
			message:'你好',
			FontSize:'100px',
			finalColor:'red',
			FontSize2:100
		},
		methods:{
			getStyles:function(){
				return {'font-size':this.FontSize,color:this.finalColor}
			}
		}
	})
```

### 4.计算属性

#### 4.1computed

- 在模板中可以直接通过插值语法显示data里面的数据
- 但在某些情况下我们需要对数据进行一些转换后再显示，或者将多个数据结合起来进行显示。

##### 简单操作

```
<div id="app">
		<h2>{{fullName}}</h2>
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			firstName:'123',
			lastName:'456'
		},
		computed:{
			fullName:function(){
				return this.firstName + ' ' + this.lastName
			}
		}
	})
```

##### 复杂操作

在这里methods和computed看起来都可以实现我们的功能，那么我们为什么要多一个计算属性呢。

原因：计算属性会进行缓存，如果多次使用，发现计算属性没有发生改变时，计算属性只会调用一次，当计算属性发生改变，会再次调用，比起methods执行一次调用一次性能更好。

```
<div id="app">
		<h2>总价格：{{allPrice}}</h2>
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			books:[
				{id:1,name:'书1',price:100},
				{id:2,name:'书2',price:101},
				{id:3,name:'书3',price:102},
				{id:4,name:'书4',price:103},
			]
		},
		computed:{
			allPrice:function(){
				let result = 0
				for(let i=0;i<this.books.length;i++){
					result +=this.books[i].price
				}
				return result
			}
		}
	})
```

### 5.ES6补充

#### 块级作用域

var没有块级作用域，let、const有块级作用域，只有函数function(){}有作用域，if、for等没有作用域，所以var会造成污染，我们以前使用的方法是闭包的方式来解决，现在推荐使用let

#### 对象字面量的增强写法

```
//1.对象增强写法
const name = 'Bob'
const age = 15
const height = 1.8
//es5
const obj = {
	name:name,
	age:age,
	height:heiht
}
//es6
const obj = {
	name,
	age,
	height
}


2.函数的增强写法
//es5
const obj = {
	run:function(){
	
	},
	eat:function(){
	
	}
}
//es6
const obj = {
	run(){
	
	},
	eat(){
	}
}
```

### 6.事件监听

#### 6.1v-on基本使用

基本使用

```
<div id="app">
		<h2>当前计数：{{count}}</h2>
		<!-- <button v-on:click='count++'>+</button>
		<button v-on:click='count--'>-</button> -->
		<button @click='increaseCounter'>+</button>
		<button @click='decreaseCounter'>-</button>
	</div>
```

```
  const app = new Vue({
  	el:'#app',
  	data:{
			count:0
		},
		methods:{
			increaseCounter(){
				this.count++
			},
			decreaseCounter(){
				this.count--
			}
		}
  })
```

#### 6.2v-on参数问题

- 当通过methods中定义方法，以供@click调用时，需要注意**参数问题**：

- 如果该方法不需要额外参数，那么方法后面的()可以不加
  - 但是如果方法本身中有一个参数并且调用时没有用()，那么会默认将原生事件event参数传递进去
- 如果需要同时传入某个参数，同时需要event时，可以通过`$event传入事件`

```
	<div id="app">
		//当方法不需要额外参数时，加不加括号都可以
		<button @click = 'btn1Click'>按钮1</button>
		<button @click = 'btn2Click()'>按钮2</button>
		
		//但是如果方法本身中有一个参数并且调用时没有用()，那么会默认将原生事件event参数传递进去
		<button @click = 'btn3Click'>按钮3</button>
		
		//如果需要同时传入某个参数，同时需要event时，可以通过`$event传入事件`
		<button @click = 'btn4Click('abc',$event)'>按钮4</button>
		
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
		count:0
	},
	methods:{
		btn1Click(){
			console.log('btn1')
		},
		btn2Click(){
			console.log('btn2')
		},
		btn3Click(event){
			console.log(event)
		},
		btn4Click(abc,event){
			console.log(abc,event)
		}
	}
  })
```

#### 6.3v-on的修饰符

- .stop 停止冒泡 —— 调用event.stopPropagation()   原生js中的写法
- .prevent  阻止默认行为 —— 调用event.preventDefault()  原生js中的写法
- .{keyCode|keyAlias} —— 只当事件是从特定键触发时才触发回调
- .native —— 监听组件根元素的原生事件
- .once —— 只触发一次

```
<div id="app">
			//.stop修饰符的使用
			//这里有一个盒子，里面包含了一个按钮，当我们给按钮添加事件的同时也给大盒子添加事件，点击按钮触发事件，也会触发盒子事件，这是由于事件的冒泡，我们可以用v-on的修饰符(**.stop**)来阻止冒泡。
		<div @click = 'divClick'> //div
			盒子
			<button @click = 'btnClick'>按钮</button>//btn div
			<button @click.stop = 'btnClick'>按钮</button>//btn
		</div>
		
		
		//修饰符.prevent 阻止默认事件
		<form action="baidu">
			<input type="submit" value="提交" @click.prevent="subClick">
		</form>
		
		//修饰符 .监听某个键盘按键  这里的例子是监听enter键回弹
		<input type='text' @keyup.enter='keyUp'>
		
		//修饰符 .once只监听一次
		<button @click.once = 'btnClick2'>按钮</button>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
		count:0
	},
	methods:{
		btnClick(){
			console.log('btn')
		},
		divClick(){
			console.log('div')
		},
		subClick(){
			console.log('submit')
		},
		keyUp(){
			console.log('keyUp')
		},
		btnClick2(){
			console.log('btnClick2')
		}
	}
  })
```

### 7.条件判断

#### 7.1v-if和v-else使用

v-if后面的值为boolean值，为true时显示内容，false不显示

```
<div id="app">
		<div v-if='isShow'>
			<h2>{{message}}</h2>
			<div>123</div>
			<div>456</div>
		</div>
		<div v-else>当isshow为false的时候显示</div>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		message:'hello',
		isShow:true
	},
  })
```

#### 7.2v-else-if使用

```
<div id="app">
		<p v-if='score>=90'>优秀</p>
		<p v-else-if='score>=80'>良好</p>
		<p v-else-if='score>=60'>及格</p>
		<p v-else='score<=60'>不及格</p>
		
		<p>{{result}}</p>
</div>
```

```
	const app = new Vue({
  	el:'#app',
  	data:{
  		score:98
		},
		computed:{
			result(){
				let showMessage = '';
				if(this.score>=90){
					showMessage = '优秀'
				}else if (this.score>=80){
					showMessage = '良好'
				}else {
					showMessage = '及格'
				}
				return showMessage
			}
		}
  })
```

#### 7.3登录切换

这里input有个问题，当我们在用户账号的input中输入123时，切换至邮箱地址123仍然存在。这是由于vue为了运行效率，在渲染dom到页面上时，多了一个虚拟dom的步骤，当我们点击切换的时候，vue发现新渲染的内容和虚拟dom一致，就会拿虚拟dom中的东西。

解决方法就是增加一个key属性，当属性key一致时仍然可以替换dom，当不一致时，vue会把它当作两个不一样的来看。

```
<div id="app">
		<span v-if="type==='username'">
		//这里的for与下面input中的id值一致，效果是点击'用户账号'该文字，焦点会定到输入框中
			<label for="username">用户账号：</label>
			<input placeholder="用户账号" id='username' key='username'>
		</span>
		<span v-else>
			<label for='email'>邮箱地址：</label>
			<input placeholder="邮箱地址" id='email' key='email'>
		</span>
		<button @click="handelToggle">切换类型</button>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		type:'username'
	},
	methods:{
		handelToggle(){
			this.type=this.type==='email'?'username':'email'
		}
	}
  })
```

#### 7.4v-show

v-show的用法和v-if非常相似，也决定一个元素是否渲染。

v-if和v-show的对比

- v-if当条件为false时，压根不会有对应的元素在DOM中
- v-show当条件为false，仅仅是将元素的display属性设置为了none而已

开发中的选择

- 当需要在显示与隐藏之间切片很频繁的时候，使用v-show
- 当只有一次切换时，通过使用v-if

### 8.循环遍历

#### 8.1v-for遍历数组

```
<div id="app">
		<ul>
			<li v-for='(item,index) in message'>{{index+1}} {{item}}</li>
		</ul>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		message:['电影1','电影2','电影3']
	},
  })
```

#### 8.2v-for遍历对象

```
<div id="app">
		//在遍历对象中，如果只获取一个值，那么获取的是value
		<ul>
			<li v-for='item in info'>{{item}}</li>
		</ul>
		//获取key和value 格式
		<ul>
			<li v-for='(value,key) in info'>{{key}}:{{value}}</li>
		</ul>
		//
		<ul>
			<li v-for='(value,key,index) in info'>{{key}}:{{value}}:{{index}}</li>
		</ul>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		info:{
  			name:'王五',
  			age:28,
  			height:1.8
  		}
	},
  })
```

#### 8.3v-for遍历时的渲染过程

- 这与Vue的虚拟DOM的Diff算法有关

v-for在渲染的过程中也是需要经过vue的虚拟dom的，当我们往v-for遍历完的li中再添加li，vue的虚拟dom会默认将原本该位置的li的位置给新li，之后li的位置全部重新渲染，这就导致效率很差。

比如我们希望B和C之间加一个F，Diff算法默认执行起来会把C更新成F，D更新成C，E更新成D，最后再插入E，这样非常没有效率。

![image-20210127152353336](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20210127152353336.png)

```
这是v-for遍历的li
li-1:a
li-2:b
li-3:c
li-4:d

当我们使用splice(1,0,'e')方法时
li-1:a
li-2:e
li-3:b
li-4:c
li-5:d
e插入进去时，li会全部重新排序，即原本li3指向的c指向了b，li4指向了c,li5指向了d，这样会使效率变得很慢

而我们希望得到的
li-1:a
li-2:e
li-5:b
li-3:c
li-4:d
```

解决：使用key可以给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，之后找到正确的位置插入新的节点，key的作用主要是为了高效的更新虚拟DOM

```
	//key中的值和Mustache语法中的对应
	<li v-for='item in info' :key="item">{{item}}</li>
```

#### 8.4哪些数组的方法是响应式的

```
	<div id="app">
		<ul>
			<li v-for='item in letters'>{{item}}</li>
		</ul>
		<button @click='btnClick'>按钮</button>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		letters:['a','b','c']
	},
	methods:{
		btnClick(){
			//通过索引值修改数组中的元素,这里的数组里的值修改了，但是不会在网页上显示出来
			 // this.letters[0] = 'bbbb'
			 //换个方式可以用这个代替this.letters.splice(0,1,'bbbb')
			 //或者用Vue.set方法
			 //set(要修改的对象，索引值，修改后的值)
			 Vue.set(this.letters,0,'bbbb')
			 
			 
			//只有一些方法可以做到响应式
			this.letters.pop() //删除数组中的最后一个元素
			this.letters.push('aaa')//数组末尾添加一个或多个元素
			this.letters.shift() //删除数组中的第一个元素
			this.letters.unshift('aaa') //在数组前面添加一个或多个元素
			//删除元素/插入元素/替换元素
			//第一个参数是起始位置
			//删除元素：第二个参数是要删除几个元素（如果没有传，就删除起始位置后面的所有元素）
			this.letters.splice(1,1) //a c
			//替换元素：先用第二参数删除要删除的元素，将后面所有的元素插入进去
			this.letters.splice(1,2,'d','e','f')//a d e f
			//插入元素
			this.letters.splice(1,0,'d') //a b d c
			this.letters.sort()//排序
			this.letters.reverse()//倒序
		}
	}
  })
```

#### 8.5点击列表独个显示

```
<style>
		.active{
			color:red;
		}
	</style>
```

```
<div id="app">
		<ul>
			<li v-for='(item,index) in movies'//v-for遍历数组
			:class="{active:click === index}"//v-bind对象绑定类的方法，设置一个数据为click，当click和index相等时，返回的是true，该li添加active样式
			@click="liClick(index)"//添加点击事件，传入index，每次点击改变click值为index值
			>{{item}}</li>
		</ul>
	</div>
```

```
const app = new Vue({
  	el:'#app',
  	data:{
  		movies:['电影1','电影2','电影3'],
  		click:0
	},
	methods:{
		liClick(index){
			this.click=index
		}
	}
  })
```

#### 8.6购物车案例

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div id='app'>
    <div v-if='books.length !== 0'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
         
          <tr v-for="(item,index) in books">
            <td >{{item.id}}</td>
            <td >{{item.name}}</td>
            <td >{{item.date}}</td>
            //这里用过滤器可以更简单的实现，filters
            <td >{{item.price | showPrice}}</td>
            <td >
              <button @click="subClick(index)" v-bind:disabled="item.count<=1">-</button>
              {{item.count}}
              <button @click="addClick(index)">+</button>
            </td>
            <td><button @click='clearClick(index)'>删除</button></td>
          </tr>
        </tbody>
        
      </table>
      <h2>总价格{{allPrice|showPrice}}</h2>
    </div>
    <div v-else>
      <h2>购物车没有东西</h2>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="main.js"></script>
 
</body>
</html>
```

main.js

```js
const app = new Vue({
  el:'#app',
  data:{
    books:[
      {
        id:1,
        name:'《算法导论》',
        date:'2006-9',
        price:85,
        count:1
      },
      {
        id:2,
        name:'《UNIX编程艺术》',
        date:'2006-2',
        price:59,
        count:3
      },
      {
        id:3,
        name:'《编程珠玑》',
        date:'2008-10',
        price:39,
        count:1
      },
      {
        id:4,
        name:'《代码大全》',
        date:'2006-3',
        price:128,
        count:2
      },
    ]
  },
  methods:{
    subClick(index){
      this.books[index].count--
    },
    addClick(index){
      this.books[index].count++
    },
    clearClick(index){
      this.books.splice(index,1)
    },
    
  },
  computed:{
    allPrice(){
      let all = 0
      for(let key in this.books ){
        all +=this.books[key].price*this.books[key].count
      }
      return all
    }
  },
  //过滤器，在mustache语法中使用 内容|过滤器 过滤器会将内容作为参数传递到过滤器的函数里面 
  filters:{
    showPrice(price){
      return '￥' + price.toFixed(2)
    }
  }
})
```

style.css

```css
table {
  border:1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
}
th,td{
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
th{
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight:600;
}
```

### 9.v-model使用（表单）

v-model的存在就是为了方便我们**获取表单数据**

能让表单里的值进行双向绑定

```
<div id='app'>
		<input type="text" v-model="message">//当我们在表单中输入值时，message也会发生变化，同样当我们改变message值时，表单input的value也会发生变化
		{{message}}
</div>
```

#### 9.1实现原理

v-model其实是一个语法糖，背后本质就是包含两个操作：1.v-bind绑定一个value值 2.v-on指令给当前元素绑定input事件

一个v-model相当于v-bind与v-on的结合，动态改变value值，添加input事件，当在表单中输入内容的时候，将值赋值给message。

```
<div id='app'>
		<input type="text" v-bind:value="message" v-on:input="changeMessage">
		//简写
		<input type="text" :value="message" @:input="message=$event.target.value">
		{{message}}
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			message:"你好"
		},
		methods:{
			changeMessage(event){
				this.message=event.target.value
			}
		}
	})
```

#### 9.2结合radio类型（单选）

`<input text='radio'>`单选框

单选框固定格式用label包裹

```
<div id='app'>
		<label for="male">
		//我们必须设置两个input的type类型为单选框，name为相同属性否则无法只选择一个，之后设置value值，我们用v-model方法动态绑定值，让我们选择一个单选框时，value值发生变化，v-model就会将变化的值赋值到data的sex值中去
			<input type="radio" id="male" name='sex' value='男' v-model="sex">男
		</label>
			<label for="female">
			<input type="radio" id="female" name='sex' value='女' v-model="sex">女
		</label>
		<h2>你选的性别是{{sex}}</h2>
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			message:"你好",
			//如果要默认选中，只要在sex中赋值默认项就行
			sex:''
		},
	})
```

#### 9.3结合checkbox类型（复选框）

`<input text='checkbox'>`复选框，有只选一项和多选的方式

```
<div id='app'>
		<!-- 单选框 -->
		<label for="agree">
			<input type="checkbox" id="agree" v-model="isAgree">同意协议
		</label>
		<h2>你的选择是{{isAgree}}</h2>
		<button :disabled="!isAgree">下一步</button>
		<!-- 多选框 -->
		<label for="">
			<input type="checkbox" value="篮球" v-model="hobbies">篮球
			<input type="checkbox" value="足球" v-model="hobbies">足球
			<input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
		</label>
		<h2>你选择的爱好是{{hobbies}}</h2>
		<!-- 简写 -->
		<label v-for="item in allHobbies" :for='item'>
			<input type="checkbox" :value="item" :id="item" v-model='hobbies'>{{item}}
		</label>
		<h2>你选择的爱好是{{hobbies}}</h2>
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			message:"你好",
			isAgree:false,
			hobbies:[],
			allHobbies:['篮球','足球','羽毛球']
		},
	})
```

#### 9.4结合select类型(下拉式选择)

`<select></select>`单选下拉

`<select multiple></select>`多选

```
<div id='app'>
		<!-- 单选 -->
		<select v-model="mySelect1">
			<option value="apple">苹果</option>
			<option value="orange">橘子</option>
			<option value="banana">香蕉</option>
		</select>
		<h2>你最喜欢的水果{{mySelect1}}</h2>
		<!-- 多选 -->
		<select v-model="mySelect2" multiple>
			<option value="apple">苹果</option>
			<option value="orange">橘子</option>
			<option value="banana">香蕉</option>
		</select>
		<h2>你最喜欢的水果{{mySelect2}}</h2>
	</div>
```

```
const app = new Vue({
		el:'#app',
		data:{
			mySelect1:'',
			mySelect2:[],	
		},
	})
```

#### 9.5v-model修饰符

- lazy修饰符:

  v-model默认是在input事件中同步输入框的数据，也就是说，一旦有数据发生改变对应的data中的数据就会自动发生改变。lazy修饰符可以让数据在失去焦点或者回车时才会更新。

- number修饰符：

  默认情况下，在输入框中无论我们输入的是字母还是数字，都会被当做字符串类型进行处理。但是如果我们希望处理的是数字类型，那么最好直接将内容当做数字处理。number修饰符可以让在输入框中输入的内容**自动转成数字类型**

- trim修饰符：

  如果输入的内容首尾有很多空格，通常我们希望将其去除trim修饰符可以过滤内容左右两边的空格

### 10.组件化

#### 10.1注册组件

组件的使用分为三个步骤：

1. 创建组件构造器 调用Vue.extend()方法
2. 注册组件 调用Vue.component()方法
3. 使用组件 在Vue实例的作用范围内使用

```
<body>
	<div id='app'>
		//3.使用组件
		<my-cpn></my-cpn>>
	</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
	//1.创建组件
	const myComponent = Vue.extend({
		template:`
		<div>
			<h2>组件标题</h2>
			<p>我是组件中的一个小段落</p>
		</div>
		`
	})
	//2.注册组件，并且定义组件标签的名称
	Vue.component('my-cpn',myComponent)

	const app = new Vue({
		el:'#app',
	})
</script>
```

#### 10.2全局组件和局部组件

- 当我们通过调用Vue.component()注册组件时，注册的是**全局组件**，这意味着该组件可以在任意Vue示例下使用，以下app1与app2都会显示

  ```
  <body>
  	<div id='app1'>
  		<my-cpn></my-cpn>>
  	</div>
  	<div id='app2'>
  		<my-cpn></my-cpn>>
  	</div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
  	//1.创建组件
  	const myComponent = Vue.extend({
  		template:`
  		<div>
  			<h2>组件标题</h2>
  			<p>我是组件中的一个小段落</p>
  		</div>
  		`
  	})
  	//2.注册组件，并且定义组件标签的名称，用Vue.component()方法得到的是全局组件
  	Vue.component('my-cpn',myComponent)
  
  	const app1 = new Vue({
  		el:'#app1',
  	})
  	const app2 = new Vue({
  		el:'#app2',
  	})
  </script>
  ```

- 如果我们注册的组件是挂载到某个实例中，那么就是一个局部组件，以下只有app1渲染成功

  ```
  <body>
  	<div id='app1'>
  		<my-cpn></my-cpn>>
  	</div>
  	<div id='app2'>
  		<my-cpn></my-cpn>>
  	</div>
  </body>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
  
  
  	//1.创建组件
  	const myComponent = Vue.extend({
  		template:`
  		<div>
  			<h2>组件标题</h2>
  			<p>我是组件中的一个小段落</p>
  		</div>
  		`
  	})
  	
  	
  	const app1 = new Vue({
  		el:'#app1',
  		components:{
  			'my-cpn':myComponent
  		}
  	})
  	
  	
  	const app2 = new Vue({
  		el:'#app2',
  	})
  </script>
  ```

#### 10.3父组件和子组件

从组件树中我们可知，组件和组件之间存在层级关系，其中一个很重要的关系就是父子组件关系

```
<body>
	<div id='app1'>
		<!-- 6.使用父组件 -->
		<parent-cpn></parent-cpn>>
	</div>
	
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
	//1.创建子组件
	const childComponent = Vue.extend({
		template:
		`<div>
			<p>我是子组件的段落</p>
		</div>
		`
	})

	//2.创建父组件
	const parentComponent = Vue.extend({
		template:
		`<div>
			<p>我是父组件的段落</p>
			//4.使用子组件
			<child-cpn></child-cpn>
		</div>`,
		//3.注册子组件
		components:{
			'child-cpn':childComponent
		}
	})

	const app1 = new Vue({
		el:'#app1',
		//5.注册父组件
		components:{
			'parent-cpn':parentComponent
		}
	})
</script>
```

#### 10.4注册组件语法糖

- Vue简化了注册组件的过程，主要是省去了调用Vue.extend()的步骤

```
//注册全局组件的语法糖
Vue.component('my-cpn',{
	template:`<div><h2>全局组件</h2></div>`
})
```

```
//注册局部组件
const app = new Vue({
	el:'#app',
	components:{
		'my-cpn1':{
			template:`<div><h2>cpn1组件</h2></div>`
		},
		'my-cpn2':{
			template:`<div><h2>cpn2组件</h2></div>`
		}
	}
})
```

![image-20210202154854767](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20210202154854767.png)

#### 10.5模板的分离写法

- 简化了Vue组件的注册过程，但是template模块写法还是很麻烦
- 于是Vue提供了两种方案来将HTML分离，然后挂载到对应组件上
  - 使用`<script>`标签
  - 使用`<template>`标签

```
//script标签写法
<body>
	<div id='app'>
		<my-cpn></my-cpn>
	</div>
</body>

<script type="text/x-template" id="myCpn">
	<div>
		<h2>组件</h2>
	</div>
</script>
<script >
	const app = new Vue({
		el:'#app',
		components:{
			'my-cpn':{
				template:'#myCpn'
			}
		}
	})
</script>
```

```
//template标签写法
<body>
	<div id='app'>
		<my-cpn></my-cpn>
	</div>
</body>

<template id="myCpn">
	<div>
		<h2>组件</h2>
	</div>
</template>
<script >
	const app = new Vue({
		el:'#app',
		components:{
			'my-cpn':{
				template:'#myCpn'
			}
		}
	})
</script>
```

![image-20210202155959611](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20210202155959611.png)

#### 10.6组件数据存放

组件时**无法访问**到**Vue实例**中的**data数据**

```
<body>
	<div id='app'>
		<my-cpn></my-cpn>
	</div>
</body>

<template id="myCpn">
	<div>
		<h2>消息是:{{message}}</h2>//message数据没有显示，表明组件模板中不能获得app实例中data的数据
	</div>
</template>
```

```
const app = new Vue({
		el:'#app',
		data:{
			message:'你好'
		},
		components:{
			'my-cpn':{
				template:'#myCpn'
			}
		}
	})
```

所以组件有自己存放数据的地方

- 组件对象也有一个data属性（也可以有methods等属性）
- 组件中的data属性**必须**是**一个函数**，这个函数返回一个对象，对象内部保存数据

```
<body>
	<div id='app'>
		<my-cpn></my-cpn>
	</div>
</body>

<template id="myCpn">
	<div>
		<h2>消息是:{{message}}</h2>//这里message可以得到data()函数中返回return的数据
	</div>
</template>
```

```
const app = new Vue({
	el:'#app',
	components:{
		'my-cpn':{
			template:'#myCpn',
			data(){
				return {
					message:'你好呀'
				}
			}
		}
	}
})
```

为什么必须是函数，因为如果是一个对象的话，当多次运用组件的时候，由于对象是复杂类型，指针会指向同一个堆中的地址，所以会导致多个组件中的数据相互影响。

```
<body>
	<div id='app'>
	//对象被单独抽离，意味着这里的模板使用的都是obj，当一个组件中修改了counter，其他组件都会被影响
		<my-cpn></my-cpn>
		<my-cpn></my-cpn>
		<my-cpn></my-cpn>
	</div>
</body>

<template id="myCpn">
	<div>
		<button @click='btnClick'>点击按钮</button>
		<span>当前数量：{{counter}}</span>
	</div>
</template>
<script >
	const obj = {
		counter:0
	}
	const app = new Vue({
	el:'#app',
	components:{
		'my-cpn':{
			template:'#myCpn',
			data(){
				return obj  //对象被单独抽离
			},
			methods:{
				btnClick(){
					this.counter++
				}
			}
		}
	}
})
```

#### 10.7父子组件通信

子组件是不能运用父组件或者Vue实例的数据

在一个页面中，我们从服务器请求到了很多数据，其中一部分数据并非是我们整个页面的大组件来展示，而是需要下面的子组件进行展示，这时候并不会让子组件再次发送一个网络请求，而是直接让大组件（父组件）将数据传递给小组件（子组件）

- 通过props向子组件传递信息
- 通过事件（$emit Events）向父组件发送消息
- Vue实例和子组件的通信和父组件和子组件的通信过程是一样的

##### 父传子

在组件中使用props来声明需要从父级接收到的数据

props的值有两种方式

- 方式一：字符串数组，数组中的字符串就是传递时的名称
- 方式二：对象，对象可以设置传递时的类型。也可以设置默认值等