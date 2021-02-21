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

原因：计算属性会**进行缓存**，如果多次使用，发现计算属性没有发生改变时，计算属性只会调用一次，当计算属性发生改变，会再次调用，比起methods执行一次调用一次性能更好。

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

- 当我们通过调用Vue.component()注册组件时，注册的是**全局组件**，这意味着该组件可以在任意Vue实例下使用，以下app1与app2都会显示

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

组件是**无法访问**到**Vue实例**中的**data数据**

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

```
//数组写法
<body>
	<div id='app'>
		//通过:message='message'的方式，将data中的message传递给了props
		<child-cpn :message='message'></my-cpn>
		//如果是变量用 :参数名称="变量值"
		//如果是字符串常量 直接 参数名称="值"
		<child-cpn message='message'></my-cpn>//这里传过去的是message这个字符串
	</div>
</body>

<template id="childCpn">
	<div>
		显示的信息：{{message}}
	</div>
</template>
<script >
	const app = new Vue({
	el:'#app',
	data:{
		message:'hello'
	},
	components:{
		'child-cpn':{
			template:'#childCpn',
			props:['message']//porps引用了该数据
		}
	}
})
</script>
```

- 当我们需要对props进行**类型等验证**的时候需要对象写法

- 支持的数据类型为String、Number、Boolean、Array、Object、Date、Function、Symbol

- 当我们有自定义构造函数时，验证也支持自定义类型

  ```
  function Person(firstName,lastName){
  	this.firstName = firstName
  	this.lastName = lastName
  }
  Vue.component('blog-post',{
  	props:{
  		author:Person
  	}
  })
  ```

```
//对象写法
Vue.component('my-component',{
	props:{
		//基础的类型检测(null 是匹配任何类型)
		propA:Number,
		//多个可能的类型
		propB:[String,Number],
		//必填的字符串
		propC:{
			type:String,
			required:true
		},
		//带有默认值的数字
		propD:{
			type:Number,
			default:100
		}
		//带有默认值的对象
		propE:{
			type:Object,
			//对象或数组默认值必须从一个工厂函数获取
			default:function(){
				return{message:'hello'}
			}
		},
		//自定义验证函数
		propF:{
			validator:function(value){
				//这个值必须匹配下列字符串中的一个
				return ['success','warning'.'danger'].indexOf(value) !== -1
			}
		}
	}
})
```

##### 子传父

子组件要用**自定义事件**将数据或事件传递到父组件中

什么时候需要自定义事件：

- 当子组件需要向父组件传递数据时，就要用到自定义事件
- v-on不仅可以用来监听DOM事件，也可以用于组件间的自定义事件

自定义事件的流程：

1. 在子组件中，通过`$emit()`来触发事件
2. 在父组件中，通过v-on来监听子组件事件

```
<body>
	<div id='app'>
		//发生两个事件时，调用同一个函数changeTotal
		//3.调用@increment（是$emit第一个参数内的名字）绑定父组件内的事件，与此同时也会得到附带的子组件内的数据
		<child-cpn @increment='changeTotal' @decrement="changeTotal"></child-cpn>
			<h2>点击次数{{total}}</h2>
	</div>
</body>

<template id="childCpn">
	<div>
		<button @click='increment'>+1</button>
		<button @click='decrement'>-1</button>
	</div>
</template>

```

```
<script >
	const app = new Vue({
	el:'#app',
	data:{
		total:0
	},
	methods:{
		changeTotal(counter){
			//4.将子组件内的数据赋值到父组件内
			this.total = counter
		}
	},
	components:{
		//整个操作的过程是在子组件内完成的，之后将结果数据传递给父组件
		'child-cpn':{
			template:'#childCpn',
			data(){
				return {
					counter:0
				}
			},
			methods:{
				increment(){
					//1.调用子组件内的数据并自加一
					this.counter++;
					//2.通过$emit，绑定increment事件，并附带子组件数据
					this.$emit('increment',this.counter)
				},
				decrement(){
					this.counter--;
					this.$emit('decrement',this.counter)
				}
			}
		}
	}
})
</script>
```

#### 10.8父子组件的访问

父组件可以访问子组件内的方法，数据

- 有时候我们需要父组件直接访问子组件，子组件直接访问父组件，或者子组件访问根组件
  - 父组件访问子组件：使用$children或者$refs
  - 子组件访问父组件：使用$parent

##### $children

this.$children是一个数组类型，它包含所有子组件对象

```
<body>
	<div id='app'>
		<cpn></cpn>
		<cpn></cpn>
		<cpn></cpn>
		<button @click='btnClick'>按钮</button>
	</div>
</body>

<template id="cpn">
	<div>
		我是子组件
	</div>
</template>

<script >
	const app = new Vue({
	el:'#app',
	methods:{
		btnClick(){
			console.log(this.$children)
			for(let i=0;i<this.$children.length;i++){
				console.log(this.$children[i].name)
			}
		}
	},
	components:{
		cpn:{
			template:'#cpn',
			data(){
				return {
					name:'我是子组件的name'
				}
			},
			methods:{
				showMessage(){
					console.log('showMessage')
				}
			}
		}
	}
})
</script>
```

$children的缺陷

- 通过$children访问子组件时，是一个数组类型，访问其中的子组件必须通过索引值。
- 当子组件过多，我们需要拿到其中一个时，往往不能确定它的索引值，甚至还可能发生变化。
- 当我们想明确获取其中一个特定的组件，这时候可以使用$refs

##### $refs

- $refs和ref指令通常一起使用
- 首先，我们通过ref给某一个子组件绑定一个特定的ID
- 其次，通过this.$refs.ID就可以访问到该组件

```
<child-cpn1 ref='child1'></child-cpn1>
<child-cpn2 ref='child2'></child-cpn2>
<button @click="showRefsCpn">通过refs访问子组件</button>
```

```
showRefsCpn(){
	console.log(this.$refs.child1.message)
	console.log(this.$refs.child2.message)
}
```

##### $parent

我们可以通过$parent，在子组件中直接访问父组件，但是开发过程中不推荐

#### 10.9slot插槽

插槽就是当我们封装一个组件的时候，设置一个<slot>我们可以在其中插入不同的部分，就是保留组件的共性，将不同暴漏为插槽。

