## JS基础

### 1.计算机编程基础

#### 什么是编程语言？

​	计算机的语言分为：机器语言、汇编语言、高级语言

- **编程语言**包括**汇编语言**和**高级语言**。

- 汇编语言本质和机器语言相同，不过指令采取了英文缩写的标识符

- 高级语言PHP,Java,Python,JS等不能被机器识别，需要**翻译器**转换为机器语言

#### 编程语言和标记语言的不同

​	编程语言有很强的逻辑行为能力，是主动的。

​	标记语言（如html），不用于向计算机发送指令。

#### 内存的作用

​	程序运行：1.打开某程序，先把硬盘中的代码加载到内存中。2.CPU执行内存中的代码。

​	之所以要内存的存在，是因为CPU运行太快，如直接从硬盘中读取数据，会浪费CPU的性能

### 2.初识JS

#### JS是什么？

​	JS是一种运行在客户端的**脚本语言**。

​	脚本语言：不需要编译，运行过程中JS解释器逐行解释。

#### 浏览器执行JS的原理

​	浏览器分为两部分：渲染引擎和JS引擎

​	渲染引擎：用于解析html和css，俗称**内核**。

​	JS引擎：也称JS解释器，用来读取网页中的JS代码

#### JS的三个输入输出语句

​	`alert(message)`

​	`console.log(message)`

​	`prompt(info)`这个比较特殊，浏览器弹出输入框，用户可以输入，获取的数据为字符串

### 3.数据类型

#### String

​	1.`toString()`

​	2.`String()`

​	3.加号拼接字符

#### Number

​	1.`parseInt()`

​	2.`parseFloat()`

​	3.`Number()`

​	4.JS隐式转换 -、*、/  如'12'-0

#### Null

#### Undefined

#### Boolean

#### Symbol(es6)

表示独一无二的值，最大的用法是用来定义对象的唯一属性名。

### 4.数组

#### 数组的创建

```
//方法1：创建实例对象
var 数组名 = new Array() //创建了一个空数组
var arr1 = new Array(2)//创建了一个长度为2的数组
var arr1 = new Array(2,3)//等价于[2,3]

//方法2：数组字面量创建数组
var 数组名 = []
```

#### 数组新增元素

```
//方法1：修改length值
arr.length = 7 //没有给值的数组默认为undefined

//方法2：修改索引号
arr[7] = 'red' //会覆盖
```

### 5.对象

#### 对象的创建

```
//方法1：用字面量创建对象
var obj = {
	name:'张三',
	age:18,
	sayHi:function(){
		console.log('hi')
	}
}
console.log(obj.name)
console.log(obj['age'])
obj.sayHi


//方法2：用new Object()创建对象
var obj = new Object();
obj.name = '张三'

//方法3：用构造函数创造对象
构造函数：将对象里一些相同的属性和方法抽象封装到函数里面
1.构造函数首字大写
2.构造函数不需要return就可以返回结果
3.调用构造函数必须要new
4.属性和方法前面必须添加this
function Star(uname,age){
	this.name = uname;
	this.age = age;
	this.sing = function(sang){
		console.log(sang)
	}
}
var ldh = new Star()
console.log(ldh.name)
console.log(ldh.sing('冰雨'))
```

##### new的执行过程

1.new构造函数可以在内存中创建一个空对象。

2.this指向该空对象。

3.执行构造函数里面的代码，给这个空对象添加属性和方法。

4.返回这个对象。（所以不需要return就可以得到结果，new构造函数之后，内部已经return该结果）

#### 遍历对象

##### for...in

```
for(var k in obj){
	console.log(k) //k得到的是属性名
	console.log(obj[k])//obj[k]得到的是属性值
}
```

#### Math对象常用方法

Math对象不是构造函数，不用new

```
Math.PI //圆周率
Math.max() //最大值
Math.floor() //向下取整
Math.ceil()  //向上取整
Math.round()  //四舍五入，就近取整 -3.5结果是-3
Math.abs()	//绝对值（隐式转换，会把字符串转换成数值）
Math.min()	//最小值
Math.random()  //返回一个随机数 0<=x<=1
```

Date对象常用方法

Date对象是构造函数，需要用new，且Date对象没有字面量格式

```
var date1 = new Date() 
console.log(date1)//没有参数，返回的是当前系统时间
var date1 = new Date(2019,10,1)
console.log(date1)//返回的是11月，不是10月
var date1 = new Date('2019-10-1')
console.log(date1)//返回的是10月，常用写法

getFullYear()//年
getMonth()//月
getDate()//日
getDay()//星期
getHours()//时
getMinutes()//分
getSeconds()//秒

Date.now()//可以获得距离1970年1月1日过了多少毫秒数 总毫秒数
```

#### 数组对象常用方法

```
//增加数组
push()//在数组的末尾添加一个或多个数组元素，原数组会变化
unshift() //在数组的开头添加一个或者多个数组，原数组会变化

//删除数组
pop() ///删除数组的最后一个元素，没有参数值，原数组会变化
shift() ///删除数组的第一个元素，没有参数值，原数组会变化

//数组排序
reverse()//颠倒数组
sort() //对数组进行排序 原排序有问题，只会比较第一个数组
所以完美写法是arr.sort(function(){return a-b//b-a}) 

//数组索引 找到返回索引号，找不到返回-1
indexOf('元素') //查找给定元素的第一个索引
lastIndexOf('元素') //查找给定元素的最后一个索引

//数组转换成字符串
toString() //把数组转换成字符串，逗号分个每一项
join('分隔符') 

//数组连接
concat() //连接两个或多个数组，不影响原数组，返回一个新的数组

//数组的截断
slice() //数组截取slice(start,end) 返回被截取项目的新数组
splice() //数组删除splice(第几个开始，要删除的数量) 返回被删除后的数组，原数组会变化
splice与slice目的基本相同，重点看splice
```

#### 包装

JS中基本数据类型是没有方法和属性的，但是String、Number、Boolean是比较特殊的，他们有自己对应的包装对象。

```
var str = 'andy'
console.log(srt.length)//照理来讲这里的str是String类型，不会有其方法，但是我们这里可以看到结果为4，这是因为JS对该基本数据类型进行了包装
```

这是由于js将该简单数据类型进行了包装，经历的过程如下：

1. 创建String类型的一个实例；// var s1 = new String("helloworld");
2. 在实例上调用指定方法；// var s2 = s1.substr(4);
3. 销毁这个实例；// s1 = null;

使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都是一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁，这就是复杂类型和基本数据类型最大的不同，生命周期不同。

#### 字符串对象常用方法

```
//根据字符串返回位置
indexOf('要找的字符',起始位置)
lastIndexOf()

//根据位置返回字符
charAt(index) //返回指定位置的字符
charCodeAt(index) //返回指定位置处字符的ASCII码
str[index] //获取指定位置字符 H5新增，ie8以上，与charAt等效

//合并字符串
concat(str1,str2,...) 

//截取字符串
substr(start,length) //从start位置开始（索引号）,length取个数
slice(start,end) //从start开始，截取到end，end取不到（索引号）
substring(start,end) //与slice相同，但不接收负数

//替换
replace('被替换的字符','替换为的字符')

//转换为数组
split('分隔符')

//大小写转换
toUpperCase() //大写
toLowerCase() //小写
```

