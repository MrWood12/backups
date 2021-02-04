## mongoose

------

- 官网：http://mongoosejs.com/
- 官方指南：http://mongoosejs.com/docs/guide.html
- 官方API文档：http://mongoosejs.com/docs/api.html

### 1.MongoDB数据库的基本概念

------

- 数据库
- 集合(mql中的是表，mongodb是集合，也是数组)
- 文档
- 可以有多个数据库，一个数据库里面可以有集合，一个集合可以有多个文档
- MongoDB非常灵活，不需要像mySQL一样先创建数据库、表、设计表结构，只需要当你插入数据的时候，指定往哪个数据的哪个集合操作就可以了，一切都由MongoDB自动完成建库建表

```
{
	//qq数据库
	qq:{
		//users集合
		users:[
			//文档，必须是对象，对象里面是什么都可以
			{name:'张三',age:15},
			{name:'王五',age:18},
			{},
		],
		//products集合
        products:[
        
        ]
	},
	//taobao数据库
	taobao:{
	
	},
	baidu:{
	
	}
}
```

### 2.起步

安装:

```
//mongoose是第三方库
npm i mongoose
```

hello world:

```js
//通过mongoose包来连接操作数据库
//该例子最终生成一个数据表，在mongodb中数据表就是一个集合，集合就是一个数组 ，该数组的名称叫Cat，会生成一个cats，在cats中实例化一个叫kitty的对象
const mongoose = require('mongoose');
//连接mongodb数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
//创建一个模型 就是设计数据库
//表名叫Cat，最后生成一个cats
const Cat = mongoose.model('Cat', { name: String });
//实例化一个cat
const kitty = new Cat({ name: 'Zildjian' });
//持久化保存kitty实例
kitty.save().then(() => console.log('meow'));
```

### 3.增删改查

#### 设计Scheme 发布Model (创建表)

```javascript
// 1.引包
// 注意：安装后才能require使用
var mongoose = require('mongoose');

// 拿到schema图表
var Schema = mongoose.Schema;

// 2.连接数据库 test是数据库名称
// 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
mongoose.connect('mongodb://localhost/test');

// 3.设计集合结构（表结构）
// 用户表
var userSchema = new Schema({
	username: { //姓名
		type: String,
		require: true //添加约束，保证数据的完整性，让数据按规矩统一
	},
	password: {
		type: String,
		require: true
	},
	email: {
		type: String
	}
});

// 4.将文档结构发布为模型
// mongoose.model方法就是用来将一个架构发布为 model
// 		第一个参数：传入一个大写名词单数字符串用来表示你的数据库的名称
// 					mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
// 					例如 这里会变成users集合名称
// 		第二个参数：架构
// 	返回值：模型构造函数
var User = mongoose.model('User', userSchema);
```

#### 添加数据（增）

```javascript
// 5.通过模型构造函数对User中的数据进行操作
var user = new User({
	username: 'admin',
	password: '123456',
	email: 'xiaochen@qq.com'
});

user.save(function(err, ret) {
	if (err) {
		console.log('保存失败');
	} else {
		console.log('保存成功');
		console.log(ret);
	}
});
```

#### 删除（删）

根据条件删除所有：

```javascript
User.remove({
	username: 'xiaoxiao'
}, function(err, ret) {
	if (err) {
		console.log('删除失败');
	} else {
		console.log('删除成功');
		console.log(ret);
	}
});
```

根据条件删除一个：

```javascript
Model.findOneAndRemove(conditions,[options],[callback]);
```

根据id删除一个：

```javascript
User.findByIdAndRemove(id,[options],[callback]);
```



#### 更新（改）

更新所有：

```javascript
User.updata(conditions,doc,[options],[callback]);
```

根据指定条件更新一个：

```javascript
User.FindOneAndUpdate([conditions],[update],[options],[callback]);
```

根据id更新一个：

```javascript
// 更新	根据id来修改表数据
User.findByIdAndUpdate('5e6c5264fada77438c45dfcd', {
	username: 'junjun'
}, function(err, ret) {
	if (err) {
		console.log('更新失败');
	} else {
		console.log('更新成功');
	}
});
```



#### 查询（查）

查询所有：

```javascript
// 查询所有
User.find(function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});
```

条件查询所有：

```javascript
// 根据条件查询 得到的是一个数组[{}]
User.find({ username:'xiaoxiao' },function(err,ret){
	if(err){
		console.log('查询失败');
	}else{
		console.log(ret);
	}
});
```

条件查询单个：

```javascript
// 按照条件查询单个，查询出来的数据是一个对象{}
// 没有条件查询使用findOne方法，查询的是表中的第一条数据
User.findOne({
	username: 'xiaoxiao'
}, function(err, ret) {
	if (err) {
		console.log('查询失败');
	} else {
		console.log(ret);
	}
});
```



