## 为什么要用this？

this就是为了使代码变得整洁。

## this的绑定规则

### 默认绑定

```
function girl(){
	console.log(this)//指向window
}
girl()
```

### 隐式绑定 

当对象的方法被调用时，会发生隐式绑定，this指向使用该方法的对象

```
var girl={
	name:'小红',
	height:160,
	weight:180,
	detail:function(){
		console.log(this.name);//小红
		console.log(this.height);//160
		console.log(this.weight);//180
	}
}
girl.detail()
```

### 硬绑定 

这里用了**call()方法**，强制this指向call()所指的对象

```
var girlName={
	name:'小红',
	sayName:function(){
		console.log('我的女朋友是'+this.name)
	}
}
var girl1={
	name:'小白',
}
var girl2={
	name:'小黄'
}
girlName.sayName.call(girl1);//我的女朋友是小白
girlName.sayName.call(girl2);//我的女朋友是小黄
```

### 构造函数绑定

```
function Lover(name){
	this.name=name;
	this.sayName=function(){
		console.log('我的老婆是'+this.name)
	}
}
var name='小白';
var xiaoHong=new Lover('小红');
xiaoHong.sayName()
```

## 题目

```
function a(){
	function b(){
		console.log(this);//window 没有指明对象所以指向默认对象window
		function c(){
			'use strict';
			console.log(this);//undefined 当使用严格模式的时候，this会变为undefined
		}
		c();
	}	 
	b();
}
a();
```

```
var name='小白';
function special(){
	console.log('姓名：'+this.name);
}
var girl={
	name:'小红',
	detail:function(){
		console.log('姓名：'+this.name)
	},
	woman:{
		name:'小黄',
		detail:function(){
			console.log('姓名：'+this.name)
		}
	},
	special:special,
}
girl.detail();//姓名：小红
girl.woman.detail();//姓名：小黄
girl.special();//姓名：小红 this指向实际调用该方法的对象，这里调用方法的对象为girl
```

```
var name='小红'
function a(){
	var name='小白';
	console.log(this.name)
}
function d(i){
	return i()
}
var b={
	name:'小黄',
	detail:function(){
		console.log(this.name)
	},
	bibi:function(){
		return function(){
			console.log(this.name)
		}
	}
}
var c=b.detail;
b.a=a;
var e=b.bibi();
a();//小红 因为a函数里面虽然有name，但是没有指明调用的对象，最终指向window
c();//小红 这里因为c的赋值，c已经变成了c函数，与b已经没有什么关系了，所以指向window
b.a();//小黄
d(b.detail);//小红
e();//小红
```

## 总结

- this关键字是因为函数的出现而出现的，因为函数在被调用的时候就会自动获取this，不管函数声明是在哪个位置，this都能动态的指向实际调用的对象。
- 要理解函数实际指向的对象，this指向调用了该函数的对象。