### 6.复杂类型和简单类型

- 栈：由操作系统自动分配存放释放函数的参数值局部变量的值等。存放简单数据类型。
- 堆：一般由程序员分配释放，若程序员不释放，由垃圾回收机制回放。存放复杂数据类型。

简单类型又叫做**基本数据类型**或者**值类型**（就六大基本数据类型）

- 在存储变量中存储的是**值本身**
- 将值直接存放在栈中

复杂数据类型又叫做**引用类型**（通过new关键字创建的对象）

- 在存储变量中存储的是**地址**
- 先在栈中存放一个地址，之后该地址指向堆中的数据。

## JS高级

### 1.JS的组成

JS由ECMAScript（js语法）、DOM（页面文档对象模型）、BOM（浏览器对象模型）组成

DOM和BOM又统称为Web APIs，就是浏览器提供的一套操作浏览器功能和页面元素的API。

### 2.API

API（应用程序编程接口）是一些预先定义的函数，为程序员实现功能，不需要了解其中的源码和内部工作细节。就是用来实现某种功能的工具。

### 3.DOM

文档对象模型（DOM），是W3C推荐的处理可扩展标记语言的标准编程**接口**。

W3C已经定义了一系列的DOM接口，通过这些接口可以改变网页内容、结构和样式。

#### DOM树

![image-20210126174334180](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20210126174334180.png)

文档：一个页面就是一个文档，DOM中用document表示

元素：页面中所有标签都是元素，DOM中用element表示

节点：网页中的所有内容都是节点（标签、属性、文本、注释）,DOM中用node表示。

#### 获取元素

```
//根据id获取元素
document.getElementById()

//根据标签名获取元素
getElementsByTagName()//可以返回带有指定标签名的对象的集合，以伪数组形式存储。

//根据类名获取元素
getElementsByClassName()//返回集合

//querySelector('选择器') 根据选择器返回第一个元素对象
//querySelectorAll('选择器')	根据选择器返回所有元素
document.querySelector('.box')
document.querySelector('#box')
document.querySelector('li')
//当有上下层时
document.querySelector('.box').querySelectorAll('img')

//获取特殊元素（body、html）
document.body
document.documentELement
```

#### 注册事件

事件三要素：事件源、事件类型、事件处理程序

```
//1.事件被触发的对象 事件源
var btn = document.getElementById('btn')
//2.事件类型:如何触发，什么事件，如鼠标点击还是鼠标经过等
//3.事件处理程序，通过一个函数赋值的方式
btn.onclik = function(){}
```

#### 常见的鼠标事件

```
onclick 鼠标点击左键触发
onmouseover 鼠标经过
onmouseout 鼠标离开
onfocus 获得鼠标焦点
onblur 失去鼠标焦点
onmousemove 鼠标移动
onmouseup 鼠标弹起
onmousedown 鼠标按下
onscroll 移动滚动条
```

#### 操作DOM元素属性

```
//改变元素内容
element.innerText  //不识别html标签
element.innerHTML  //识别HTML标签，W3C标准

//修改元素属性
src、href、title等

//修改表单内容
value、type、disable等

//样式属性操作 
//样式名称要用驼峰命名法
//用className会覆盖原先的类名
//如果想保留原先的类名，我们可以用多类名选择器，如：this.className = 'first second'
element.style  //行内样式操作 少数修改可用
element.className  //类名样式操作（直接更改一个类名）
如 this.style.backgroundColor = 'purple'

```

#### 排他思想

如果有同一组元素，我们想要某一个元素实现某种样式，需要用到循环的排他思想。

当一些元素需要同一函数样式的时候，我们用foru循环。

```
//例：为所有按钮设置点击一下变成粉色背景事件，点击的按钮变颜色，其他不变。
//btns得到的是伪数组，里面每个元素是btn[i]
let btns = document.querySelectorAll('button')
for(let i=0;i<btns.length;i++){
	//for循环为每个按钮添加点击事件
	btns[i].onclick= function(){
		for(let j=0;j<btns.length;j++){
		//1.每一次循环都要重置所有的背景色
			btns[j].style.backgroundColor=''
		}
		//2.让当前元素背景为pink
		this.style.backgroundColor ='pink'
	}
}
```

排他思想

1. 所有元素全部清除样式（干掉其他）
2. 给当前元素设置样式（留下我自己）
3. 注意循序不能颠倒

#### 自定义属性的操作

自定义属性的目的：是为了保存并使用数据，有些数据可以保存在页面中，不用保存在数据库中。

```
//获取元素属性
element.属性 //主要获取内置属性值，元素本身自带的属性
element.getAttribute('属性') //主要获取自定义的属性

//设置属性值
element.属性 = '值' //设置内置属性值
element.setAttribute('属性','值')

//移除属性
element.removeAttribute('属性')
```

#### H5自定义属性

```
//H5规定自定义属性data-开头作为属性名并赋值
如<div data-index='1'></div>
或使用JS设置
element.setAtrribute('data.index',2)

//获取H5自定义属性
element.getAttribute('data-index') //兼容性获取
element.dataset.index或element.dataset['index'] //H5新增 需要ie11支持，dataset是一个集合里面放了所有以data开头的自定义属性，如果自定义属性里面存在多个-连接的单词，我们获取时采用驼峰命名法
如 div.getAttribute('data-list-name')
	div.dataset.listName;
	div.dataset['listName']
```

#### 节点操作

```
//父节点
node.parentNode

//子节点
parentNode.children //获取所有子节点
parentNode.firstElementChild //ie9以上支持，获取第一个子节点
parentNode.lastElementChild //ie9以上支持，获取最后一个子节点

//兄弟节点
node.nextElementSibling //ie9以上支持，返回当前元素下一个兄弟元素节点，没有返回null
node.previousElementSibling //ie9以上支持，返回当前元素上一个兄弟元素节点，没有返回null

//节点创建
document.createElement()

//添加节点
node.appendChild //该方法将一个节点添加到指定节点的子节点列表末尾，类似after伪元素
node.insertBefore(child,指定元素) 将一个节点添加到父节点的指定子节点前面
//例子：
let li = document.createElment('li')
let ul = document.querySelector('ul')
ul.appendChild(li);
ul.insertBefore(li,ul.children[0])

//删除节点
node.removeChild(child) //从DOM中删除一个节点，返回删除节点

//复制节点（克隆节点）
node.cloneNode() //返回调用该方法的节点的一个副本
例：var lili = ul.children[0].cloneNode()
		ul.appendChild(lili)
注意：如果cloneNode()括号内为true，则是深拷贝，复制标签及内容
		如果为false，则是浅拷贝，只克隆复制节点本身，不克隆里面的子节点
```

三种动态创建元素的差别