```
//基本使用
<div id='app'>
		<cpn></cpn>   //输出：我是插槽中的默认内容
		<cpn>													//输出：我是替换插槽的内容
																				我也是替换插槽的内容
			<h2>我是替换插槽的内容</h2>  
			<p>我也是替换插槽的内容</p>
		</cpn>
	</div>

<template id="cpn">
	<div>
		<slot>我是插槽中的默认内容</slot>
	</div>
</template>

<script >
	Vue.component('cpn',{
		template:'#cpn'
	})
	let app = new Vue({
		el:'#app'
	})
</script>
```

##### 具名插槽

```
<div id='app'>
		<!-- 没有传入任何内容 -->
		<cpn></cpn>

		<!-- 传入某一个内容 -->
		<cpn>
			<span slot="left">我是返回</span>
		</cpn>

		<!-- 传入所有内容 -->
		<cpn>
			<span slot="left">我是返回</span>
			<span slot="center">我是标题</span>
			<span slot="right">我是菜单</span>
		</cpn>
	</div>
```

```

<template id="cpn">
	<div>
		<slot name="left">我是左侧</slot>
		<slot name="center">我是中间</slot>
		<slot name="right">我是右侧</slot>
	</div>
</template>

<script >
	Vue.component('cpn',{
		template:'#cpn'
	})
	let app = new Vue({
		el:'#app'
	})
</script>
```

##### 编译作用域

我们考虑以下代码最终能否渲染出来

<cpn v-show='isShow'></cpn>中，我们使用了isShow属性

isShow属性包含在组件内，也可以包含在Vue实例中。

答案：最终可以渲染出来，使用的是Vue实例的属性。

官方规则：父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在自己作用域内编译。

当我们在使用<cpn v-show='isShow'></cpn>的时候，整个组件的使用过程是相当于在父组件中出现的，那么它的作用域就是父组件，使用的属性也是属于父组件的属性，因此isShow使用的是Vue实例中的属性，而不是子组件中的属性

```
<div id='app'>
		<cpn v-show='isShow'></cpn>//这里的isShow为true，
</div>

<template id="cpn">
	<h2>我能不能显示出来</h2>
</template>

Vue.component('cpn',{
		template:'#cpn',
		data(){
			return {
				isShow:false
			}
		}
	})
	let app = new Vue({
		el:'#app',
		data:{
			isShow:true
		}
	})
```

##### 作用域插槽

父组件替换插槽的标签，但是内容由子组件提供

```
<div id='app'>
		<!-- 列表形式展示 -->
		<cpn >
			<template slot-scope="slotProps">
				<ul>
					<li v-for="info in slotProps.data">{{info}}</li>
				</ul>
			</template>
		</cpn>
		
		<!-- 水平展示 -->
		<cpn>
			<template slot-scope="slotProps">
				<span v-for="info in slotProps.data">{{info}}</span>
			</template>
		</cpn>	
	</div>
```

```

<template id="cpn">
	<div><slot :data="pLanguages"></slot></div>
</template>

<script >
	Vue.component('cpn',{
		template:'#cpn',
		data(){
			return {
				pLanguages:['JS','Python','Swift','Go']
			}
		}
	})
	let app = new Vue({
		el:'#app',
	})
</script>
```

### 11模块化开发

在网页开发的早期，js制作作为一种脚本语言，做一些简单的表单验证或动画实现等，那个时候代码还是很少的。

那个时候的代码是怎么写的呢？直接将代码写在<script>标签中即可

随着ajax异步请求的出现，慢慢形成了前后端的分离

客户端需要完成的事情越来越多，代码量也是与日俱增。

为了应对代码量的剧增，我们通常会将代码组织在多个js文件中，进行维护。

但是这种维护方式，依然不能避免一些灾难性的问题。

比如全局变量同名问题

```
<script >
	document.getElementById('button').onclick=function(){
		console.log("按钮发生了点击")
	}
</script>

//aaa.js文件中，小明定义了一个变量名称是flag，并且为true
flag=true

//bbb.js文件中，小丽也用flag变量名称，只是为false
flag=false

//main.js文件中，小明想通过flag进行一些判断，完成后续的事情
if(flag){
cosnole.log('小明你好')
}
//小明发现代码不能正常运行，去检查自己的变量发现确实是ture
```

另外，这种代码的编写方式对js文件的依赖顺序几乎是强制性的

但是当js文件过多，比如有几十个的时候，弄清楚它们的顺序是一件比较同时的事情。

而且即使你弄清楚顺序了，也不能避免上面出现的这种尴尬问题的发生。

##### 匿名函数

我们可以使用匿名函数解决上述重名问题

```
//在aaa.js文件中，我们使用匿名函数
(funtion(){
	var flag = true
})
```

但是我们希望在main.js中用到flag，应该如何如理，显然另外一个文件中不容易使用，因为flag是一个局部变量。

#### 11.1使用模块作为出口

我们可以将需要暴露到外面的变量，使用一个模块作为出口。

我们做了什么事情呢？

- 非常简单，在匿名函数内部，定义一个对象。

- 给对象添加各种需要暴露到外面的属性和方法(不需要暴露的直接定义即可)。

- 最后将这个对象返回，并且在外面使用了一个MoudleA接受。

接下来，我们在man.js中怎么使用呢？

- 我们只需要使用属于自己模块的属性和方法即可

```
var ModuleA = (function(){
		//1.定义一个对象
		var obj = {}
		//2.在对象内部添加变量和方法
		obj.flag = true
		obj.myFunc = function(info){
			console.log(info)
		}
		//3.将对象返回
		return obj
	})
```

```
if(ModuleA.flag){
		console.log('小明你好')
	}
	ModuleA.myFunc('小明长得真帅')
	console.log(ModuleA)
```

这就是模块最基础的封装，事实上模块的封装还有很多高级的话题：

- 但是我们这里就是要认识一下为什么需要模块，以及模块的原始雏形。

- 幸运的是，前端模块化开发已经有了很多既有的规范，以及对应的实现方案。

常见的模块化规范：CommonJS、AMD、CMD，也有ES6的Modules

#### 11.2CommonJS

```
CommonJS的导出
module.exports = {
	flag:true,
	test(a,b){
		return a+b
	},
	demo(a,b){
		return a*b
	}
}
```

