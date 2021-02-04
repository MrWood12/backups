## jQuery

### 1.jQury的入口函数

```
1.$(function(){
		...//这里是页面DOM加载完成的入口
})
2.$(document).ready(function(){
	...//这里是页面DOM加载完成的入口
})
```

### 2.jQury的顶级函数

1. $是jquery的别称，在代码中可以使用jQuery代替$,但一般为了方便使用$
2. $是jquery的顶级对象，相当于原生js中的window对象，把元素利用$包装成jQuery对象，就可以调用jQuery方法。

### 3.jQuery对象和DOM对象

1.用原生JS获取的对象就是DOM对象

let myDiv = document.querySelector('div')

2.用jQuery方法获取的对象是jQuery对象，本质：通过$把dom元素进行封装(伪数组形式存储)

$('div')

3.jQuery对象只能用jQuery方法，dom对象只能使用原生JS属性和方法。