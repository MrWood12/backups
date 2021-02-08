## BFC

### 问题

有一个子元素和一个父元素，当我们子元素增加**上边距**的时候出现了合并的现象，而**左右边距**则不会有这种问题。

我们想要的是左边这图的效果，却得到右边这图的效果。

![image-20201129120044744](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120044744.png)

![image-20201129120131087](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120131087.png)

这是W3C规定的

解决的办法就是BFC规则

### BFC是什么

一个浏览器渲染元素的规则（块格式上下文）

### 内容

- 1、一个BFC区域和另一个BFC区域是相互独立且不会影响的
- 当给BFC区域增加上下边距时，只会在内部拉开距离，使得父元素变成了独立的BFC区域
- ![image-20201129120444018](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120444018.png)

- 2、BFC规则在计算元素高度的时候会将浮动元素也加入进去（这让我们在使用浮动元素的时候不用害怕有多少个浮动元素了）
- ![image-20201129120632549](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120632549.png)

- ![image-20201129120649805](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120649805.png)

- ![image-20201129120712290](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129120712290.png)

### 如何出发一个元素的BFC规则

1、float:left/right;

2、position:absolute/fixed

3、display:inline-block/table-cell等

4、overflow:auto/hidden等(最好用，因为不会改变原本的元素)（这也是为什么能消除浮动影响的原因，因为会给该元素触发BFC规则，使其父元素的高度会将浮动元素计算在内，解决了父元素高度塌陷问题）

## 总结

![image-20201129121058816](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201129121058816.png)