```
CommonJS的导入
//CommonJS模块
let {test,demo,flag} = require('moduleA')

//等同于
let _mA=require('moduleA')
let test = _ma.test;
let demo = _ma.demo;
let flag = _ma.flag
```

#### 11.3ES6的export指令

##### 导出变量

export指令常用于导出变量。

```
//info.js
export let name = 'why'
export let age = 18
export let height =1.88

//换个写法
let name = 'why'
let age = 18
let height = 1.88
export {name,age,height}
```

##### 导出函数或者输出类

```
export function test(content){
	console.log(content)
}

export class Person {
	cpnstructor(name,age){
		this.name = name;
		this.age = age
	}
	run(){
		console.log(this.name+'在奔跑')
	}
}
```

##### export default

在某些情况下，一个模块中包含某个功能，我们并不希望给这个功能命名，而且导入者可以自己命名，这个时候可以使用export default

```
export default function (){
	console.log('default function')
}
```

```
//在main.js中，我们这样使用
import myFunc from './info.js'//这里的myFunc是自己命名，可以根据需要命名对应的名字
myFunc()
```

- 注意：**export default在同一个模块中，不允许同时存在多个**

#### 11.4ES6的import指令

我们使用**export**指令导出了模块对外提供的接口，下面我们就可以通过**import**命令来加载对应的这个模块。

首先我们需要在HTML代码中引入两个js文件，并且类型设置为module

```
<script src="info.js" type="module"></script>
<script src="main.js" type="module"></script>
```

import指令用于导入模块中的内容，比如main.js的代码

```
//只有当export default导出的时候才可以省略大括号，平时都需要大括号
improt {name,age,height} from './info.js'
console.log(name,age,height)
```

如果我们希望某个模块中所有的信息都导入，可以通过*导入模块中的export变量

```
import * as info from './info.js'
console.log(info.name,info.age,info.height,info.friends)
```

### 12钩子函数

钩子函数与Vue的生命周期挂钩，即在vue执行的某个阶段，会自动调用该钩子。

beforeCreate

created

beforeMount

mounted

...

```
export default {
	name:'Home',
	data(){
		return {
			message:"Nihao"
		}
	},
	created(){
	//在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el property 目前尚不可用。
		console.log('home created')
	},
	mounted(){
		//实例被挂载后调用
	},
	activated(){
    //被 keep-alive 缓存的组件激活时调用。
    //该钩子在服务器端渲染期间不被调用。
	},
	#deactivated(){
		//被 keep-alive 缓存的组件停用时调用。
		//该钩子在服务器端渲染期间不被调用。
	}
}
```



## Vue-cli

使用 vue-cli 可以快速搭建Vue开发环境以及对应的webpack配置.

### 1.安装

`npm install -g @vue/cli`

### 2.初始化项目

`vue create my-project`

## Vue-router

### 1.路由

路由分为前端路由和后端路由。

早期都是后端路由，即我们页面需要请求不同的内容时，通过url传递给服务器，服务器渲染全部页面，再将页面返回给客户端，不需要加载任何的js和css。

后面随着ajax的出现，有了前后端的开发模式，后端只需提供API返回数据，前端通过ajax获得数据，并且通过js将数据渲染在页面中。当使用ajax时，页面不会刷新。

### 2.前端路由规则

#### 2.1URL的hash

URL的hash也就是锚点（#），本质上是改变window.location的href属性。

我们可以通过直接赋值`location.hash`来改变href，但页面不会刷新

> location.href
> "http://localhost:8080/"
>
> location.hash="aaa"
> "aaa"
>
> location.href
> "http://localhost:8080/#aaa"
>
> location.hash="/foo"
> "/foo"
>
> location.href
> "http://localhost:8080/#/foo"

#### 2.2HTML5的history模式

history接口是H5的内容，他有五种模式改变URL而不刷新页面。

**history.pushState()**

> history.pushState({},'','/foo')
> undefined
>
> location.href
> "http://localhost:8080/foo"

**history.replaceState()**

> history.replaceState({},'','/foo')
> undefined
>
> location.href
> "http://localhost:8080/foo"

**history.go()**

### 3.vue-router基础

vue-router是基于路由和组件的

- 路由用于设定访问路径，将路径和组件映射起来
- 在vue-router的单页面应用中，页面的路径的改变就是组件的切换

#### 3.1安装与使用

1. 安装vue-router

   - `npm install vue-router --save`

2. 在模块化工程中使用（因为是插件，所以用vue.use()来安装路由功能）

   1. 导入路由对象，并且调用Vue.use(VueRouter)
   2. 创建路由实例，并且传入路由映射配置
   3. 在Vue实例中挂载创建的路由实例

   ```
   //创建router实例
   
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   
   //1.插入插件
   Vue.use(VueRouter)
   
   //2.定义路由
   const routes=[]
   
   //3.创建router实例
   const router = new VueRouter({
   	routes
   })
   
   //4.导出router实例
   export default router
   ```

   ```
   //挂载到Vue实例
   import Vue from 'vue'
   import App from './App'
   import router from './router'
   
   new Vue({
   	el:'#app',
   	router,
   	render:h=>h(App)
   })
   ```

   

使用步骤

1. 创建路由组件

   ```
   //在components文件夹下创建路由组件
   //about.vue
   <template>
     <div>
       <h2>我是关于标题</h2>
       <p>我是关于内容</p>
     </div>
   </template>
   
   <script >
   export default {
     name:'about', 
   }
   </script>
   
   <style scoped>
   </style>
   
   ```

   ```
   //home.vue
   <template>
     <div>
       <h2>我是首页标题</h2>
       <p>我是首页内容</p>
     </div>
   </template>
   
   <script >
   export default {
     name:'home', 
   }
   </script>
   
   <style scoped>
   </style>
   
   ```

2. 配置路由映射：组件和路径映射关系

   ```
   //在router文件夹下index.js中配置
   import Vue from 'vue'
   import VueRouter from 'vue-router'
   
   import Home from '../components/home'
   import About from '../components/about'
   //1.插入插件
   Vue.use(VueRouter)
   
   //2.定义路由
   const routes=[
   	{
   		path:'/home',
   		component:Home
   	},
   	{
   		path:'/about',
   		component:About
   	}
   ]
   
   //3.创建router实例
   const router = new VueRouter({
   	routes
   })
   
   //4.导出router实例
   export default router
   ```