```
1.document.write()  //很少使用 直接将内容写入页面的内容流，但是文档流执行完毕，它会导致页面全部重绘
2.element.innerHTML //innerHTML创建多个元素效率更高（用数组形式拼接，不要用字符串拼接）,结构稍复杂
3.document.createElement() //创建多的元素效率低一点，但是结构更清晰

效率：innerHTML数组拼接>createElement>innerHTML字符串拼接

数组拼接案例：
let arr= []
for(var i=0;i<=100;i++){
	arr.push("<a href='javascript:;'></a>")
}
div.innerHTML = arr.join('')//join把数组传换成字符串再给HTML
```

### 4.事件高级

#### 注册事件的两种方法

- 传统方法：采用on开头的事件，具有唯一性，同一元素同一事件只能设置一个处理函数，后面会覆盖前面。
- 方法监听注册方法：`addEventListener()`，同一元素同一事件可以注册多个监听器。里面的事件类型是不用带on的。

#### 删除事件的两种方式（解绑事件）

- 传统方法:eventTarget.onclick = null
- 方法监听注册方式：eventTarget.removeEventListener(事件类型字符串,事件处理函数)

#### DOM事件流

事件发生时会在元素之间按特定的顺序传播，这个传播的过程叫做DOM事件流。

DOM事件流分为三阶段：捕获阶段——当前阶段——冒泡阶段

```
//当addEventListener第三个参数为true时，进行的是捕获阶段，返回结果Document——html——body——father——son
son.addEventListener('click',function(){alert(son)},true)
//当addEventListener第三个参数为false时，进行的是冒泡阶段，返回结果son——father——body——html——Document
son.addEventListener('click',function(){alert(son)},false)
```

- 实际开发中我们很少使用捕获，我们更关注冒泡
- 有些事件没有冒泡比如onblur,onfocus,onmouseenter,onmouseleave

#### 事件对象

`div.onclick = function(event){}`

`div.addEventListener('click',function(event){})`

- 这里的event就是事件对象，写到括号里当形参看
- 事件对象只有有了事件才会存在，系统自动生成，不需要我们传参
- 事件对象是我们事件一系列相关数据的集合，跟事件相关，比如鼠标点击里面就包含鼠标的相关信息，键盘事件就包含键盘信息。

##### 事件对象的常见属性和方法

```
e.target 返回触发事件对象
e.type  返回事件类型 如click，mouseover
e.stopPropagation() 阻止冒泡
e.preventDefault() 阻止默认事件 比如不让连接跳转
```

```
e.target 返回触发的事件对象
this 返回绑定的事件对象
<ul><li></li></ul>
ul.addEventListener('click',function(e){
	console.log(e.target)//li
	console.log(this)//ul
})
```

#### 事件委托

原理：将事件监听器设置在其父节点上，然后利用冒泡原理影响每个节点。

如:给ul注册点击事件，然后利用事件对象的target来找到当前点击的小li，因为点击小li会冒泡到ul上，ul有注册事件，就会触发事件监听。

作用：只操作了一次DOM，提高了程序的性能

```
<div >
		盒子    //点击盒子输出 box
		<button>按钮</button>//点击按钮输出 btn box
	</div>
```

```
let box = document.querySelector('div')
	let btn = document.querySelector('button')
	box.addEventListener('click',function(){
		console.log('box')
	})
	btn.addEventListener('click',function(){
		console.log('btn')
	})
```

#### 其他鼠标常用事件

##### 禁止鼠标右键菜单

contextmenu 主要控制右键菜单 

e.preventDefault() 阻止默认状态

`document.addEventListener('contextmenu',function(e){`e.preventDefault()`})`

##### 禁止鼠标选中

selectstart 开始选中

`document.addEventListener('selectstart',function(e){e.preventDefault()})`

#### 鼠标事件对象

```
e.clientX  返回鼠标相对于浏览器窗口可视区对的x坐标
e.clientY  返回鼠标相对于浏览器窗口可视区对的y坐标
e.pageX   返回鼠标相对于文档页面的X坐标 ie9支持
e.pageY   返回鼠标相对于文档页面的y坐标 ie9支持
e.screenX  返回鼠标相对于电脑屏幕的x坐标
e.screenY  返回鼠标相对于电脑屏幕的y坐标
```

#### 常用键盘事件

```
onkeyup  某个键盘按键松开时触发 不区分大小写
onkeydown 某个键盘按键被按下时触发 不区分大小写
onkeypress  某个键盘按键被按下时触发，但不识别功能键，如shift\ctrl\箭头等，区分大小写
```

#### 键盘事件对象

```
keyCode  返回该键的ASCII值
```

## BOM浏览器对象模型

### 1.什么是BOM

BOM即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是window。

BOM由一系列对象构成，且对象也有很多属性和方法，BOM缺乏标准，JS标准组织是ECMA，DOM标准是W3C,BOM最初是网景浏览器标准的一部分。

| DOM                  | BOM                                        |
| -------------------- | ------------------------------------------ |
| 文档对象模型         | 浏览器对象模型                             |
| 把文档当作一个对象看 | 把浏览器当作一个对象看                     |
| 顶级对象是document   | 顶级对象是window                           |
| 主要的是操作页面元素 | 主要的是浏览器窗口交互的一些对象           |
| DOM是W3C标准规范     | 是浏览器厂商在各自浏览器上定义的，兼容性差 |

### 2.BOM的构成

window对象是浏览器的顶级对象，具有双重角色。

- 1.是js访问浏览器窗口的一个接口
- 2.是一个全局对象。定义在全局作用域中的变量、函数都会变成window对象的属性和方法。

在调用时可以省略window，如alert(),prompt()都属于window对象方法。

### 3.页面加载事件

**当文档内容完全加载完成就会触发该事件**

```
//传统
window.onload = function(){}
//事件监听
window.addEventListener("load",function(){})
```

**注意**：

- 有了页面加载事件就可以把js代码写到页面元素上方，因为onload是等页面元素完全加载完在执行处理函数。
- window.load传统注册事件方式只能写一次，如果有多个，以最后一个为准。
- 使用事件监听没有限制

```
window.addEventListener('DDOMContLoaded',function(){})
```

DOMContLoaded事件触发时，仅当DOM加载完成，不包括样式，图片，flash等，ie9以上支持。

使用场景:当页面的图片很多时，从用户访问到onload触发可能需要较长的事件，交互效果就不能实现，必然影响用户体验，此时用DOMContLoaded更合适。

### 4.调整窗口大小事件

当浏览器窗口大小发生变化就会触发。

```
window.onresize = function(){}

window.addEventListener("resize",function(){})

```

**注意**：

- 1.只要窗口大小发生像素变化，就会触发这个事件。
- 2.我们经常利用这个事件完成响应式布局。window.innerWidth 当前屏幕的亮度

### 5.定时器

定时器有两种，setTimeout(),setInterval()

```
setTimeout() 延时到了，就调用一次函数，总共一次
setInterval() 每隔这个时间，就去调用一次函数，重复调用


window.setTimeout(回调函数,[延时的毫秒数]);
//停止setTimeout()定时器
window.clearTimeout(定时器的名字)

window.setInterval(回调函数,[延迟的毫秒数])

```

