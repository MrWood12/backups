# var、let和const的区别

## 1、var声明的变量会挂载到window上，let和const不会。

```js
var a=100;
console.log(a,window.a); // 100 100

let b=100;
console.log(b,window.b); //100 undefined

const c=100;
console.log(c,window.c); //100 undefined
```

## 2、var存在变量提升，let和const不存在变量提升

```js
console.log(a); //undefined ===>a已经声明但是没有赋值，所以得到undefined
var a=100;

console.log(b);//error:Cannot access 'b' before initialization ====>不能在初始化之前访问b，即b还没声明
let b=100;

const于let同理
```

## 3、let和const声明形成块作用域

```js
if(1){
		var a=100;
		let b=10;
    	const c=1;
	}
	console.log(a);//100
	console.log(b);//error:b is not defined ===>let声明形成块作用域，块外部无法访问到let声明的变量
	console.log(c);//error:c is not defined
```

- 每一层都是独立作用域，里层作用域可以声明外层作用域同名变量，但不会改变外层变量

```js
function run() {
  hd = "houdunren";
  if (true) {
    let hd = "hdcms";
    console.log(hd); //hdcms
  }
  console.log(hd); //houdunren
}
run();
```

- 块内部可以访问到上层作用域的变量

```js
if (true) {
  let user = "向军大叔";
  (function() {
    if (true) {
      console.log(`这是块内访问：${user}`);
    }
  })();
}
console.log(user);
```

## 4、同一作用域下let和const不能声明同名变量，var可以。

```js
var a=100;
console.log(a);//100
var a=10;
console.loh(a);//10

let b=100;
let b=10;
//error:Identifier 'b' has already been declared  ===> 标识符b已经被声明了。
```

## 5、TDZ暂存死区

### 作用

TDZ可以让程序保持先声明后使用的习惯，让程序更稳定。

- 变量要先声明后使用
- 建议使用let/const 而少使用var

使用`let/const` 声明的变量在声明前存在临时性死区（TDZ）使用会发生错误

```js
var a = 100;

if(1){
    a = 10;
    //在当前块作用域中存在a使用let/const声明的情况下，给a赋值10时，只会在当前作用域找变量a.(没有let/const的情况下，a会向上找变量a)
    // 而这时，还未到声明时候，所以控制台Error:Cannot access 'a' before initialization
    let a = 1;
}
```

## 6、const

- 常量名建议全部大写
- 只能声明一次变量
- 声明时必须同时赋值
- 不允许再次全新赋值
- 可以修改引用类型变量的值
- 拥有块、函数、全局作用域

```js
/*
* 　　1、一旦声明必须赋值,不能使用null占位。
*
* 　　2、声明后不能再修改
*
* 　　3、如果声明的是复合类型数据，可以修改其属性
*
* */

const a = 100; 

const list = [];
list[0] = 10;
console.log(list);　　// [10]

const obj = {a:100};
obj.name = 'apple';
obj.a = 10000;
console.log(obj);　　// {a:10000,name:'apple'}
```