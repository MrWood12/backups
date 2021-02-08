基本数据类型：string、number、NaN、boolean、undefined、symbol

复杂数据类型:Object

#### typeof 检测数据类型

type：类型

- 返回一个小写字母的类型字符串
- 只需要一个操作数
- 简单数据类型或者函数或者对象

#### instanceof 检测对象之间的关联性

instance：实例、例子

- instanceof表示什么什么的实例，所以左边必须是实例。（js中规定所有的引用类型值(数组、对象、构造函数)都是object的实例）

![image-20201218134159176](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201218134159176.png)

![image-20201218134426770](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201218134426770.png)

|            |          typeof          |             instanceof             |
| :--------: | :----------------------: | :--------------------------------: |
|    作用    |       检测数据类型       |         检测对象之间的关系         |
|    返回    |      小写字母字符串      |               布尔值               |
|   操作数   | 简单数据类型、函数、对象 | 左边必须是引用类型，右边必须是函数 |
| 操作数数量 |           1个            |                2个                 |

总的来说：

- typeof就是就来检测该数据是什么类型，返回类型的字符串。NaN为Number,undefined为undefined
- instanceof就是检测这个数值和这个类型是不是相同，返回true或false