### 6.过几秒发送短信案例

```
<body>
	手机号：<input type="text"><button>发送</button>
</body>
<script>
	let btn = document.querySelector('button');
	let s=10
	btn.addEventListener("click",function(){
		this.disabled=true;
		let time = setInterval(function(){
			if(s>=0){
				btn.innerHTML="请稍等"+s+'秒再尝试'
				s--
			}else{
				clearInterval(true);
				btn.innerHTML='发送'
				btn.disabled = false;
				s=10
			}
		},1000)
	})
</script>
```

### 7.this指向

this指向在函数定义时是不确定的，只有函数执行的时候才能确定this到底指向谁，一般情况下，this最终指向那个调用它的对象

```
1.全局作用域或普通函数中的this指向全局对象window（定时器里的this也指向window）
console.log(this)
function fn(){console.log(this)}  fn()
setTimeout(function(){console.log(this)},1000)

2.方法调用中谁调用了this就指向了谁
let o={sayHi:function(){console.log(this)}}  o.sayHi()//this指向了o
btn.addEventListener('click',function(){console.log(this)}) //this指向了btn

3.构造函数中this指向构造函数实例
function Fun(){console.log(this)}  let fun=new Fn() //this指向了fun这个实例对象
```

### 8.JS执行机制

- JS是单线程语言
- 为了解决单线程的问题，HTML5提出Web Worker标准，允许JS脚本创建多个线程，于是出现了异步和同步
- 同步：前一个任务执行完再进行下一个任务，执行顺序和任务的排列顺序一致
- 异步：在做一个任务时可能需要花很多时间，所以可以在做这个任务的同时，去处理其他任务。

#### 同步和异步

同步任务：同步任务都在主线程上执行，形成一个执行栈。

异步任务：JS的异步任务是通过回调函数实现的，一般而言异步有以下三种类型

- 普通事件，如click，resize等
- 资源加载，如load，error等
- 定时器，包括setInterval、setTimeout等

### 9.location对象

window对象给我们提供了一个location属性用于**获取或设置窗体的URL**，并且可以解析URL，因为这个属性返回的是一个对象，所以我们将这个属性称为location对象。

#### URL

统一资源定位符

一般格式:protocol://host[:port]/path/[？query]#fragment

```
http://www.itcast.cn/index.html?name=andy&age=18#link

protocol:通信协议，常用的http，ftp等
host:主机（域名）www.itcast.com
port:端口号 可选，省略时使用方案默认端口，如http默认端口为80
path:路径 由多个或者零个'/'符号隔开的字符串，一般用来表示主机上的一个目录或文件地址
queyr:参数 以键值对的形式，通过&符号隔开
fragment:片段 #后面内容，常见于链接锚点
```

#### location对象的属性

```
location.href   获取或者设置整个URL
location.host   返回主机（域名）
location.port   返回端口号，如果未写返回字符串
location.pathname  返回路径
location.search  返回参数
location.hash  返回片段， #后面的内容
```

#### location对象的方法

location.assign() 跟href一样，可以跳转页面，记录历史，有后退功能

location.replace() 替换当前页面，因为不记录历史，所以没有后退功能

location.reload()  重新加载页面，相当于刷新按钮或者f5，如果参数为true，强制刷新

### 10.navigator对象

navigator浏览器包含有关浏览器的信息，我们最常使用userAyent，该属性可以返回由客户机发送服务器的user-agent头部的值。可以判断用户哪个终端打开页面，实现跳转。

### 11.history对象

window对象给我们提供了一个history对象，与浏览器历史记录进行交互。

back() 后退功能

forward()  前进功能

go(参数)  前进后退功能，参数如果是1前进一个页面，如果是-1后退一个页面

## PC端网页特效

### 1.元素偏移量offset系列

offset翻译过来就是偏移量，我们使用offset系列相关属性可以动态的得到该元素的位置（偏移量），大小等。

- 获得元素距离带有**定位**元素的位置
- 获得元素自身的大小（宽度高度）
- 注意：返回的数值都不带单位

```
element.parentNode  返回的是最近一级的父亲，不管有没有定位
element.offsetParent  返回作为该元素带有定位父级元素，如果父级都没有定位则返回body
element.offsetTop  返回元素相对带有定位父元素上方的偏移
element.offsetLeft 返回元素相对带有定位父元素左边框的偏移
element.offsetWidth 返回自身包括padding、边框、内容区的宽度，返回数值不带单位
element.offsetHeight 返回自身包括padding、边框内容，内容区高度，返回值不带单位
```

### 2.offset与style的区别

| offset                               | style                                       |
| ------------------------------------ | ------------------------------------------- |
| offset可以得到任意样式表中的样式值   | style只能得到行内样式表中的样式值           |
| offset可以获得的数值是没有单位的     | style.width获得的是带有单位的字符串         |
| offsetWidth包含padding+border+width  | style.width获得不包括padding和border的值    |
| 所以想要获取元素大小位置offset更合适 | style.width是可读写属性，可以获取也可以赋值 |
|                                      | 所以给元素更改值需要style改变               |

### 3.元素可视区client系列

client翻译过来是客户端，我们使用client相关属性来获取元素可视区的相关信息，通过client系列的相关属性可以动态的得到该元素的边框大小和元素边框大小。

```
element.clientTop  返回元素上边框大小
elemnet.clientLeft  返回元素左边框大小
element.clientWidth  返回自身包括padding、内容区宽度，不含边框，返回数值不带单位
element.clientHeight 返回自身包括padding、内容区高度，不含边框，返回数值不带单位
```

### 4.立即执行函数

立即执行函数，不需要调用，能够立即执行的函数

`(function(){})()`或者`(function(){}())`