3. 使用路由：通过<router-link>和<router-view>

   ```
   //在App.vue文件中使用路由
   <template>
     <div id="app">
     	//网页的其他内容，比如顶部的标题和导航，或者底部的一些版权信息等会和router-view处于同一级别
       <h2>我是网站的标题</h2>
       
       //<router-link>是一个vue-router中内置的组件，它会被渲染成一个<a>标签
       <router-link to="/home">首页</router-link>
       <router-link to="/about">关于</router-link>
       
       //<router-view>该标签会根据当前的路径，动态渲染不同的组件
       //路由切换的时候，切换的是<router-view>挂载的组件，其他内容不会发生改变
       <router-view></router-view>
       
       <h2>我是App中的一些底部版权信息</h2>
     </div>
   </template>
   
   <script >
   export default {
     name:'App', 
     components:{
       
     }
   }
   </script>
   
   <style scoped>
   </style>
   
   ```

#### 3.2默认路径

默认情况下进入首页的网站。

```
//我们只需要多配置一个映射就行
const routes = [
	{
		path:'/',
		//我们将根路径重定向到/home
		redirect:'/home'
	}
]
```

#### 3.3去掉#的hitory模式

改变路径的方式根据路由规则有两种

- URL的hash  

  > localhost:8080/#/about

- HTML5的history

  > localhost:8080/about

- 默认情况下使用的是URL的hash

希望使用history模式配置如下

```
//在创建router实例的时候添加mode
const router = new VueRouter({
	routes,
	mode:'history'
})
```

#### 3.4router-link补充

在<router-link>中，除了to属性用于指定跳转路径还有其他属性

- to  指定跳转路由

- tag 指定<router-link>渲染成什么组件，比如<router-link to="/home" tag="li">会被渲染成一个li元素，而不是a。

- replace 不会留下history记录，所以指定replace情况下，后退键不能返回上一个页面

- active-class 当<router-link>对应的路由匹配成功时，会自动给当前元素设置一个router-link-active的class，设置active-class可以修改默认的名称

  - 在进行高亮显示的导航菜单或者底部tabbar时，会用到该类

  - 但是通常不会修改类的属性，会直接使用默认的router-link-ative

    ```
    <div id='app'>
    	<h1>我是网站的标题</h1>
    	<a href='/home' class="router-link-exact-active router-link-active">首页</a>
    </div>
    ```

  - 该类名名称也可以通过router实例实现

    ```
    //在创建router实例的时候添加mode
    const router = new VueRouter({
    	routes,
    	linkActiveClass:'active'
    })
    ```

    ```
    <div id='app'>
    	<h1>我是网站的标题</h1>
    	<a href='/home' class="router-link-exact-active active">首页</a>
    </div>
    ```

#### 3.5路由代码跳转

有时候页面的跳转需要执行对应的js代码，这时候可以用第二种跳转方式

```
//App.vue设置如下
<template>
  <div id="app">
    <h2>我是网站的标题</h2>
    <button @click="linkToHome">首页</button>
    <button @click="linkToAbout">关于</button>
    <router-view></router-view>
    <h2>我是App中的一些底部版权信息</h2>
  </div>
</template>

<script >
export default {
  name:'App', 
  methods:{
    linkToHome(){
      this.$router.push('/home')
    },
    linkToAbout(){
      this.$router.push('/about')
    }
  }
}
</script>

<style scoped>
</style>
```

#### 3.6动态路由

在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时，希望得到的时如下路径/user/zhangsan，除了前面的/user以外，后面还拼接了用户的id。

这种path和component的匹配关系我们称之为动态路由（也是路由传递数据的一种方式）

```
//路由配置
{
	path:'/uer/:id',
	component:User
}
```

```
//模块配置
<template>
  <div id="app">
  //通过v-bind动态绑定属性并且获取data()中的值
    <router-link :to="'/user/'+userId"></router-link>
  </div>
</template>

<script >
export default {
  name:'App', 
  data(){
    return {
      userId:'zhangsan'
    }
  }
}
</script>
```

此时我们已经替换成功了。但是我们还可以通过{{$route.params.id}}获取id值

```
<div>
	//注意这里的是$route,所对应的是路由配置中的一个小的route
	//this.$router.push('/home')中的router对应的是new的router实例
	<h2>{{$route.params.id}}</h2>
</div>
```

#### 3.7路由的懒加载

当打包构建应用时，JS包会变得非常大，因为在被打包完成的时候，页面都会被放到一个js文件中，如果我们一次性从服务器请求来这个文件，可能需要花费一定的时间，甚至用户电脑还出现短暂的空白，影响体验，如果我们将不同路由对应的组件在被该组件被访问时才加载，就会变得高效。

懒加载做了什么

- 路由懒加载的主要作用就是将路由对应的组件打包成一个个js代码块
- 只有这个路由被访问到的时候，才加载对应的组件

**懒加载的三种方式**

方式一：结合Vue的异步组件和webpack的代码分析

`const Home = resolve => { require.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')) })};`

方式二：AMD写法

`const About = resolve => require(['../components/About.vue'], resolve);`

方法三：在es6中更加简洁的写法来组织Vue和Webpack

`const Home = ()=>import('../components/home.vue')`

```
//原先
import Home from '../components/home'
import About from '../components/about'
//1.插入插件
Vue.use(VueRouter)

//2.定义路由
const routes=[
	{
		path:'/home',
		component:Home
	},
	{
		path:'/about',
		component:About
	}
]

```

```
//懒加载写法
const Home = ()=>import('../components/home.vue')
const About = ()=>import('../components/about.vue')

//1.插入插件
Vue.use(VueRouter)

//2.定义路由
const routes=[
	{
		path:'/home',
		component:Home
	},
	{
		path:'/about',
		component:About
	}
]





//或者
//1.插入插件
Vue.use(VueRouter)

const routes = [
	{
		path:'/home',
		component:()=>import('../components/Home')
	},
	{
		path:'/about',
		component:()=>import('../components/About')
	}
]
```

#### 3.8嵌套路由

嵌套路由非常常见，比如我们希望访问home页面中的news和message页面。

路径为/home ,/home/news,/home/message

