
---
title:Koa2、Vue3、Mysql服务器部署全流程
---
# Koa2、Vue3、Mysql服务器部署全流程

在电脑上安装[xshell7、xftp](https://www.netsarang.com/zh/free-for-home-school/)，个人使用有免费版本

连接服务器

 ```
快捷连接指令 ssh root@服务器IP地址
重启服务器 reboot
 ```



## 一、Mysql服务器端安装

[参考mysql安装、配置流程](https://blog.csdn.net/wyg1973017714/article/details/106482176)

<u>**重点：使用服务端的服务时，在服务器防火墙中打开相应的端口，mysql对应的端口为3306**</u>

### 1、首先获取rpm源

由于没有相应的源，故需要获取对应的mysql的rpm源文件[https://dev.mysql.com/downloads/repo/yum/](https://dev.mysql.com/downloads/repo/yum/)

```mysql
wget https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm
```

然后通过以下命令安装rpm

```mysql
rpm -ivh mysql80-community-release-el7-3.noarch.rpm
```

最后通过yum命令安装mysql，命令如下：

```mysql
yum install mysql-community-server
```

经过这些命令完成了MySQL的安装;

注意：MySQL GPG 密钥已过期。有关案例的其他详细信息也可以在 MySQL 网站上找到： [https 😕/bugs.mysql.com/bug.php?id=106188](https://bugs.mysql.com/bug.php?id=106188)

可以在运行安装程序之前导入密钥

```
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```



### 2、启动MySQL
首先设置MySQL开机自启动，通过如下命令

```
systemctl enable mysqld.service
```

然后可以通过如下命令开启服务

```
systemctl start mysqld.service
```

### 3、登录MySQL
初次登录时需要登录密码，通过以下命令查看初始密码

```
grep 'temporary password' /var/log/mysqld.log
```

然后通过以下命令登录，并输入初始密码

```
mysql -uroot -p
```

当通过初始密码首次登录MySQL以后，我们需要修改登录密码，不然无法进行数据库基本操作
修改密码通过如下命令：

```
alter user 'root'@'localhost' identified by '密码';
```

通过以上密码可将登录密码初始化为root，identified by 后面的引号中包含的字符就是设置的登陆密码

<u>**高版本mysql修改密码的坑、常见操作，如下：**</u>

```
若修改时出现错误，可能是版本过高，例如：将 validate_password_policy修改 validate_password.policy，余者类似

mysql为了安全，有自己的策略要求，如果我们想将其设置为我们常用的root或者123456这样的密码，需要修改策略要求，具体命令如下：
提示：初次登录必须重置密码，否则无法操作，但是规则未知；故提供示例(直接复制)：
alter user 'root'@'localhost' identified by '@#123qweQWE';

1.设置密码的验证强度等级，设置 validate_password_policy 的全局参数为 LOW 即可，
输入设值语句 “ set global validate_password.policy=LOW; ” 进行设值

2.当前密码长度为 8 ，如果不介意的话就不用修改了，按照通用的来讲，设置为 6 位的密码，设置 validate_password_length 的全局参数为 6 即可，
输入设值语句 “ set global validate_password.length=6; ” 进行设值

3.现在可以为 mysql 设置简单密码了，只要满足六位的长度即可，
输入修改语句 “ ALTER USER ‘root’@‘localhost’ IDENTIFIED BY ‘123456’; ” 可以看到修改成功，表示密码策略修改成功了！！！

mysql基本指令
show databases 查看数据库
use testdb; 进入testdb数据库
show tables; 查看数据库中的表
creat database testdb 创建数据表
select * from 表名 查看数据表中的数据

本地数据表上传至服务器端数据库
1、数据表表上传至服务器
2、打开服务器端的数据库
3、输入命令
//导入前需建立一个数据库名
source /root/probe.sql (/root/probe.sql即sql文件在服务器上的位置)
```



### 4、添加远程用户，赋予全部权限
首先需要创建一个新的用户，使用如下命令：

```
create user root identified by 'password'; password处输入你设置的密码
```

然后将数据库的全部权限赋予该用户

```
grant all privileges on *.* to 'root'@'%' with grant option;
```

最后刷新权限表即可

```
flush privileges;
```

**<u>注释：完成到此处时，其实navicat中就可以直接成功连接啦，但是由于mysql对于新旧版本密码算法不同，会出现步骤5中的错误，故而需要将密码重新修改或者在创建远程用户时就将以对应的形式设置好</u>**



### 5、navicat远程连接

Client does not support authentication protocol requested by server; conside 新旧版本密码算法不同引起的错误，只需要设置下密码方式为 mysql_native_password 就可。还是 navicat 做的好，新旧密码都支持

```mysql
mysql -uroot -p
use mysql;
show tables;
# 查看已经有的用户
select user, host from user;

# 重新设置下密码，并使之生效(设置远程用户的密码)
# 之前是 
alter user 'xxx'@'%' IDENTIFIED BY 'xxxxxx'
# 修改完后
alter user 'xxx'@'%' IDENTIFIED WITH mysql_native_password BY 'xxxxxx'
# 刷新权限表
flush privileges;
```



## 二、Node服务配置

### 1、获取最新的node包(node服务中包括node、npm)

[node官网查看最新版本](https://nodejs.org/en/download/)

强烈建议：在下载安装包前，先执行：cd /usr/local，跳转至该路径，或者包解压的时候直接解压到/usr/local

原因：

- `/usr`：系统级的目录，可以理解为`C:/Windows/`

- `/usr/lib`理解为`C:/Windows/System32`              

- `                        /usr/local`：用户级的程序目录，可以理解为`C:/Progrem Files/`。用户自己编译的软件默认会安装到这个目录下。                  

- `/opt`：用户级的程序目录，可以理解为`D:/Software`，opt有可选的意思，这里可以用于放置第三方大型软件（或游    戏），当你不需要时，直接`rm -rf`掉即可。在硬盘容量不够时，也可将/opt单独挂载到其他磁盘上使用。

源码放哪里？

- `/usr/src`：系统级的源码目录。

- `/usr/local/src`：用户级的源码目录

#### 1、在liunx上从node官网下载node的压缩包

```
wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.xz
```

#### 2、将压缩包解压:

```
(解压到当前目录)tar -xvf node-v14.17.6-linux-x64.tar.xz
或者
(解压到指定目录) (tar -xvf node-v14.17.6-linux-x64.tar.xz -C /usr/local)
```

#### 3、改目录名：

```
mv /usr/local/node-v14.17.6-linux-x64 /usr/local/node
mv命令用来修改名字或移动文件的
```

#### 4、配环境变量（极度重要，此处将服务真正的运行起来）

```
vi /etc/profile
最后加上这句话：export PATH=$PATH:/usr/local/node/bin
让新加的配置生效：source /etc/profile

(此处的路径就是node、npm服务所在的路径)
```

#### 5、软连接

相当于全局变量，在任何文件夹都能查看版本信息

```
第一个路径为文件真正所在路径，虚拟出的路径
软链接：ln -s 源文件 目标文件,软链接可以理解成快捷方式。它和windows下的快捷方式的作用是一样的
(我目前以为在usr/local下软连接作用不明显)
ln -s /usr/local/node/bin/node /usr/local/bin/node
ln -s /usr/local/node/bin/npm /usr/local/bin/npm
```

#### 6、检验是否成功

```
node -v
npm -v
```

#### 7、换成国内源

```
由于node服务在外网，故而npm下载会很慢，在国内使用需要换源
方法1、
//查看源
npm config get registry
//更换源
npm config set registry https://registry.npmjs.org
//淘宝源
npm config set registry https://registry.npm.taobao.org

方法2、(建议)
//可直接用源管理器nrm
npm install nrm -g
//源列表
nrm ls
//可先打开nrm ls查看，使用淘宝的源
npm use taobao

方法3、
安装cnpm，其实与方法1原理一样
npm install -g cnpm --registry=https://registry.npm.taobao.org
```



## 三、Koa2项目上传

**<u>此处也要在防火墙中开启服务端端口</u>**

在云端运行koa2项目与在本地运行时几乎没有差异，服务器端有node环境，可直接运行koa2项目，当navicat可以远程连接mysql数据库，而koa项目不行连接时，参看上文Mysql

**<u>在上传前可将node_modules先删除，然后通过xftp上传文档(上传后的路径可以任意选择，建议在/root下)，然后进入koa2项目中，</u>**

**<u>使用```npm install```下载node_modules,然后通过```node app.js```运行项目即可</u>**

缺点：打开后，该终端页面就无法继续操作，且退出终端后项目也停止运行

<u>**为解决node单一运行的缺点，故而安装pm2**</u>

```
//安装
npm install pm2 -g
//简单的运行项目
pm2 start app.js
//结束项目
pm2 stop app.js
//停止进程：
pm2 stop app_name|app_id|all
//删除进程：
pm2 delete app_name|app_id|all
//重启进程：
pm2 restart/reload app_name|app_id|all
//查看某一个进程的信息：
pm2 show app_name|app_id
//查看日志：
pm2 logs
//监控所有进程：
pm2 monit

建立软链接，使pm2能全局使用
　　ln -s 软件安装的路径 目标路径
例子: ln -s /usr/local/node/bin/pm2 /usr/bin/pm2

启动命令（start）还可以带参数
--name
给进程命名
--watch
是否开启自动重启--max-memory-restart
最大重启内存
--log
指定日志文件路径
-- arg1 arg2 arg3
其他参数
```



## 四、Nginx安装

从[Nginx官网](http://nginx.org/en/download.html)获取nginx包，其中Stable version是稳定版本，Mainline version是最新版本，版本中间的为liunx版本，建议下载稳定版本

[官网安装方式](http://nginx.org/en/linux_packages.html#RHEL-CentOS)

[参考nginx安装，很复杂，但详细，源码安装](https://www.nginx.cn/install)

[参考链接](https://www.cnblogs.com/l-hh/p/10594415.html)

在安装nginx前首先要确认系统中安装了**gcc、pcre-devel、zlib-devel、openssl-devel**等库

```
1、rpm包安装的，可以用 rpm -qa 看到，如果要查找某软件包是否安装，用 rpm -qa | grep "软件或者包的名字"
2、以deb包安装的，可以用 dpkg -l 看到。如果是查找指定软件包，用 dpkg -l | grep "软件或者包的名字"
3、yum方法安装的，可以用 yum list installed 查找，如果是查找指定包，用 yum list installed | grep "软件名或者包名"

//安装库
yum -y install gcc pcre-devel zlib-devel openssl openssl-devel gcc-c++ make zlib libtool 

//跳转路径
cd /usr/local/src/

//获取nginx包
wget http://nginx.org/download/nginx-1.20.1.tar.gz

(解压到当前目录)tar -xvf nginx-1.20.1.tar.gz

//数字是相应的版本，需要根据版本看，此处参考复杂的安装方式的链接
./configure --sbin-path=/usr/local/nginx/nginx 
--conf-path=/usr/local/nginx/nginx.conf 
--with-http_stub_status_module
--with-http_ssl_module
--with-pcre=/usr/local/src/pcre-8.44

make -j2
make install

//启动nginx
/usr/local/nginx/nginx

浏览器中打开网页会出现welcome nginx

//查看占用的端口
ps -ef|grep nginx

//或者直接关闭
./nginx -s stop

//开启
./nginx

//修改对应的文件指令
vim nginx.conf
```



## 五、Vue3项目上传

### 1、项目打包

```
npm run build      生成dist文件夹
```

将dist文件夹上传至服务器

### 2、dist文件夹的位置

**<u>dist文件夹可以有两种方式</u>**

1. 将dist文件夹导入/usr/local/nginx/下，与原本的nginx中的html文件夹同级 (目前使用的)

```
将nginx.conf中的localhost / 下的root 对应的 html 改成 dist 即可
不要更改端口，否则会链接不上，原因未知

修改完后执行指令
./nginx -s stop
./nginx
```

2. 无论dist文件夹放置在那个位置，直接修改nginx.conf中root对应的 路径即可，但是目前不知道路径能不能使用绝对路径

   ```
   假如server 中声明root    /usr/share;
      那么此时声明 location /{
           root /usr/html/www
   }
     此时就会覆盖掉server root 中的路径
   假如此时声明 location /app {
   
   }
   那么此时所有的操作就是基于路径/usr/share/app
   ```

### 3、页面部署完后，可以使用，但是刷新后会报错

```
可能原因：
mode类型引起的错误
前端修改方式：将mode类型由history改成hash；
后端修改方式：mode还是history，后端配置nginx，设置映射关系
```

我的解决方式

```
location / {
                root  dist
                try_files $uri $uri/ @router;
                index index.html index.htm;
        }

        location @router {
                rewrite ^.*$ /index.html last;
        }
 完美解决刷新报错的问题
 
 
 以下为注释：
   server {
        listen       8081;#默认端口是80，如果端口没被占用可以不用修改
        server_name  myapp.com;
        root        D:/vue/my_app/dist;#vue项目的打包后的dist
        location / {
            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
            index  index.html index.htm;
        }
        #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
        #因此需要rewrite到index.html中，然后交给路由在处理请求资源
        location @router {
            rewrite ^.*$ /index.html last;
        }
        #.......其他部分省略
  }
```



## 注意：上传服务器时，需要将ip与域名更改成服务器的域名，可能一个空格和/就会报错