- 第二个小括号可以看做是回调函数(function(a){console.log(a)(1))

立即执行函数最大作用就是独立**创建**了一个**作用域**，里面的所有的变量都是局部变量，**不会有命名冲突问题**。

### 5.元素滚动scroll系列

scroll翻译过来是滚动，我们使用scroll系列的相关属性可以动态的得到该元素的大小，滚动距离等。

```
element.scrollTop  返回被卷去的上侧距离，返回数值不带单位
element.scrollLeft  返回被卷去的左侧距离，返回数值不带单位
element.scrollWidth  返回自身实际的宽度包含padding，不含边距，返回数值不带单位
element.scrollHeight  返回被卷去的高度，包含padding，不含边距，返回数值不带单位
```

#### 页面被卷去头部兼容性解决方案

1.声明了DTD，使用document.documentElement.scrollTop

2.未声明DTD，使用document.body.scrollTop

3.新方法 window.pageYOffset和window.pageXOffset,ie9开始支持

### 6.scroll和client差别

scroll的实际高度指的是内容高度

client的实际高度指的是盒子高度

元素被卷去头部是element.scrollTop,页面被卷去头部是window.pageYOffset

### 7.三大系列的对比

offset系列包括边框，其他两个不包括

client返回盒子内容的宽度和高度（超出部分不算）

scroll返回的是内容实际高度和宽度（超出部分也会被算在内）

主要用法：

- offset系列经常用于获取**元素的位置** offsetLeft offsetTop
- client 经常用于获取**元素大小** clientWidth clientHeight
- scroll 经常用于获取**滚动距离** scrollTop scrollLeft
- 页面滚动的距离是通过window.pageXOffset获得

### 8.mouseover和mouseenter区别

mouseenter事件

- 当鼠标移动到元素上时就会触发mouseenter事件
- 类似mouseover
- 两者差别：mouseover经过自身盒子会触发，经过子盒子也会触发，mouseenter只会经过自身盒子时触发，mouseenter不会冒泡，与之搭配的mouseleave同样不会冒泡。

### 9.动画函数封装

#### 动画实现原理

核心原理：通过定时器对Interval不断移动盒子位置

实现步骤：

1. 获得盒子当前位置
2. 让盒子在当前位置上加1个移动距离
3. 利用定时器不断重复这个操作
4. 加上一个结束定时器的条件
5. 注意此元素需要添加定位，才能使用element.setyle.left

```
function animate(obj,target){
		clearInterval(obj.timer)//清除之前的定时器，让每次只有一个定时器可以允许
		obj.timer = setInterval(function(){
			if(obj.offsetLeft >= target){
				clearInterval(obj.timer)
			}else{
				obj.style.left = obj.offsetLeft + 1 +'px'
			}
		},30)
	}
```

#### 缓动效果原理

缓动动画就是让元素运动速度有变化，最常见的时让速度慢慢下来

思路：

1. 让盒子每次移动的距离变小，速度就慢下来
2. 核心算法（目标值-现在的位置）/10作为每次移动的距离步长
3. 停止条件：让当前盒子位置等于目标位置就停止定时器
4. 步长值取整
5. 动画函数添加回调函数

### 10.手动调用事件

手动调用事件，即上面写好事件，通过定时器可以自动执行该事件

```
let timer = setInterval(function(){
	arrow.click()
},2000)
```

### 11.节流阀

节流阀的目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发。

核心思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数。

```
开始设置一个变量 var flag = true
if(flag){flag=false;do something}关闭水龙头
利用回调函数，动画执行完毕,flag=true 打开水龙头
```

### 12.返回顶部

滚动窗口至文档中特定位置

window.scroll(x,y)

## 移动端网页特效

### 1.触屏事件

#### 触屏事件概述

移动端浏览器兼容性较好，我们不需要考虑以前的js兼容问题，可以放心使用原生JS书写效果，但移动端也有自己独特的地方，比如说触屏事件touch()也称触摸事件,android和ios都有。

```
touchstart 手指触摸到一个DOM元素时触发
touchmove 手指再一个DOM元素上滑动时触发
touchend 手指从一个DOM元素上移开时触发
```

#### 触摸事件对象（TouchEvent）

TouchEvent是一类描述手指在触摸平面（触摸屏，触摸板等）的状态变化的事件。这类事件用于描述一个或多个触点，使开发者可以检测触点的移动，触点的增加和减少等。

touchstart、touchmove、touchend三个事件都有各自的事件对象

触摸事件对象重点我们看三个常见对象列表

- touches 正在触摸屏幕的所有手指的列表
- targetTouches 正在触摸当前DOM元素上的手指的一个列表，手指离开了没有
- changeTouches 手指状态发生了改变的列表，从无到有，从有到无变化，手指离开仍有

因为我们平时都是给元素注册触摸事件，所以重点记住targetTouches

```
div.addEventListener('touchstart',function(e){
	console.log(e.targetTouches[0])//tagetTouches[0]可以得到正在触摸dom元素的第一个手指的相关信息，比如手指坐标等。
})
```

### 2.移动端拖动元素

1. touchstart、touchmove、touchend可以实现拖动元素
2. 但是拖动元素需要当前手指的坐标值，我们可以使用targetTouches[0]里面的pageX和pageY
3. 移动端拖动的原理：手指移动中，计算出手指移动的距离，然后用盒子原本的位置+手指移动的位置
4. 手指移动的距离：手指滑动中的位置减去手指刚开始触摸到的位置

拖动元素三部曲：

1. 触摸元素touchstart：获取手指初始坐标，同时获取盒子原来的位置
2. 移动手指touchmove：计算手指的滑动距离，并且移动盒子
3. 离开手指touchend
4. 注意：手指的移动也会触发滚动屏幕所以这里要组织默认的屏幕滚动e.preventDefault()

```
let div=document.querySelector("div")
let startX = 0
let startY = 0;
let x =0 
let y = 0;
div.addEventListener('touchstart',function(e){
	//获得手指初始坐标
	startX = e.targetTouch[0].pageX;
	startY = e.targetTouch[0].pageY;
	//获得盒子原本的坐标
	x=this.offsetLeft;
	y = this.offsetTop;
})
div.addEventListener('touchmove',function(e){
	//获得手指移动距离
	let moveX = e.targetTouches[0].pageX-startX;
	let moveY = e.targetTouches[0].pageY-startY;
	this.style.left = moveX+x+'px';
	this.style.top = moveY+y+'px'
})
```

### 3.classList属性

classList属性是html5新增的一个属性，返回元素的类名。但是ie10以上支持。

该元素用于在元素中添加，移除，以及切换css类

```
//添加类 是在原来的类名后面再增加新类名
element.classList.add('类名')
//移除类
element.classList.remove('类名')
//切换类 覆盖原来的类名，没有则添加
element.classList.toggle('类名')
```

### 4.移动端click延迟解决方案

移动端click事件会有300ms的延时，原因是移动端屏幕双击会缩放页面。

解决方案：

1. 禁用缩放，浏览器禁用默认的双击点击缩放行为并且去掉了300ms的点击延迟。

   ```
   <meta name="viewport" content="user.scale=no">
   ```

2. 利用touch事件自己封装这个事件解决300ms延迟

   原理：

   1. 当我们手指触摸屏幕，记录当前触摸时间。
   2. 当我们手指离开屏幕，用离开的时间减去触摸的时间。
   3. 如果时间小于150ms，并且没有滑动屏幕，那我们就定义为点击

3. fastclick.js插件

### 5.本地存储

本地存储特性：

1. 数据存储在用户浏览器中
2. 设置，读取方便，甚至页面刷新不丢失数据
3. 容量较大，sessionStorage约5m，localStorage约20m
4. 只能存储字符串，可以将对象JSON.stringify()将数组转为字符串

#### window.sessionStorage

- 生命周期为关闭浏览器窗口
- 在同一个窗口下数据可以共享
- 以键值对的形式存储使用

```
存储数据：sessionStorage.setItem(key,value)
获取数据：sessionStorage.getItem(key)
删除数据：sessionStorage.removeItem(key)
删除所有数据：sessionStorage.clear()
```

#### window.localStorage

- 生命周期永久生效，除非手动删除，否则关闭页面也会存在
- 可以多窗口（页面）共享（同一个浏览器可以共享）
- 以键值对的 形式存储使用

```
存储数据：localStorage.setItem(key,value)
获取数据：localStorage.getItem(key)
删除数据：localStorage.removeItem(key)
删除所有数据：localStorage.clear()
```

## JS面向对象编程

面向对象的思维特点：

- 抽取（抽象）对象共用的属性和行为组织（封装）成一个类（模板）
- 对类进行实例化，获得类的对象

### 1.类 class

es6中新增了类的概念，可以使用class关键字声明一个类，之后以这个类来实例化对象

#### 创建类

`class Name {}`

#### 创建实例

`let xx=new name()`

注意：类必须用new来实例化对象

#### 类constructor构造函数

counstrucyor()方法是类的构造函数（默认方法），用于**传递参数**，返回实例对象，通过new命令生成对象实例时，自动调用该方法。如果没有显示定义，类内部会给我们自动创建一个constructor()

#### 类添加方法

- 类里面所有的**函数**都**不需要function**
- 多个函数之间**不需要逗号**分开

```
class Star{
	constructor(uname,age){
		this.uname = uname;
		this.age = age;
	} //不需要逗号
	sing(song){
		console.log(this.uname+song)
	}
}
//利用类创建对象 new
let ldh = new Star('刘德华',18)
ldh.sing('冰雨')
```

#### 类的继承

```
class Father {//父类
	money(){console.log(100)}
}
class Son extends Father{//子类继承父类
}
let son = new Son()
son.money() //子类可以继承父类的属性和方法
```

- 在继承中，如果实例化子类输出了一个方法，先看子类有没有这个方法，如果有就先执行子类。
- 如果子类没有，就去查找父类有没有这个方法，如果有就执行父类的这个方法。

##### super关键字

super关键字用于访问和调用对象父类上的函数。可以调用父类的构造函数，也可以调用父类的普通函数。 

```
class Father {
	//constructor()方法是类的构造函数，用于传递参数返回实例对象，通过new命令生成实例对象的时候，自动调用该方法。
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	sum(){
		console.log(this.x+this.y)
	}
}

class Son extends Father {
	constructor(x,y){
		this.x=x;
		this.y=y
	}
}

let son=new Son(1,2)//如果直接这样使用是会报错的，因为1，2传递到的是Son中的constructor(x,y)，传递不到Father中，要添加super关键字
son.sum()



class Son extends Father {
	constructor(x,y){
		super(x,y)
		this.x=x;
		this.y=y
	}
}

let son=new Son(1,2)//这样会将数据传递到father里的x，y
son.sum()
```

- 子类在构造函数中使用super，必须放在this前面（必须先调用父类的构造方法，再使用子类的构造方法）
- 类里面的this指向问题：constructor里面的this指向实例化对象，方法的this指向该方法的调用者

```
class Father{
	say(){
		return "我是爸爸"
	}
}
class Son extends Father{
	say(){
		console.log(super.say()+"的儿子")
	}
}
let son = new Son();
son.say()
```

静态对象：在构造函数本身上添加的成员叫静态成员，只能由构造函数本身访问。

实例成员：在构造函数内部创建的对象成员称为实例成员，只能由实例化的对象来访问，通过this添加的成员。

##### 构造函数的问题

构造函数很好用，但是会存在浪费内存的问题。内存存储的问题，如果是简单数据类型会直接赋值，如果是复杂数据类型就会开辟新的空间。

所以我们可以选择将一些不变的方法直接放入prototype上，这样就可以对所有的对象的实例，共享这些方法。

##### 构造函数原型prototype

构造函数通过原型分配的函数时所有对象所共享的。

JS规定，每一个构造函数都有一个prototype属性，指向另一个对象。注意这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

总结：

- 原型是什么？ 一个对象，我们也成为prototype为原型对象
- 原型的作用？  共享方法

所以我们一般情况下，我们的公共属性定义到构造函数里面，公共的方法我们放到原型对象上。

##### 对象原型_ _ proto_ _

对象都会有一个属性`__proto__`指向构造函数的prototype原型对象，之所以我们对象可以使用构造函数prototype原型对象的属性和方法，就是因为对象有`__proto__`的存在

`ldh.__proto__ == star.prototype`两者相等

方法的查找规则：首先看ldh对象身上是否有sing方法，如果有就执行这个对象上的sing方法，如果没有，因为有`__proto__`的存在，就去构造函数原型对象prototype身上去查找sing这个方法。

##### constructor构造函数

对象原型`__proto__`和构造函数的原型对象`prototype`里面都有一个属性constructor，constructor我们称为构造函数，因为它指回构造函数本身。

constructor主要用于记录该对象引用了哪些构造函数，它可以让原型对象重新指向原来的构造函数。

##### 原型链

![](F:\记录\img\原型链.png)

#### ES6中的类和对象三个注意点

1. 在ES6中类没有变量提升，必须先定义类，才能通过类实例化对象
2. 类里面的共有属性和方法一定要加this使用
3. 类里面的this指向问题：constructor里面的this指向实例化对象，方法的this指向该方法的调用者

#### insertAdjacentHTML方法

1. 创建新元素
2. 将该元素追加到父元素里面

以前做法：动态创建元素createElement，但是元素里面的内容较多，需要innerHTML赋值，再appendChild追加到父元素里面

现在做法：利用insertAdjacentHTML()可以把字符串格式元素添加到父元素里。

appendChild方法不支持追加字符串的子元素，insertAdjacentHTML支持追加字符串的元素。

#### new构造函数在执行时做的四件事

1. 在内存中创建一个新的空对象
2. 让this指向这个新对象
3. 执行构造函数里面的代码，给这个新对象添加属性和方法
4. 返回这个新对象（所以构造函数不需要return）

JS构造函数中可以添加一些成员，可以在构造函数本身上添加，也可以在构造函数内部的this上添加，通过这两种方法添加的成员，就分别称为静态成员和实例成员。

#### JS的成员查找机制

1. 当访问一个对象的属性或方法时，首先查找这个对象本身有没有该属性
2. 如果没有就查找它的原型(也就是`__proto__`指向的prototype原型对象)
3. 如果还没有则查找原型对象的原型(Object的原型对象)
4. 以此类推一直找到Object为止(null)
5. `__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线

#### 原型对象this指向

1. 在构造函数中，里面this指向的是实例对象 ldh
2. 在原型对象函数里面的this指向的是实例对象 ldh

#### 扩展内置对象

可以通过原型对象，对原来的内置对象进行扩展自身定义的方法。

```
//给数组添加自定义偶数求和的功能
Array.prototype.sum = function(){
	let sum = 0;
	for(let i=0;i<this.length;i++){
		sum+=this[i]
	}
	return sum
}

let arr=[1,2,3]
arr.sum()
```

注意：数组和字符串内置对象不能给原型对象覆盖操作Array.prototype={},只能是Array.prototype.xxx=function(){}的方式

#### ES5的继承

ES6之前是没有extends继承，我们需要通过构造函数+原型对象模拟继承，被称为组合继承

##### call()

调用这个函数，可以修改函数运行时的this指向

```
function fn(x,y){
	console.log(x+y);
	console.log(this)
}
let o = {name="andy"}
fn.call(o,1,2)
//第一个参数：当前调用的函数this的指向对象
//2，3，4，5等参数，传入的参数
```

```
//借用构造函数继承父类属性
function Father(uname,age){
	this.uname=uname;//指向父构造函数
	this.age=age
}
function Son(uname,age){
	Father.call(this,uname,age)//这里的this指向子构造函数
}
let son =new Son('刘德华',18)
```

### 2.ES5的新增方法

#### 1.数组方法

迭代（遍历方法）：forEach()、map()(与forEach方法相似)、filter()、some()、every()(与some方法相似)

##### forEach()

`array.forEach(function(currentValue,index,arr))`

currentValue:数组当前值

index:数组当前索引

arr:数组对象本身

```
let arr = [1,2,3]
let sum = 0;
arr.forEach(function(value,index,array){
	console.log('每个数组元素'+value)
	console.log("每个数组元素的索引号"+index)
	console.log("数组本身"+array)
	sum+=value
})
```

##### filter()

`array.filter(function(currentValue,index,arr){})`

filter方法创建了一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素，主要用于**筛选数组**。他直接返回一个新数组

```
let arr=[12,66,4,88]
let newArr = arr.filter(function(value,index){
	return value>=20
})
console.log(newArr)
```

##### some()

some方法用于检测数组中的元素是否满足指定条件，通俗点查找数组中是否由满足条件的元素

注意：它的返回值是布尔值，如果查找到该元素就会返回true，如果查找不到就返回false

如果找到第一个满足条件的元素，则终止循环，不再继续查找。

```
let arr=[10,30,4]
let flag = arr.some(function(value){
	return value>=20
})
console.log(flag) //true

let arr1=['pink','red','green']
let flag1=arr1.some(function(value){
	return value=='pink'
})
console.log(flag1)//true
```

filter 查找满足条件的元素，返回数组，把满足条件的元素返回

some 查找满足条件的元素是否存在，返回一个布尔值，如果查找到第一个满足条件的元素就会终止循环

#### 2.字符串方法

##### trim()

trim方法会从一个字符串的两端删除空白字符

str.trim()

trim()方法并不影响原字符本身，它返回的是一个新的字符串

#### 3.对象方法

##### Object.keys()

该方法用于获取对象自身所有属性

Object.keys(obj)

想过类似于for...in...

返回一个由属性名组成的数组

##### Object.defineProperty()

定义对象中新属性或修改原有属性

Object,defineProperty(obj,prop,descriptor)

obj:目标对象

prop:需定义或修改的属性名字

descriptor:目标属性所拥有的特性

## 函数进阶

### 1.函数的定义方式

1. 函数声明方式function关键字（命名函数）function fn(){}
2. 函数表达式(匿名函数) let fun = function(){}
3. new Function(),Funtion里面的参数必须是字符串格式。

### 2.函数的调用方式

|              | 使用           | 声明                           |
| ------------ | -------------- | ------------------------------ |
| 普通函数     | fn(),fn.call() | function fn(){}                |
| 对象的方法   | o.sayHi()      | let o={sayHi:function(){}}     |
| 构造函数     | new Star()     | function Star(){}              |
| 绑定事件函数 | 触发条件       | btn.onclick=function(){}       |
| 定时器函数   | 时间触发       | setInterval(function(){},1000) |
| 立即执行函数 | 自动调用       | (function(){})()               |

### 3.this的指向

| 调用方式         | this指向       |
| ---------------- | -------------- |
| 普通函数调用     | window         |
| 构造函数调用     | 实例对象       |
| 对象方法调用     | 该方法所属对象 |
| 事件绑定方法调用 | 绑定事件对象   |
| 定时器函数       | window         |
| 立即执行函数     | window         |

#### 改变函数内部this指向

常用的由bind()、call()、apply()

1. call()方法调用一个对象，简单理解为调用函数的方式，但他可以改变函数的this指向（可以实现继承）`fun.call(thisArg,arg1,arg2...)`
2. apply()方法调用一个函数。`fun.apply(thisArg,[argsArray])`thisArg:在函数运行时指定的this值 argsArray:传递的值，必须包括在数组里。该方法返回值就是函数的返回值，因为它就是调用函数。
3. bind()方法不会调用函数，但是能改变函数内部this指向。fun.bind(thisArg,arg1,arg2...)返回值由指定的this值和初始化参考改造的原数组拷贝。

应用场景

- call继承做继承
- apply经常跟数组有关，比如借助于数学对象实现数组最大值最小值
- bind不调用函数，但是还想改变this指向。比如改变定时器内部的this指向

### 4.严格模式

严格模式可以为整个脚本或者个别函数中。

1. 为脚本开启严格模式

   需要在所有语句前面放一个特定语句`"use strict"`或

2. 为函数开启严格模式

   需要把`"use strict"`声明放到函数体所有语句前

### 5.深拷贝和浅拷贝

浅拷贝：对于字符串类型，浅拷贝是对值的复制，对于对象来说，浅拷贝是对对象地址的复制, 也就是拷贝的结果是两个对象指向同一个地址。

- ‘=’赋值
- Object.assign()

深拷贝：深拷贝开辟一个新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

- 手动复制
- JSON做字符串转换。用JSON.stringify把对象转成字符串，再用JSON.parse把字符串转成新的对象。
- 递归拷贝
- Object.create方法
- jquery

### 6.正则表达

正则表达式（Regular Expression）是用于匹配字符串中字符组合的模式

在JS中，正则表达式也是对象

#### 创建正则表达式

JS中由两种方法创建正则表达式

1. 通过调用RegExp对象的构造函数创建

   `let 变量名 = new RegExp(/表达式/)`

2. 通过字面量创建

   `let 变量名 = /表达式/`

#### 测试正则表达式 test()

test()正则对象方法，用于检测字符串是否符合该规则，该对象会返回true或false,其参数是测试字符串

regxObj.test(str)

regexObj是正则表达式，str是文本

#### 正则表达式的组成

1. 边界符 正则表达式的边界符(位置符)用来提示字符所在位置

   ^ 表示匹配行首的文本

   $ 表示匹配行尾的文本

   let rg = /^abc/ 表示必须以abc为开头

   let rg = /^abc$/ 表示必须是abc这个字符串

2. 字符类 [ ] 表示有一系列字符可供选择，只要匹配其中之一就行

   let rg = /[abc]/ 表示只要包含有a或者包含有b或者包含有c

   let rg = /^[abc]$/ 表示三选一，只有是a或只有是b或只有是c

3. 范围符 -

   let rg = /^[a-z]$/ 表示a-z中的任意一个

   let rg = /^[a-zA-Z]$/ 表示26个英文字母任意一个，不管大小写

4. 取反符 当^在括号内部时代表取反

   let rg = /^[`^`a-zA-Z0-9]$/ 表示不能有a-z、A-Z、0-9

5. 量词 用来设定某个模式出现的次数

   `*` 重复零次或更多次 相当于>=0

   let rg = /^a*$/ 表示a可以出现0到很多次

   `+` 重复一次或更多次 相当于>=1

   let rg = /^a+$/ 表示a可以出现一次或多次

   `?` 重复零次或一次 

   let rg = /^a?$/ 表示a可以出现零次或一次

   {n} 重复n次

   let rg = /^a{3}$/ 表示让a重复3次才返回true

   {n,} 重复n次或多次

   let rg = /^a{3,}$/ 表示让a重复3次及以上

   {n,m} 重复n次到m次

   let rg = /^a{3,16}$/ 表示让a重复3到16次

6. 预定义类 指的是某些常见模式的简写

   \d 匹配0-9之间的任一数字，相当于[0-9]

   \D 匹配0-9以外的字符，相当于`[^0-9]`

   \w 匹配任意的字母、下划线和数字

   \W 除所有字母、数字、下划线以外字符

   \s 匹配空格（包括换行符、制表符、空格符等），相当于[\t\r\n\v\f]

   \S 匹配非空格

#### 正则表达式的替换

##### replace替换

replace()方法可以实现替换字符串操作，用来替换的参数可以是一个字符也可以是一个正则表达式

`StringObject.replace(regexp/substar,replacement)`

第一个参数：被替换的正则表达式或字符串

第二个参数：替换为的字符串

##### 正则表达式的参数

/表达式/[switch]

switch也称修饰符，按照什么样的模式来匹配，有三种值。

- g 全局匹配
- i 忽略大小写
- gi 全局匹配并且忽略大小写

## ES6新增

### 1.let

1. let声明的变量只在所处于的块级作用域有效，由{}包裹的为块级，es6之前没有

   作用：1.在业务逻辑复杂的时候，防止内层变量覆盖外层变量

   ​			2.防止循环变量变成全局变量

2. 不存在变量提升

3. 暂时性死区

   ```
   var num = 20;
   if(true){
   	num = 'abc';
   	let num   //会报错
   }
   ```

### 2.const

1. 具有块级作用域

2. 常量赋值后，值不能修改

   基本类型一旦赋值，值不能修改

   复杂类型不能重新赋值，但是可以修改其内部的值，即地址不能改变，但是地址指向的堆里的值可以改变

3. 声明常量必须赋值

   ```
   const PI  //报错
   const PI = 3.14
   ```

4. 不存在变量提升

### 3.解构赋值

#### 数组解构

```
let [a,b,c]=[1,2,3]

let [bar,foo] = [1] //bar=1 foo=undefined
```

#### 对象解构

```
写法1：
let person = {name:'zhnagsan',age:20}
let {name,age} = person
console.log(name)//'zhangsan'
console.log(age)//age

写法2：支持变量的名字于对象中属性的名字不一致
let person = {name:'zhangsan',age:19}
let {name:myName,age:myAge}=person
console.log(name)//'zahngsan'
console.log(age)//19
```

### 4.箭头函数

```
function sum(num1,num2){
	return num1+num2
}

const sum =(num1,num2)=>num1+num2
```

注意：箭头函数不绑定this关键字，箭头函数中的this指向的是定义位置的上下文this

```
var obj = {
	age:20,
	say:()=>{
		//如果用传统function，this指向的是obj这个对象
		//在箭头函数中，是没有绑定this关键字的，要看上级的this指向，obj是一个对象，不能产生作用域，所以箭头函数被定义在了全局作用域下，window中没有age这个属性，所以报错。
		console.log(this.age) 
	}
}
obj.say()//undefined
```

### 5.剩余参数

剩余参数语法允许我们将一个不定数量的参数表示为一个数组

```
function sum (first,...args){
	console.log(first)//10
	console.log(args)[20,30]
}
sum(10,20,30)
```

#### 剩余参数和解构的配合使用

```
let student = ['window','zhangsan','wangwu']
let [s1,...s2]=student
console.log(s1)//'window'
console.log(s2)//['zhangsan','wangwu']
```

### 6.ES6内置对象扩展

#### 数组扩展

##### 扩展运算符（展开语法）

扩展运算符可以将**数组**或**对象**转换成用逗号分隔的**参数序列**

```
let arry = [1,2,3]
...arry //1,2,3 去掉括号后变成用逗号分开的参数序列
console.log(...arry)//1 2 3 没有逗号，参数序列中的逗号会被当作参数分隔符被去掉
```

扩展运算符可以应用于**合并数组**

```
方法1：
let ary1 = [1,2,3]
let ary2 = [4,5,6]
let ary3 = [...ary1,...ary2]

方法2：
ary1.push(...ary2)
```

扩展运算符可以将**伪数组**或**可遍历对象**转换为**真正的数组**

```
let oDives = document.getElementByTagName('div')
oDives = [...odives]
```

##### Array.from()

可以将伪（类）数组或可遍历对象转换为真正的数组

```
let arr = {
	'0':'a',
	'1':'b',
	'2':'c',
	length:3
}
let arr2 = Array.from(arr)//['a','b','c']

该方法还可以接收第二参数，类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组
let arr = {
	'0':1,
	'1':2,
	length:2
}
let arr2 = Array.from(arr,item=>item*2)//[2,4]

```

##### find()

用于找出第一个符合条件的数组成员，如果没有找到返回undefiened

```
let arr = [{
	id:1,
	name:'张三'
},{
	id:2,
	name:'王五'
}]
let target = arr.find(item=>item.id ==2)
console.log(target)//{id:2,name:'王五'}
```

##### findIndex()

用于找出第一个符合条件的数组成员的位置，如果没有返回-1

```
let arr = [1,5,10,11,15]
let index=arr.findIndex(item=>item>5)
console.log(index)//2
```

##### includes()

表示一个数组是否包含给定的值，返回布尔值

```
[1,2,3].includes(2) //true
```

#### 字符串扩展

##### 模板字符串

使用反引号定义``

```
let name= "zhangsan"
let sayHello = `hello, my name is ${name}`
```

1. 模板字符串可以解析变量，用${}来包裹

2. 模板字符串可以换行

3. 在模板字符串中可以调用函数

   ```
   const sayHello=()=>'哈哈哈哈'
   let greet=`${sayHello()} 你好`
   console.log(greet)
   ```

##### starsWidth()和endsWidth()

starsWidth()表示参数字符串是否在源字符串的头部，返回布尔值

endsWidth()表示参数字符串是否在源字符串的尾部，返回布尔值

##### repeat()

repeat方法表示将原字符串重复n次，返回一个新字符串

'x'.repeat(3) //'xxx'

#### Set数据结构

ES6提供新的数组结构Set，它类似于数组，但是成员的值都是唯一的，没有重复的值

Set本身是一个构造函数，用new生成Set数据结构

```
const s=new Set([1,2,3,4,4])
//.size属性用来看当前数据结构中包含了多少个值
console.log(s.size)//4
```

```
//用set做去重操作
let set=new Set([1,2,3,3])
let arr = [...set]
console.log(arr)//[1,2,3]
```

##### add(value)

添加某个值，返回set结构本身

##### delet(value)

删除某个值，返回一个布尔值

##### has(value)

返回一个布尔值，表示该值是否为set的成员

##### clear()

清除所有成员，没有返回值

##### forEach()遍历

set结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值

s.forEach(value=>console.log(value))