实现嵌套路由有两个步骤

1. 创建对应子组件，并且在路由映射中配置对应的子组件
2. 在组件内部使用<router-view>标签

```
//message.vue组件
<template>
  <div>
    <ul>
      <li>message1</li>
      <li>message2</li>
      <li>message3</li>
    </ul>
  </div>
</template>

<script >
export default {
  name:'message', 
}
</script>
```

```
//news.vue组件
<template>
  <div>
    <ul>
      <li>new1</li>
      <li>new2</li>
      <li>new3</li>
    </ul>
  </div>
</template>

<script >
export default {
  name:'new', 
}
</script>
```

```
//home.vue组件
<template>
 <div id="home">
   <h2>我是首页标题</h2>
   <router-link to="/home/message">消息</router-link>
   <router-link to="/home/news">新闻</router-link>
 </div>
</template>

<script >
export default {
  name:'home', 
}
</script>

```

```
//router文件夹下的index.js
import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载写法
const Home = ()=>import('../components/home.vue')
const Message = ()=>import('../components/message')
const News = ()=>import('../components/news')

//1.插入插件
Vue.use(VueRouter)

//2.定义路由
const routes=[
	{
		path:'/home',
		component:Home,
		children:[
			{
				path:'message',
				component:Message
			},
			{
				path:"news",
				component:News
			},
			//如果要配置默认路径
			{
				path:'',
				redirect:'message'
			}
		]
	},
]
```

#### 3.9传递参数

传递参数主要有两种类型：params和query

params的类型：

- 配置路由格式：/router/:id
- 传递方式：在path后面跟上对应的值
- 传递后形成的路径：/router/123,/router/abc

query类型：

- 配置路由格式：/router，就是普通配置
- 传递方式：对象中使用query的key作为传递方式
- 传递后形成的路径：/router?id=123,/router?id=abc

使用方式有两种，<router-link>和js代码。

```
//使用方式1  <router-link>
<router-link :to="{path:'/profile'+123,query:{name:'why',age:18}}"> 
```

```
//使用方式2 js代码
methods:{
	toProfile(){
		this.$router.push({
			path:'/profile/'+123,
			query:{name:'why',age:18}
		})
	}
}
```

#### 3.10获取参数

获取参数通过$route对象获取。

在使用了vue-router的应用中，路由对象会被注入每个组件中，赋值为this.$route，并且当路由切换时，路由对象会被更新。

```
<template>
	<div>
		<p>params:{{$route.params}}</p>
		<p>qeury:{{$route.query}}</p>
	</div>
</template>
```

#### 3.11$route和$router的不同

$route和$router是有区别的

- $router为VueRouter实例，想要导航到不同URL，则使用$router.push方法

- $route为当前router跳转对象里面可以获取name、path、query、params等 
  - `this.$route.path`可以获得当前活跃的路由的path

#### 3.12导航守卫

什么是导航守卫？

- vue-router提供的导航首位主要用来监听路由的进入和离开
- vue-router提供了beforeEach和afterEach的钩子函数，它们会在路由即将改变前和改变后触发

我们可以通过beforeEach完成标题的修改，即每次跳转页面，title值修改。

```
//第一步在钩子中定义标题，用meta定义
//2.定义路由
const routes=[
	{
		path:'/home',
		component:Home,
		meta:{
			title:'首页'
		}
	},
	{
		path:'/about',
		component:About,
		meta:{
			title:'关于'
		}
	}
]

```

```
//第二步利用导航守卫修改标题
//3.创建router实例
const router = new VueRouter({
	routes,
	linkActiveClass:'active'
})

//导航钩子的三个参数解析：
	//to:即将要进入的目标的路由对象
	//from：当前导航即将要离开的路由对象
	//next：调用该方法后，才能进入下一个钩子
router.beforeEach((to.from,next)=>{
	window.document.title = to.meta.title
	next()
})
```

注意：

- 如果是后置钩子，也就是afterEach，不需要主动调用next()函数
- 上面使用的导航守卫是全局守卫，还有路由独享的守卫以及组件内的守卫



#### 3.13keep-alive和router-alive的搭配使用

每当切换路由路径的时候，组件是会被重新加载渲染的，所以相当于每次都会请求，如果我们希望将该页面缓存下来，这就需要用到keep-alive

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

他有两个很重要的属性

- incude  字符串或正则表达式，只有匹配的组件会被缓存
- exclude  字符串或正则表达式，任何匹配的组件都不会被缓存

router-view也是一个组件，如果直接被包在keep-alive里，所有路径匹配到的视图组件都会被缓存

```
<keep-alive>
	<router-view>
		//所有路径匹配到的视图组件都会被缓存
	</router-view>
</keep-alive>
```

### 4.tabbar案例

1. 如果在下方有一个单独的TabBar组件，你如何封装
   - 自定义TabBar组件，在APP中使用	
   - 让TabBar出于底部，并且设置相关的样式
2. TabBar中显示的内容由外界决定
   - 定义插槽
   - flex布局平分TabBar
3. 自定义TabBarItem，可以传入 图片和文字
   - 定义TabBarItem，并且定义两个插槽：图片、文字。
   - 给两个插槽外层包装div，用于设置样式。
   - 填充插槽，实现底部TabBar的效果
4. 传入 高亮图片
   - 定义另外一个插槽，插入active-icon的数据
   - 定义一个变量isActive，通过v-show来决定是否显示对应的icon
5. TabBarItem绑定路由数据
   - 安装路由：npm install vue-router —save
   - 完成router/index.js的内容，以及创建对应的组件
   - main.js中注册router
   - APP中加入<router-view>组件
6. 点击item跳转到对应路由，并且动态决定isActive
   - 监听item的点击，通过this.$router.replace()替换路由路径
   - 通过this.$route.path.indexOf(this.link) !== -1来判断是否是active
7. 动态计算active样式
   - 封装新的计算属性：**this**.isActive ? {'color': 'red'} : {}

## VueX

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

状态管理：就是把需要多个组件共享的变量全部存储在一个对象中，然后将这个对象放到Vue实例中。

**单页面的状态管理**

State：我们的状态（可以当作是data中的属性）

View：视图层，可以针对State的变化显示不同的信息

Actions：这里的Actions主要是用户的各种操作，比如点击输入等，会导致状态的变化。

