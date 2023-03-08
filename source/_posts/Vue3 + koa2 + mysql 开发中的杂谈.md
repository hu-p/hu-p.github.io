---
title:Vue3 + koa2 + mysql 开发中的杂谈
---

# Vue3 + koa2 + mysql 开发中的杂谈

## 一、Vue3开发

### 1、[v-md-editor](https://ckang1229.gitee.io/vue-markdown-editor/zh/examples/preview-demo.html#%E5%BC%95%E5%85%A5)Markdown文本编辑插件

理由：本插件在使用过程中完美兼容vue3，且功能较丰富，有详细完整的教程

vue3使用一定要安装对应的版本

### 2、vue3中组件通信

#### 1、祖孙通信使用依赖注入provide/inject，，兄弟使用mitt库

```
依赖注入在main.js中使用
// 依赖注入的方式，provide不能对象的方式写
// app.provide({
//     'axios': axios,
//     BasicUrl: 'http://localhost:5030/'
// })
app.provide('axios', axios)
app.provide('BasicUrl', BasicUrl.Url)

在vue组件中可正常使用
const axios = inject('axios')

provide: {
   name:value
}
```

#### 2、父子使用props

```
provide/inject是祖孙间通信，父子间通信最好用props
父组件
<upload-components :blogdetail="blogdetail"></upload-components>
子组件接收
props两种接收方式
1、props:["blogdetail"]
2、props:{
      blogdetail:{
          type:String/Object
          default:''               //没有输入时的默认值
      }
}
```

#### 3、兄弟使用mitt库

```
vue2.0时经常用事件总线 $emit 和 $on进行组件间的通信，vue3.0中这两个方法被移除了，无法使用Vue.prototype.$bus = new Vue()
vue兄弟组件通信可以引用第三方库mitt库 ！！！也是官方推荐的

想在Vue3当中使用事件总线当然也非常简单的啦一共分为三个步骤
1.安装
npm install --save mitt

2.挂载
//main.js中
import mitt from "mitt"
import { createApp } from "vue"
const app = createApp()//正常配置
//挂载事务总线
const vueEvent = new mitt()
app.config.globalProperties.vueEvent = new mitt()


3.使用
import {getCurrentInstance} from 'vue'
 const vueEvent = getCurrentInstance()?.appContext.config.globalProperties.vueEvent
//发送
vueEvent.emit('handleCurrentNo', 1)
//接收
   onMounted(() => {
      vueEvent.on('handleCurrentNo', (val: number) => {
        state.currentNo = val
      })
    })
    onUnmounted(() => {
      vueEvent.off('handleCurrentNo')
    })
```

### 3、axios配置及操作

```
//axios.js
import axios from "axios";
import { ElMessage } from "element-plus";

let http = axios.create({
   baseURL:'http://localhost:5030/'
})

//请求拦截
http.interceptors.request.use( config => {
   if(localStorage.elementToken){
     config.headers.Authorization = localStorage.elementToken
   }
   return config
})

//响应拦截
http.interceptors.response.use( res => {
  return res
}, err => {
  console.log(err.response);
  ElMessage.error(err.response.data.msg)
})

export default http

//在main.js中直接使用provide传出去
import axios from './axios.js'
app.provide('axios', axios)

//然后在组件中直接引用即可
const axios = inject('axios')
     //由于axios配置时设置了拦截，所以例如element自带的文件上传需要在头上加上token令牌
      // let config = {
         //     headers: {
         //      Authorization: localStorage.elementToken,
         //      },
        // };
        
      //自定义的上传文件，例如图片时，在拿到文件后，需要将其实例化
       //实例表单
     // let formdata = new FormData();
      //添加表单
     // formdata.append("file", files[0]);
     然后直接使用axios上传formdata即可，后端接收文件是const files = ctx.request.files.file
axios
        .post('访问的url'，上传的值，config(配置的头文件，一般没有))
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
或者
axios({
  url:'',
  method:'post',
  data:'上传的值'
  header:{"Content-Type": 'application/x-www-form-urlencoded'}      //配置
})

//get请求
//单纯的接收 XXX/user/test接口传回的值
vue端：axios.get('/user/test')  
koa端：user.get('/test',async(ctx) => {   })

//带参获取值
vue端：axios.get('/user/test/' + testvalue)
koa端：user.get('/test/:name',async(ctx) => {  
           const testvalue = ctx.params.name 
    })
 
//post请求
vue端：axios.post('/user/test',testvalue)    //此处的testvalue应为对象
koa端：user.get('/test',async(ctx) => {  
           const testvalue = ctx.requestbody.body.testvalue
           或键值对的名字一样时
           const {testvalue} = ctx.requestbody.body
    })
```

