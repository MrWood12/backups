### href

用于link和a中

### src

用于img、style、script、input和iframe中



![image-20201218162938777](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201218162938777.png)

以这为例，两个属性都引用了名叫'smiling.png'的图片，效果如下

![image-20201218163057556](C:\Users\d1063\AppData\Roaming\Typora\typora-user-images\image-20201218163057556.png)

这里的href需要点击一下才会显示笑脸图片。表明href属性在使用的时候会建立一个通道，该通道联系着资源。

而src属性会直接下载这个资源并显示在文档上，而且浏览器遇到这个属性的时候会先暂停其他资源的下载和处理，直到该资源下载编译完成后才会进行下一步。



## 总结

- href属性是超链接建立通道，让当前元素或者当前文档和引用资源进行联系。当需要引用资源的时候，就可以通过通道进行引用。
- src属性会把资源下载下来，代替当前的元素，然后嵌入到文档中。