![](F:\记录\img\单页面状态管理.png)

**多页面的状态管理**

![](F:\记录\img\多页面状态管理.png)

### 1.简单案例

```
//store文件夹下的index.js文件
import VueX from 'vuex'
	import Vue from 'vue'

	Vue.use(VueX)

	const store = new Vuex.Store({
		state:{
			count:0
		},
		mutations:{
			increment(state){
				state.count++
			},
			decrement(state){
				state.count--
			}
		}
	})
	export default store
```

挂载到Vue实例中，我们让所有的组件都可以使用这个store对象

```
//在main.js中导入store对象，并且放到new Vue中，这样在其他Vue组件中我们可以通过this.$store的方法获取到这个store对象。
import Vue from "vue"
import App from "./App"
import store from './store'
new Vue({
	el:"#app",
	store,
	render:h=>h(App)
})
```

组件中使用

```
<template>
  <div id="app">
    <p>{{count}}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script >
export default {
  name:'App', 
  components: {

  },
  computed:{
    count:function(){
      return this.$store.state.count
    }
  },
  methods:{
    increment:function(){
      this.$store.commit("increment")
    },
    decrement:function(){
      this.$store.commit("decrement")
    }
  }
}
</script>

```

使用步骤：

1. 提取一个公共的store对象，用于保存在多个组件中共享的状态。
2. 将store对象放置在new Vue对象中，这样可以保证在所有的组件中都可以使用
3. 在其他组件中使用store对象中保存的状态即可
   - 通过this.$store.state.属性的方式来访问状态
   - 通过this.$store.commit('mutation中方法')来修改状态

注意事项：

- 我们通过提交mutation的方式，而非直接改变store.state.count
- 这是因为Vuex可以更明确的追踪状态变化，所以不要直接改变store.state.count的值

### 2.Vuex核心概念

