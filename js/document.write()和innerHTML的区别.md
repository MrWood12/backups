### document.write()

- document:文档
- 是一种对象方法

### element.innerHTML

- element:元素

- 是一种元素属性

|          | document.write()                       | innerHTML                |
| -------- | -------------------------------------- | ------------------------ |
| 类型     | document对象中的方法                   | 存在于Element对象中属性  |
| 插入位置 | 脚本元素script的位置                   | 指定的元素               |
| 拼接方法 | 多次调用就可以拼接                     | 需要利用+=               |
| 覆盖问题 | 文档解析完再调用就会覆盖，否则不会覆盖 | 直接调用会覆盖原本的内容 |

文档解析完再加载的语句：window.onload

```
window.onload=document.write("你好")//不会被覆盖
window.onload=function(){
	document.write('你好')//会被覆盖
}
```

