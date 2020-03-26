gh主页直接放在master分支了，就懒得用gh-page分支发布了

## 使用方法

```bash
git clone https://github.com/Yezzle/Yezzle.github.io.git

cd Yezzle.github.io/codes

yarn

yarn dev
```

## 说明

使用umijs搭建的项目快速开发，
进行了以下内容优化
+ 基于react domDiff算法，对dom进行补丁操作
+ 去掉了antd全部图标引入，缩小打包体积
+ 去掉了momentjs其他语言模块引入