#### State单一状态树

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT (opens new window)](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

#### Getter计算属性

getter在store中类似于组件中的计算属性computed

获取学生年龄大于20的个数

```
const store = new Vuex.Store({
	state:{
		students:[
			{id:110,name:'kobe',age:18},
			{id:111,name:'kobe1',age:21},
			{id:112,name:'kobe2',age:26},
			{id:113,name:'kobe3',age:30},
		]
	},
	getter:{
	greaterAgesCount:state=>{
		//filter方法 filter为其中的每个元素调用一次 callback函数，并利用所有并callback返回true或等价于true的值的元素创建一个新callback 数组。只会在已经赋值的索引上被调用，对于那些已经被删除或从未那些没有通过 callback测试的元素会被跳过，不会被包含在新数组中。
		return state.students.filter(s=>s.age>=20).length
	}
}
})
```

```
//组件中使用计算属性
computed:{
	getGreaterAgesCount(){
		return this.$store.state.students.filter(age=>age>=20).length
	}
}
```

如果我们已经有了一个获取所有年龄大于20岁学生列表的getters，那么代码可以这么写

```
getters:{
	greaterAgesStus:state=>{
		return state.students.filter(s=>s.age>=20)
	},
	greaterAgesCount:(state,getters)=>{//这里的getters能获得getters里面的属性和方法
		return getters.greaterAgesStus.length
	}
}
```

如果我们希望不写死数据，根据传过来的参数筛选数据

getters默认是不能传递参数的，所有我们需要直接让getters返回一个函数，让返回的函数接收参数

```
getters:{
	greaterAgesStus:state=>{
		return state.students.filter(s=>s.age>=20)
	},
	greaterAgesCount:(state,getters)=>{//这里的getters能获得getters里面的属性和方法，无论该方法第二参数写的是什么比如aaa，返回的都是getters
		return getters.greaterAgesStus.length
	},
	studentById(state){
		return function(id){
			return state.students.find(s=>s.id===id)
		}
	},
	//简写
	studentById:state=>{
		return id=>{
			return state.students.find(s=>s.id===id)
		}
	}
}
```

#### Mutation方法管理

Vuex的store状态的唯一更新方式是提交Mutation

mutation主要包括两个部分

- 字符串的事件类型
- 一个回调函数，该回调函数的第一个参数就是state

```
//mutation的定义方式
mutations:{
	increment(state){
		state.count++
	}
}
```

```
//通过mutation更新
increment:function(){
	this.$store.commit('increment')
}
```

##### 传递参数

在通过mutation更新数据的时候，有可能我们希望携带一些额外的参数，参数被称为是mutation的载荷(payload)

Mutation中的代码

```
decrement(state,n){
	state.count -=n
}
```

```
decrement:function(){
	this.$store.commit('decrement',2)
}
```

如果参数不是一个，有很多的参数需要传递，我们会以对象的形式传递，也就是payload是一个对象

```
changeCount(state,payload){
	state.count = payload.count
}
```

```
changeCount:function(){
	this.$store.commit('changeCount',{count:0})
}
```

commit进行提交的另一个风格，他是一个包含type属性的对象

```
this.$store.commit({
	type:'changeCount',
	count:100
})
```

```
//mutation中的处理方式是将整个commit的对象作为payload使用，所以以下代码没有发生变化
changeCount(state,payload){
	state.count = payload.count
}
```

##### Mutation响应规则

Vuex的store中的state是响应式的，当state中的数据发生改变时，Vue组件会自动刷新。

这就要求我们必须遵守一些Vuex对应的规则

- 提前在store中初始化好所需的属性
- 当给state中的对象添加新属性时，使用下面的方式
  - 方式1：使用Vue.set(obj,'newProp',123)
  - 方式2：用新对象给旧对象重新赋值

```
//App.vue
<template>
  <div id="app">
    <p>我的个人信息：{{info}}</p>
    <button @click="updateInfo">更新信息</button>
  </div>
</template>

<script >
export default {
  name:'App', 
  computed:{
    info(){
      return this.$store.state.info
    }
  },
  methods:{
    updateInfo(){
      this.$store.commit('updateInfo',{height:1.88})
    }
  }
}
</script>
```

```
//Vuex
const store = new Vuex.Store({
	state:{
		info:{
			name:'why',age:18
		}
	},
	mutations:{
		updateInfo(state,payload){
			//这样写是不会响应自动更新的
			state.info['height']=payload.height
			//下面两种方法是响应式的
			//方法一：Vue.set()
			Vue.set(state.info,'height',payload.height)
			//方法二：给info赋值一个新对象
			state.info = {...state.info,'height':payload.height}
		}
	}
})
```

##### Mutation常量类型

当我们的项目增大时, Vuex管理的状态越来越多, 需要更新状态的情况越来越多, 那么意味着Mutation中的方法越来越多。方法过多, 使用者需要花费大量的经历去记住这些方法, 甚至是多个文件间来回切换, 查看方法名称, 甚至如果不是复制的时候, 可能还会出现写错的情况。

一种很常见的方案就是使用**常量**替代Mutation**事件的类型**。

我们可以创建一个文件mutation-types.js文件，并定义我们的常量

```
//mutation-types.js
export const UPDATE_INFO  = 'UPDATE_INFO'
```

```
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		info:{
			name:'why',age:18
		}
	},
	mutations:{
		[types.UPDATE_INFO](state,payload){
			satet.info = {...satte.info,'height':payload.height}
		}
	}
})
export default store
```

```
<script>
	import {UPDATE_INFO} from './store/mutation-types'
	export default {
		name:'App',
		computed:{
			info(){
				return this.$store.state.info
			}
		},
		methods:{
			updateInfo(){
				this.$store.commit(UODATE_INFO,{height:1.88})
			}
		}
	}
</script>
```

##### Mutation同步函数

通常情况下, Vuex要求我们Mutation中的方法必须是同步方法。主要的原因是当我们使用devtools时, 可以devtools可以帮助我们捕捉mutation的快照，但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成。

所以通常情况下，不要用mutation进行异步操作

#### Action异步操作

Vuex中的Mutation不能进行异步操作，但是我们希望仍然可以在Vuex中进行异步操作，这时需要使用action。

context是什么？

context是和store对象具有相同方法和属性的对象，也就是说我们可以通过context去进行commit相关的操作，也可以获取context.state等

```
const store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		increment(state){
			satte.count++
		}
	},
	actions:{
		increment(context){
			context.commit('increment')
		}
	}
})
```

在Vue组件中，如果我们调用action中的方法，那么就需要使用dispatch

```
methods:{
	increment(){
		this.$store.dispatch('increment',{cCount:5})
	}
}
```

```
mutations:{
	increment(state,payload){
		state.count+=payload.cCount
	}
},
actions:{
	increment(context,payload){
		setTimeout(()=>{
			context.commit('increment',payload)
		},5000)
	}
}
```

##### Action异步与Promise合用

Promise常用于异步操作，在Action中，我们可以将异步操作放在一个Promise中，并且在成功或者失败后，调用对应的resolve或reject。

```
actions:{
	increment(context){
		return new Promise((resolve)=>{
			setTimeout(()=>{
				context.commit('increment')
				resolve()
			},1000)
		})
	}
}
```

```
methods:{
	increment(){
		this.$store.dispatch('increment').then(res=>{
			console.log('完成更新操作')
		})
	}
}
```

#### Module模块管理

Vue使用单一状态树,那么也意味着很多状态都会交给Vuex来管理，当应用变得非常复杂时,store对象就有可能变得相当臃肿。

为了解决这个问题, Vuex允许我们将store分割成模块(Module), 而每个模块拥有自己的state、mutation、action、getters等

```
const moduleA = {
	state:{...},
	mutations:{...},
	actions:{...},
	getters:{...}
}
const moduleB = {
	state:{...},
	mutations:{...},
	actions:{...},
	getters:{...}
}

const store = new Vuex.Store({
	modules:{
		a:moduleA,
		b:moduleB
	}
})

store.state.a  //->moduleA 的状态
store.state.b  //->moduleB 的状态
```

具体写法

```
const moduleA = {
	state:{
		count:0	
	},
	//局部状态通过context.state暴露出来，根节点状态为context.rootState
	actions:{
		incrementIfoddOnRootSum({satte,commit,rootState}){
			if((satte.count+rootState.count)%2===1){
				commit('increment')
			}
		}
	}
	mutations:{
		increment(satte){
			state.count++
		}
	},
	getters:{
		doubleCount(state){
			return state.count *2
		},
		//如果getters中也需要使用全局状态，可以接受更多的参数
		sumWithRootCount(state,getters,rootState){
			return state.count+rootState.count
		}
	}

}
const moduleB = {
}

const store = new Vuex.Store({
	satte:{
		gCount:111
	},
	modules:{
		a:moduleA,
		b:moduleB
	}
})

export default store
```

```
<script>
	export default {
		name:'App',
		computed:{
			count(){
				return this.$store.getters.doubleCount
			}
		},
		methods:{
			increment(){
				this.$store.commit('increment')
			}
		}
	}
</script>
```

### 3.核心联系图

![](F:\记录\img\VueX.png)

### 4.项目结构

当我们的Vuex帮助我们管理过多内容时，好的项目结构可以让我们的代码更加清晰。

![](F:\记录\img\Vuex项目结构.png)

## 网络模块

Vue中发送网络请求有很多的方式，那么在开发中如何选择。

选择一：传统的Ajax，这是基于XMLHttpRequest（XHR），不用的原因：配置和调用方式混乱，真实开发中很少直接使用。

选择二：jquery-ajax，不用的原因：vue的整个开发中都是不使用jquery的，当我们为了一个网络请求特地引用一个jquery就不合理，jquery代码1w+，vue的代码也1w+，没必要引用这个重量级的框架。

选择三：axios框架，使用方便，优点很多

### 1.JSONP

在前端开发中，我们一种常见的网络请求方式是JSONP。

使用JSONP的原因往往是为了解决跨域访问问题。

不同源的网站（即协议、域名以及端口其中有一不同）是不能发送Ajax的请求，以及cookie的使用。这是为了防止恶意网站窃取信息。

#### JSONP的原理

JSONP的核心在于通过<script>标签的src来帮助我们请求数据。

原因：我们的项目部署在domain1.com服务器上的时候是不能直接访问domain2.com服务器上的资料的，这时候我们利用<script>标签的src帮我们去服务器请求数据，将数据当作一个JavaScript函数来执行，并且执行的过程中传入我们需要的json。所以封装jsonp的核心在于我们监听window上的jsonp进行回调的名称。

<img src="F:\记录\img\jsonp的原理.png" style="zoom: 50%;" />

#### JSONP的封装

```
let count = 1;
export default function originPJSONP(option){
	//1.从传入的option中提取URL
	const url = option.url
	//2.在body中添加script标签
	const body = document.getElementsByTagName('body')[0]
	const script = document.createElement('script')
	//3.内部生产一个不重复的callback
	const callback = 'jsonp'+count++
	//4.监听window上的jsonp调用
	return new Promise((resolev,reject)=>{
		try{
			window[callback] = function(result){
				body.removeChild(script)
				resolve(result)
			}
			const params = handleParam(option.data);
			script.src = url+'?callbacke='+callback+params
			body.appendChild(script)
		}
		catch(e){
			body.removeChild(script)
			reject(e)
		}
	})
}
```

```
function handleParam(data){
	let url=''
	for(let key in data){
		let value = data[key] !==undefined ?data[key]:''
		url+=`&${key}=${encodeURIComponent(value)}`
	}
	return url
}
```

### 2.axios

功能：

1. 在浏览器中发送XMLHttpRequests请求
2. 在node.js中发送http请求
3. 支持Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 等等

多种请求方式：

- axios(config)
- axios.request(config)
- axios.get(url[,config])
- axios.delete(url[,config])
- axios.head(rul[,config])
- axios.post(url[,data[,config]])
- axios.put(urp[,data[,config]])
- axios.patch(url[,data[,config]])

#### 发送get请求

```
import axios from 'axios'
export default {
	name:'app',
	created(){
		//1.没有请求参数
		axios.get('http://123.207.32.32:8000/category')
			.then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		//2.有请求参数
		axios.get('http://123.207.32.32:8000/home/data',{params:{type:'sell',page:1}})
		.then(res=>{
			console.log(res)
		}).catch(err=>{
			console.log(err)
		})
	}
}
```

#### 发送并发请求

有时我们可能需要同时发送两个请求，使用axios.all可以放入多个请求的数组，axios.all([])返回的结果是一个数组，使用axios.spread可将数组[res1,res2]展开为res1,res2

```
import axios from 'axios'
export default {
	name:'app',
	created(){
		//发送并发请求
		axios.all([axios.get('http://123.207.32.32:8000/category'),
							axios.get('http://123.207.32.32:8000/home/data',{params:							                {type:'sell',page:1}})])
			.then(axios.spread((res1,res2)=>{
				console.log(res1)
				console.log(res2)
			}))
	}
}
```

#### 全局配置

在开发中可能很多参数都是固定的，这时候我们可以进行一些抽取，也可以利用axios的全局配置。

axios.defaults.baseURL = '123.207.32.32:8000'

axios.defaults.haders.post['Content-type']='application/x-www-form-urlencoded'

```
created(){
	//提取全局的配置
	axios.defaults.baseURL = 'http://123.207.32.32:8000'
	
	//发送并发请求
	axios.all([aixos.get('/category'),
						axios.get('/home/data',{params:{type:'sell',page:1}})])
			.then(axios.spread((res1,res2)=>{
				console.log(res1)
				console.log(res2)
			}))
}
```

#### 常规的配置选项

请求地址

- url: '/user',

请求类型

- method: 'get',

请根路径

- baseURL: 'http://www.mt.com/api',

请求前的数据处理

- transformRequest:[function(data){}],

请求后的数据处理

- transformResponse: [function(data){}],

自定义的请求头

- headers:{'x-Requested-With':'XMLHttpRequest'},

URL查询对象

- params:{ id: 12 },

查询对象序列化函数

- paramsSerializer: function(params){ }

request body

- data: { key: 'aa'},

超时设置s

- timeout: 1000,

跨域是否带Token

- withCredentials: false,

自定义请求处理

- adapter: function(resolve, reject, config){},

身份验证信息

- auth: { uname: '', pwd: '12'},

响应的数据格式 json / blob /document /arraybuffer / text / stream

- responseType: 'json',

#### axios实例

为什么要创建axios实例

- 当我们从axios模块中导入对象时，使用的实例时默认的实例。
- 当给该实例设置一些默认配置的时候，这些配置就被固定下来了，但是后续的开发中，某些配置可能不太一样。比如某些请求需要使用特定的baseURL或者timeout或者content-Type等。
- 这时候我们可以创建新的实例，并且传入属于该实例的配置。

```
//创建新实例
const axiosInstance = axios.create({
	baseURL:'http://123.207.32.32:8000',
	timeout:5000,
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	}
})
```

```
//发送网络请求
axiosInstance({
	url:'/category',
	method:'get'
}).then(res=>{
	console.log(res)
}).catch(err=>{
	console.log(err)
})
```

#### axios封装

```
//axios.js
import originAxios from 'axios'
export default function axios(option){
	return new Promise((resolve,reject)=>{
		//1.创建axios实例
		const instance = originAxios.creat({
			baseURL:"/api",
			timeout:5000,
			headers:''
		})
		//2.传入对象进行网络请求
		instance(option).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err)
		})
	})
}
```

#### axios拦截器

axios提供了拦截器，用于我们在发送每次请求或得到响应后进行对应的处理。

```
//配置请求和响应拦截
instance.interceptors.request.use(config=>{
	console.log('来到了request拦截success中');
	return config
}),err=>{
	console.log('来到了request拦截failure中')
	return err
}

instance.interceptors.response.use(response=>{
	console.log('来到了response拦截success中');
	return response.data
}),err=>{
	console.log('来到了response拦截failure中')
	return err
}
```

```
axios({
	url:'/home/data',
	method:'get',
	params:{
		type:'sell',
		page:1
	}
}).then(res=>{
	console.log(res)
}).catch(err=>{
	console.log(err)
})
```

![](F:\记录\img\axios拦截器显示.png)

#### 请求拦截可以做到的事情

1. 当发送网络请求时，在页面添加一个loading组件，作为动画
2. 某些请求要求用户必须登录，判断用户是否有token，如果没有token跳转到login页面
3. 对请求的参数进行序列化
4. ...

#### 响应拦截可以做到的事情

1. 响应的成功拦截中，主要是对数据进行过滤
2. 响应失败的拦截中可以根据status判断报错的错误码，跳转到不同的错误提示页面