### 4、常用函数

```
//生命周期，页面初始时即加载的服务
onMounted(() => { });

//计算属性
const double = computed(()=>{ })

//需要在 DOM 更新之后再执行一段代码时，可以借助nextTick实现
nextTick(() => {
  });
```

### 5、注意事项

```vue
//使用element表单时的注意
<template>
  <div class="datapage_divise animate__animated animate__fadeInDown">
    <div class="upload_title">
      <!-- 此处model与ref最好区分开，model是输入时的数据，ref是最终的传递的数据，虽然可以
      是一样，但是千万不要设置一样，否则输入时极度慢 -->
      <el-form
        :model="formtitledata"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="链接地址" type="color:black" prop="linkpath">
          <el-input type="text" v-model="formtitledata.linkpath"></el-input>
        </el-form-item>
        <el-form-item label="链接简介" prop="linkcomments">
          <el-input
            type="textarea"
            v-model="formtitledata.linkcomments"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { defineComponent, reactive, inject, ref, onMounted } from "vue";

export default defineComponent({
  name: "datapage",
  setup(props) {
    const axios = inject("axios");
    //引入dayjs是由于mysql生成的日期传到前端格式有杂质，故用dayjs修改
    const dayjs = inject("dayjs");

    let formtitledata = reactive({
      linkpath: "",
      linkcomments: "",
    });
    //表单规则
    const rules = reactive({
      linkpath: [
        { required: true, message: "请输入链接地址", trigger: "blur" },
        { min: 1, max: 30, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
      linkcomments: [
        { required: true, message: "请填写链接简介", trigger: "blur" },
      ],
    });
    //接收需设置为ref
    const ruleForm = ref();
    function submitForm() {
      ruleForm.value.validate((valid) => {
        if (valid) {
          console.log(valid);
          axios
            .post("/artical/addlink", formtitledata)
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    //重置
    function resetForm() {
      ruleForm.value.resetFields();
    }

    return {
      formtitledata,
      ruleForm,
      rules,
      submitForm,
      resetForm,
      dayjs
    };
  },
});
</script>


//一组表格中选取一行数据修改思路
1、获取到后台的对象的数组
2、向数组中的每一个对象添加一个boolean类型的键值对
为数组中每一个对象添加{edit:false}键值对
let addedit = res.data。arr;
        addedit.forEach((element) => {
          element["edit"] = false;
        });
3、通过v-if或v-show实现修改功能，注:v-if和v-show前不需要':'绑定，否则功能无法实现

//将后端获取的数据存储到本地
localStorage和sessionStorage一样都是用来存储客户端临时信息的对象
localStorage生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。
sessionStorage生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过sessionStorage存储的数据也就被清空了。
用法：
setItem (key, value) ——  保存数据，以键值对的方式储存信息。
getItem (key) ——  获取数据，将键值传入，即可获取到对应的value值。
removeItem (key) ——  删除单个数据，根据键值移除对应的信息。
clear () ——  删除所有的数据
key (index) —— 获取某个索引的key
例如：token为已获取到的值
localStorage.set("elementToken",token)

//文件下载
const downloadU = BasicUrl + "/files/download/" + row.filename;
      window.open(downloadU, "myIframe");
通过该指令可直接下载文件，后端会接受到该路径，接收token验证，所以需要需要将/files/download/*加入到koa-jwt白名单中， /^\/files\/download\/*/

const send = require('koa-send');
//实现下载功能
fileList.get('/download/:name', async (ctx) => {
    const name = ctx.params.name
    console.log('filename', name);
    const path = `public/uploads/${name}`;
    console.log('fileQueryPath', path);
    ctx.attachment(path);
    await send(ctx, path);
})
```



## 二、Koa2开发

### 1、调用其三方接口，请求其他数据

