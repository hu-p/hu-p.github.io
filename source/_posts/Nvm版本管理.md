---
title: Nvm版本管理
date: 2023-03-07 22:03:30
category: ["环境配置"]
tags: ["nvm"]
category_bar: true
---
# Nvm学习

## 一.安装

第二步：安装nvm管理工具

1.从官网下载安装包 https://github.com/coreybutler/nvm-windows/releases，选择[nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.zip)压缩包

2.将下载下来的压缩包进行解压（随便解压到任一你喜欢的位置），解压文件夹里面是一个.exe文件

3.开始进行nvm安装

（切记不要选择到c:/program files,这里的两个路径是为了自动在系统中添加环境变量的路径）

    (1) 鼠标双击nvm-setup.exe文件，选择“我接受…”那一行，点击next

    (2) 选择nvm安装目录，可以根据自身情况自定义选择路径盘，**路径不要出现空格或中文符号**（路径最好是在路径盘的根目录下，如C盘、D盘下的根目录）

    (3) 选择node.js的安装位置，可以根据自身情况自定义选择路径盘，**路径不要出现空格或中文符号**（路径最好是在路径盘的根目录下新建一个文件夹，如C盘、D盘下的根目录

    (4)安装完毕

4.安装之后

以下两种方法选其一，属玄学问题

**方法一：**

**使用该方法，大部分会提示npm无法下载，下载了可能无法使用**

打开nvm文件夹下的settings.txt文件，在最后添加以下代码：

```javascript
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

将下载镜像源指向淘宝（这步也很重要，否则在安装node的时候会出现卡死，npm安装不成功的情况）

**方法二：**

**不添加镜像地址，但是也存在下载卡顿的情况**

5.nvm运行

> **重点**：使用管理员权限的命令提示符打开，否则会在使用 `nvm use 版本号` 之后的结果为乱码，且不成功，`node -v` 和 `npm -v`找  不到

打开管理员权限的cmd

(1) 输入命令行nvm ls available查看可用的node.js版本号

(2) 输入命令行nvm install node版本号(例如：nvm install 12.17.0)即可安装对应版本以及自动安装对应的npm版本

(3) 安装成功后，输入命令行nvm use node版本号（例如：nvm use 12.17.0）即可选择你本地所使用的Node.js版本，使用此命

令行可以根据你自己的需要随意切换node.js版本运行

(4) 输入命令行nvm ls查看你安装的所有node.js版本号，以及你当前所选择的node.js运行版本

(5) 如果想删除某node.js版本的话，输入命令行nvm uninstall node版本号（例如：nvm uninstall 12.17.0）即可删除对应版本

 `npm`设置淘宝镜像源：

```javascript
// 切换淘宝源
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

//查看源信息
npm config get registry 
npm config get disturl 

//删除源
npm config delete registry
npm config delete disturl

//看npm配置信息
npm config list
```

`npm` 安装 `nrm`源管理

```
// 安装nrm
npm i nrm -g
// 添加代理
nrm add 自定义的代理名字 地址      // 例如nrm add lesoon http://scm-verdaccio.belle.net.cn
// 切换代理
nrm use lesoon[或其它代理]
// 查看代理
nrm ls
//查看延迟
nrm test
```
