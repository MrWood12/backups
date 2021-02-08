### Tabbar

<img src="F:\记录\Demo\src\tabbar.png" style="zoom:50%;" />

用vue的组件化+vue-router实现的手机端底部导航的效果

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