[参考node请求](https://blog.csdn.net/qq_40816649/article/details/87895301)

```
//wallhaven.cc/api的图片接口非常友好，有相应的api文档，登陆账号后就可获得密钥
const Router = require('koa-router');
const queryback = require('../util/db/db.js')
const otherapi = new Router();

const request = require('request')
otherapi.get('/wallhaven/:name', async (ctx, next) => {

    let pageid = ctx.params.name
        //request需要异步执行，
    let dd = await new Promise((resolve, reject) => {
        //node封装的请求中间件GET请求
        request({
                url: 'https://wallhaven.cc/api/v1/search',
                method: 'GET',
                //请求带参数时，get中params中填写的数据对应的为qs中的对象，结果为json
                //post中body填写的数据对应的为form的对象，具体看请求头
                qs:{
                   'sorting':'toplist',
                   'topRange':'1d',
                   'purity':'100',
                   'page':pageid,
                },
                headers: {
                    "Content-Type": 'application/json',
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body))
                } else {
                    console.log('失败', error);
                }
            })
    })
    if (dd.data !== null) {
        ctx.response.status = 200
        ctx.body = {
            code: 0,
            msg: 'success',
            imgs: dd.data
        }
    } else {
        ctx.response.status = 404
        ctx.body = {
            code: -1,
        }
    }
})

```

### 2、async、await、Promise之间的联系

async 函数
1. 函数的返回值为 promise 对象
2. promise 对象的结果由 async 函数执行的返回值决定

await 表达式
1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值
2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值
3. 如果表达式是其它值, 直接将此值作为 await 的返回值

 注意
1. await 必须写在 async 函数中, 但 async 函数中可以没有 await
2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

```js
//异步操作一般使用，该命令运行在async中
//let dd = await new Promise((resolve, reject) => {  }
      
<script>
function fn1() {
         return Promise.resolve(1) 
            }

function fn2() {
         return 2 
            }

function fn3() {
         return Promise.reject(3)
         // return fn3.test() // 程序运行会抛出异常
            }


function fn4() {
         return fn3.test() // 程序运行会抛出异常
           }

// 没有使用 await 的 async 函数
async function fn5() {
          return 4 
          }

async function fn() {
           // await 右侧是一个成功的 promise
           const result = await fn1()
           // await 右侧是一个非 promise 的数据
           // const result = await fn2()
           // await 右侧是一个失败的 promise
           // const result = await fn3()
           // await 右侧抛出异常
           // const result = await fn4()
           console.log('result: ', result)
           return result+10
           }

async function test() {
    try {
          const result2 = await fn()
          console.log('result2', result2) } catch (error) {
                    console.log('error', error) 
                 }
          const result3 = await fn4()
          console.log('result4', result3) 
        }
          // test()
</script>
```

### 3、koa-jwt的白名单

```
const {
    PRIVATE_KEY
} = require('./util/encrpytion/md5.js')
const koaJWT = require('koa-jwt')

//使用kaoJwt拦截token
app.use(koaJWT({
    // 解密 密钥
    secret: PRIVATE_KEY,
    algorithms: ["HS256"]
   }).unless({
    path: [
    '/home',
    '/login',
    '/login/register',
    '/email',
    '/email/examEmail',
    '/email/forget',
    /^\/files\/download\/*/,
  ] 
  //此处使用正则表达式，此处是下载的命令
  //⽩名单,除了这⾥写的地址，其 他的URL都需要验证
   }));

白名单中需要使用正则表达式可放行/files/download/:name
```

### 4、解析token令牌，获取用户名

```js
//设置的加密，解码
md5.js
const crypto = require('crypto')

function md5(s) {
    // 给密码加密
    //注意参数需要为string类型，否则会报错
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

module.exports = {
    md5,
    // 处理密码的密钥
    PWD_SALT: 'xd_node',
    // 处理token的密钥
    PRIVATE_KEY: 'xd_blog',
    // token的过期时间
    EXPIRESD: 1000 * 60 * 60 * 24
}

//解析令牌
selectUser.js
const {
    PRIVATE_KEY,
} = require('../encrpytion/md5.js')
const jwt = require('jsonwebtoken')

const selectUser = async (ctx, next) => {
    let token = ctx.request.header.authorization.split(" ")[1];
    if (token) {
        let jiemi = await jwt.verify(token, PRIVATE_KEY, (err, data) => {
            return data
        })
        let myusername = jiemi.username
        return myusername
    } else {
        return false
    }
}

module.exports = {
    selectUser
}

在接口中使用，导入即可
const {
    selectUser
} = require('../util/file/selectUser.js')

const myusername = await selectUser(ctx)
```

### 5、关于跨域问题

在前后端交互的过程中难免会遇到跨域的问题，解决的方式有如下

1、在前端解决跨域问题

2、在后端解决跨域问题

3、通过nginx解决问题

由于各种各样的问题且知识有限的问题，在解决跨域问题是优先考虑后端解决跨域问题，即使用cors解决

在koa2中直接使用koa2-cors即可

在app.js中导入

const cors = require('koa2-cors')

app.use(cors())

### 6、app.js文件解析

```
//整个函数的入口
const Koa = require("koa2"); //构造函数
const app = new Koa(); //声明一个实例
const port = 5030; //端口号
const router = require('./router/index.js');
const koaStatic = require('koa-static')
const chance = require('chance')

const {
    PRIVATE_KEY
} = require('./util/encrpytion/md5.js')
const koaBody = require('koa-body')
const koaJWT = require('koa-jwt')

const cors = require('koa2-cors')
app.use(cors())

const path = require("path")

//koa-static可将文件路径转换为http路径，文件起始地址需先转到根路径，然后调用根目录下的静态目录下文件目录
app.use(koaStatic(path.join(__dirname, 'public')))

//使用kaoJwt拦截token
app.use(koaJWT({
    // 解密 密钥
    secret: PRIVATE_KEY,
    algorithms: ["HS256"]
   }).unless({
    path: [
    '/home',
    '/login',
    '/login/register',
    '/email',
    '/email/examEmail',
    '/email/forget',
    /^\/files\/download\/*/,
  ] 
  //此处使用正则表达式，此处是下载的命令
  //⽩名单,除了这⾥写的地址，其 他的URL都需要验证
   }));

app.use(
    koaBody({
        // 允许上传多个文件
        multipart: true,
        formidable: {
            // 设置上传文件大小最大限制，默认2M
            maxFileSize: 200 * 1024 * 1024,
            // 保留文件扩展名
            keepExtensions: true,
        }
    })
);

/*
   router.routers()的作用是：启动路由
   router.allowedMethods()的作用是：允许任何请求(get,post,put)
*/
app.use(router.routes(), router.allowedMethods())
//路由重定向

app.use(chance)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
```



## 三、Mysql搭建，navicat中操作

#### 1、mysql存储emoji表情，数据添加外键

```js
1、mysql可直接使用navicat创建
2、一个表中的数据可以为另一个表的外键，建立外键，就可实现改主表的数据，引用表的数据也跟随着一起改变，建立外键的条件，必须两个表的数据类型一样，数据编码一样，且建立时，引用的表中数值要么为空，要么填写的所有数据都可在主表中找到，也就是，在建立关系的时候主表包含引用表
3、在数据库中存储emoji表情时，存储的编码格式必须改为utf8mb4，因为表情的占用4个字节
utf8与utf8mb4的区别：
UTF-8编码中，一个英文字符占用一个字节的存储空间，一个中文（含繁体）占用三个字节的存储空间。
UTF8MB4：MySQL在5.5.3之后增加了utf8mb4的编码，mb4就是most bytes 4的意思，专门用来兼容四字节的unicode。因此可以用来存储emoji表情。

修改完数据库后，还需在后端配置连接时加上 charset:'utf8mb4'

dbconfig.js
let config
//数据库配置
 config = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'1234',
        database:'back_project_2',
        //存入4字节的表情时，除了mysql改为utf8mb4,此处连接也需改为utf8mb4
        charset:'utf8mb4'
    }

module.exports = config

正常插入有两种方式
有特殊字符时需使用方式2
方式1
await queryback(`insert into artical (username,pagename,textpage,htmlpage) values ('${myusername}','${textname}','${textpage}','${htmlpage}')`)

//此处必须这么写，因为文本可能中含有单引号，方式1写法会引起mysql的报错，
//而下面的方式2写法直接可以不用考虑单引号及其他特殊字符引起的变化

方式2
await queryback(`insert into artical (username,pagename,textpage,htmlpage,comments) values (?,?,?,?,?)`, [myusername, name, textpage, htmlpage, desc])

在配置连接池时，也无需过多的操作，只需加一个参数即可
const config = require('./dbconfig')
const mysql = require('mysql')

//创建连接池
let pool =mysql.createPool(config);

此处的p就是插入操作中的数组[myusername, name, textpage, htmlpage, desc]
function queryback(sql,p){
    return new Promise((resolve,reject)=>{
        
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }else{
            //事件驱动回调
            connection.query(sql,p,(err,data)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(data)
                }
            });
            //释放连接
            connection.release();
        }
        })
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports = queryback
```

#### 2、内连接

```
基础模型
1、
select * from user where '...'
2、
select * from user u 
join  test t on t.pagename = u.pagename where '...'
3、
select * from user u 
join  test t on t.pagename = u.pagename
join  exam e on e.pagename = e.pagename
where '...'
4、
select 查询列表 from 表
[where 筛选条件]
group by 分组的字段
[order by 排序的字段];
5、
数据排序 
升序   asc
降序   desc
6、将有同一个用户名的不同标签的表混合成只有一行，将标签内容整合成一行，类似于数组
例：select b.pagename,GROUP_CONCAT(b.classname SEPARATOR ',')
from textclass b
GROUP BY b.pagename

7、混合示例
select a.pagename,a.username,a.writetime,a.comments,c.classname,d.id from  artical a 
join 
(select b.pagename,
GROUP_CONCAT(b.classname SEPARATOR ',') classname
from textclass b
GROUP BY b.pagename) c 
on a.pagename=c.pagename 
join articalcollect d 
on d.pagename = c.pagename
where d.username = 'test' 
ORDER BY a.writetime DESC
```

