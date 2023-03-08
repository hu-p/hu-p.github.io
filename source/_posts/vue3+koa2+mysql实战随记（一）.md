---
title: Vue3+Koa2+Mysql实战随记（一）
---
# Vue3+Koa2+Mysql实战随记（一）

## 一、项目创建

### 一、vue3项目创建的两种方法

#### 1) 使用 vue-cli 创建

[文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

```vue
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project

运行项目一般用
npm run serve

此处会因为不兼容会出现bug，使用脚手架创建vue3项目启动不了，时间2021.7.21，
解决办法
打包的vue的版本3.1.3有问题
删掉，换成3.1.2
npm uninstall vue
npm install vue@3.1.2
```

Please pick a preset - 选择 Manually select features
Check the features needed for your project - 选择上 TypeScript ，特别注意点空格是选择，点回车是下一步
Choose a version of Vue.js that you want to start the project with - 选择 3.x (Preview)
Use class-style component syntax - 直接回车
Use Babel alongside TypeScript - 直接回车
Pick a linter / formatter config - 直接回车
Use history mode for router? - 直接回车
Pick a linter / formatter config - 直接回车
Pick additional lint features - 直接回车
Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
Save this as a preset for future projects? - 直接回车

#### 2) 使用 vite 创建

[文档](https://v3.cn.vuejs.org/guide/installation.html)

```vue
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```

- vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，
- 它做到了***本地快速开发启动***, 在生产环境下基于 Rollup 打包。
  - 快速的冷启动，不需要等待打包操作；
  - 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
  - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

### 二、创建koa2项目

```js
# 项目初始化
npm init -y

# 安装koa2
npm i koa2 -S

运行项目一般用
node app.js
可通过npm i -s nodemon 配置热启动，nodemon app.js
如果nodemon app.js，即使用npx nodemon app.js
```

## 二、项目搭建时的问题

### 一、前端vue3+element-plus

**由于vue3相对于vue2变化较大，组件element不兼容，故相应的推出了element-plus**

```js
1、对于引用element-plus的组件，存在一些深层的样式不容易修改，例如el-input的输入框背景颜色，故使用deep或>>>修改，
另外还需为style加上scoped,将修改的内容影响限定在该页面
/* 此处需要深层次修改，故用>>>和/deep/，不过vue3提示用:deep() 
   其中el-input__inner为深层的input标签的class名 */
:deep().el-input__inner {
    background-color: transparent;
    color: turquoise;
   }

衍生：span不换行盒子，div换行盒子
     设置display:flex,然后可使用弹性盒子flex，极度方便，详情可见https://www.runoob.com/w3cnote/flex-grammar.html
     亦可参见阮一峰的grid，http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
     还有camvas画布，

2、不存在页面或错误页面的显示，在vue2中可以直接path:'*'即可，但是vue3需要'/:catchAll(.*)'
{
    path: '/:catchAll(.*)',
    name: 'Not Found',
    component: () => import('../views/404.vue')
  }

3、路由守卫
//to值访问路由，from跳转路由，next执行下一项
router.beforeEach((to, from, next) => {
    //此处的isToken为得到，后端登录后生成并录入浏览器的token
  const isToken = localStorage.elementToken ? true : false;
    //未登录时，如果遇到以下三个页面放行，否则跳转至登录页面
  if(to.path == '/login' || to.path == '/register' || to.path == '/forget'){
    next()
  }else{
    isToken ? next() : next('/login')
  }
  
 4、页面实例分析
 <template>
<div class="register-b">
  <div class="register">
    <h3>注册页面</h3>
    //以下为form表单，详情参考element-plus组件
    <el-form
    //绑定数据
      :model="registerData"
    //是否显示必填字段的标签旁边的红色星号
      hide-required-asterisk="false"
    //输入规则
      :rules="rules"
    //显示输入对错的图标
      status-icon
    //表单验证，ref 绑定控件，$refs 获取控件
      ref="registerForm"
    //标签大小
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <el-input
          type="email"
          v-model="registerData.email"
        //输入框中的文字
          placeholder="请在此处输入邮箱"
          //输入框内开头的图标
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          type="text"
          style="width:50%"
          v-model="registerData.code"
          placeholder="请在此处输入验证码"
          prefix-icon="el-icon-s-promotion"
        ></el-input>
        <span class="jianju"
          ><time-yan-zheng :email="registerData.email"> </time-yan-zheng
        ></span>
      </el-form-item>

      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="registerData.username"
          placeholder="请在此处输入昵称"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="registerData.password"
          placeholder="请在此处输入密码"
          prefix-icon="el-icon-lock"
    //提供密码显示的功能
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          type="password"
          v-model="registerData.password2"
          placeholder="请在此处输入密码"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
      <div class="input-button">
        <el-button
          type="primary"
          @click="submitForm('registerForm')"
          class="res"
          >注册</el-button
        >
      </div>

      <div class="input-link">
        <span class="login"
          ><el-button type="text" @click="topage('/login')"
            >用户登录</el-button
          ></span
        >
        <span class="forget"
          ><el-button type="text" @click="topage('/forget')"
            >忘记密码</el-button
          ></span
        >
      </div>
    </el-form>
  </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import timeYanZheng from "../components/emailTime/time.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    timeYanZheng,
  },
  setup() {
    const registerData = reactive({
      username: "",
      password: "",
      password2: "",
      code: "",
      email: "",
    });
  
     //此处的功能实现vue3中页面的跳转，通过点击时调用函数topage，跳转页面
    const router = useRouter();
    const topage = (path) => {
      router.push(path);
    };

    let validatePass = (rule, value, callback) => {
      if (value != registerData.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      //以下皆是输入框中的规则，可通过在数组中添加不同的对象实现，详情可见element-plus
      username: [
        { required: true, message: "用户名不得为空", trigger: "blur" },
        { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码不得为空", trigger: "blur" },
        { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
      ],
      password2: [
        { required: true, message: "密码不得为空", trigger: "blur" },
        { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
        { validator: validatePass, trigger: "blur" },
      ],
      code: [
        { required: true, message: "验证码不得为空", trigger: "blur" },
        { min: 6, max: 6, message: "长度应为6位", trigger: "blur" },
      ],
      email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        {
          type: "email",
          message: "请输入正确的邮箱地址",
          trigger: ["blur", "change"],
        },
      ],
    });

    return {
      registerData,
      rules,
      topage,
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);
        //检查表单，element-plus提供
      this.$refs[formName].validate((valid) => {
        if (valid) {
            //在写后端时，尽量返回ctx.resposes.status状态码,因为这样可直接通过element-plus在浏览器中显示效果出来，status               状态码返回的状态可在前端判判定，未成功不能进入下一个页面
            //通过axios访问后端，通过将第二个访问post包裹在第一个post的then里，可实现递进式访问
          this.$axios
            .post("./email/examEmail", this.registerData)
            .then(
              this.$axios
                .post("./login/register", this.registerData)
                .then((res) => {
                  console.log(res.data);
                })
            )
          
            //成功即打印
            .then((res) => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: "用户注册成功",
              });
              //当无误完成后，即跳转至登录页面
              this.$router.push("/login");
            });
          //     console.log(res.data);
          //     if (res.data.code === 0) {
          //       this.$router.push("/login");
          //     this.$message({
          //       type: "success",
          //       message: "用户注册成功",
          //     });
          //      }
          //      else{
          //        this.$message({
          //       type: "error",
          //       message: "用户注册失败",
          //     });
          //      }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
});
</script>

<style scoped>
.register-b {
  background: url("../assets/img/bg11.jpg") no-repeat center;
  height: 100vh;
  background-size: cover;
}

.register {
  width: 40vw;
  height: 70vh;
  background-color: rgba(17, 30, 131, 0.1);
  position: absolute;
    //通过函数，将盒子居中，推荐
  left: calc(50% - 40vw / 2);
  top: calc(50% - 70vh / 2);
    //flex弹性盒子的应用，两边对齐
  justify-content: space-between;
}

.jianju {
  margin-left: 1vw;
}

h3 {
  text-align: center;
}

.el-input {
  width: 80%;
}

.input-button {
  display: flex;
}

/* 此处需要深层次修改，故用>>>和/deep/，不过vue提示用:deep() */
:deep().el-input__inner {
    background-color: transparent;
    color: turquoise;
   } 

.el-button {
  margin: 0 auto;
}

.input-link {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.el-button.res {
  width: 67%;
}
.login {
  margin-left: 4vw;
}

.forget {
  margin-right: 4vw;
}
</style>

 5、验证码倒计时组件如下：
 
 time.vue
  
 <template>
      <el-button
        type="primary"
        class="yanzheng"
        @click="getCode()"
        :disabled="!login.canGet"
      >
        <div>
          <span v-show="!login.canGet">{{
            login.waitTime + "s后重新获取"
          }}</span>
          <span v-show="login.canGet">获取邮箱验证码</span>
        </div>
      </el-button>
</template>

<script>
import { defineComponent } from "vue";
import timeCountdown from "./time.js";

export default defineComponent({
  props: {
    email: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      registerData: {
        yanzhengma: "",
      },
      tempLogin: {
        //定义一个临时对象
        canGet: true,
        timer: null,
        waitTime: 60,
      },
    };
  },
  methods: {
    getCode() {
        //由于传过来的email为单一的值，而axios传回后端的为{}对象类型，
      console.log(1, this.login);
      let test ={
          email:this.email
      }
      this.$axios.post("/email", test).then((res) => {
        console.log(2, res.data);
        this.$message({
          type: "success",
          message: "验证码发送成功",
        });
      });

      //倒计时开始
      timeCountdown(this.login); //参数为最终对象
    },
  },
  computed: {
    login() {
      //最终对象
      if (!this.tempLogin.canGet) {
        console.log(this.email);
        return timeCountdown(this.tempLogin);
      } else {
        return this.tempLogin;
      }
    },
  },
});
</script>

<style>
.el-button.yanzheng {
  margin-left: 1vw;
  width: 9vw;
}

</style>

//time.js

function timeCountdown(obj) { //obj包括timer、waitTime 、canGet 
    const TIME_COUNT = 60; //默认倒计时秒数

    if (!obj.timer) {
        obj.waitTime = TIME_COUNT;
        obj.canGet = false;
        obj.timer = setInterval(() => {
            if (obj.waitTime>0 && obj.waitTime<=TIME_COUNT) {
                obj.waitTime--;
            }else{
                obj.canGet = true;
                clearInterval(obj.timer); //清空定时器
                obj.timer = null;
            }
        }, 1000)
    }
    return {
        timer: obj.timer,
        canGet: obj.canGet,
        waitTime: obj.waitTime
    }
}

export default timeCountdown


6、axios配置文件

axios.js

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
    //在浏览器头先生出相应的错误
  ElMessage.error(err.response.data.msg)
})

export default http

在main.js中导入axios

import axios from './axios.js'
const app = createApp(App);
app.config.globalProperties.$axios=axios;

7、引用阿里图标写一个组件
<template>
  <div :class="['iconfont', id, color]" :style="{fontSize: `${size}px`}">   
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props:{
      id: {
          type:String,
          default:""
      },
      color: {
          type:String,
          default:""
      },
      size: {
          type:[Number,String],
          default:40
      },
  }
})
</script>
<style>
</style>

8、根据不同的页面的路径判断是否展示某一模块
<template>
  <div class="home">
    <div class="wrapper">
      <layoutSlide icon-id="icon-wangluo" icon-color="text-warning" icon-size="45">
        Welcome to LongQue
      </layoutSlide>
      <div :class="(`${data}`)" style="max-height: 90vh">
        <layoutHead>
          <template #title>{{title}}</template>
          <template #dea>{{dea}}</template>
          <template #good>您已被赞{{praise}}次！</template>
        </layoutHead>
        <transition enter-active-class="animate__animated animate__zoomIn">
          <router-view></router-view>
        </transition>
      </div>
     <userProfile :src="src" />
    </div>

    <layout-footer></layout-footer>
  </div>
</template>

<script lang="ts">
import { 
         defineComponent,
         } from 'vue';
import userProfile from '../components/home/userProfile.vue'
import layoutSlide from '../components/home/layout/layoutSlide.vue'
import layoutHead from '../components/home/layout/layoutHead.vue'
import { computed} from 'vue'
import { useRouter } from 'vue-router';
import { praise } from '../components/introduction/sendData.js'
import LayoutFooter from '../components/home/layout/layoutFooter.vue';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const title = computed(() => {
      const {path } = router.currentRoute.value;
       //如果是根目录，即展示I'm，否则不展示
      return path === "/" ? "I'm" : "";
    })
    const dea = computed(() => {
      const {path, name } = router.currentRoute.value;
      return path === "/" ? "Mark" : name;
    })

    const data = computed(() => {
      const { path } = router.currentRoute.value;
        //如果是根目录，即宽度为100%，否则宽度为100，且有下拉条
      return path === "/" ? "w-100" : "w-100 pre-scrollable";
    });
   
     return{
       src: require('../assets/img/p1.jpg'),
       title,
       dea,
       praise,
       data
     }
  },
  components: {
    userProfile,
    layoutSlide,
    layoutHead,
    LayoutFooter
  },

});
</script>

<style>
.home {
  background: url("../assets/img/bg.jpg") no-repeat center;
  background-attachment: scroll;
  height: 100vh;
  background-size: cover;
}

.wrapper {
  width: 90vw;
  height: 90vh;
  background-color: rgb(44,48,80,0.1);
  position: absolute;
  left:calc(50% - 90vw / 2);
  top:calc(50% - 90vh /2);
  display: flex;
  justify-content: space-between;
}
</style>

```

### 二、后端koa2

```js
1、mysql数据库连接
config.js

let config
//数据库配置
 config = {
        host:'localhost',
        port:'3306',
        user:'root',
        password:'1234',
        database:'back_project_2'
    }

module.exports = config

db.js
const config = require('./config')
const mysql = require('mysql')

//创建连接池
let pool =mysql.createPool(config);

//基础
// //对数据库进行增删改查操作的基础
// function query(sql,callback){
//     //创建连接
//     pool.getConnection(function(err,connection){
//         connection.query(sql,function(err,rows){
//             //表示连接成功时有错误即抛出错误，没有错误即返回取得的数据
//             callback(err,rows)
//             //中断连接
//             connection.release()
//         })
//     })
// }

//直接使用含回调的即可
function queryback(sql){
    return new Promise((resolve,reject)=>{
      
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err)
            }else{
            //事件驱动回调
            connection.query(sql,(err,data)=>{
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

2、验证码发送
//验证码配置
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.163.com', // 服务 由于我用的163邮箱
    port: 465, // smtp端口 默认无需改动
    secure: true,
    auth: {
      user: '******@163.com', // 邮箱用户名
      pass: '**********' // SMTP授权码  //邮箱设置中开启
    }
}));

const randomFns=()=> { // 生成6位随机数
    let code = ""
    for(let i= 0;i<6;i++){
        code += parseInt(Math.random()*10)
    }
    return code 
}
 
const regEmail=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

 const emailModel = async(EMAIL,code,call) => {
    transport.sendMail({
      from: '******@163.com', // 发件邮箱，须根上面的邮箱用户名一样
      to: EMAIL, // 收件列表
      subject: '验证你的电子邮件', // 标题
      html: `
      <p>你好！</p>
      <p>您正在注册龙雀社区账号</p>
      <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
      <p>***该验证码5分钟内有效***</p>` // html 内容
    }, 
    (error, data) => {
      if(error){
       call (false)
      }else{
       call (true)
      }
      // console.log(1,error)
      // console.log(2,data)
      transport.close(); // 如果没用，关闭连接池
    })
    //....验证码发送后的相关工作 
  }

  module.exports = {
      regEmail,
      randomFns,
      emailModel
  }

调用验证码
const Router = require('koa-router');
const queryback = require('../util/db/db.js')
const email = new Router();

const {
    regEmail,
    emailModel,
    randomFns
} = require('../util/email/emailConfig')


//注册验证码
email.post('/', async (ctx, next) => {
    let Email = ctx.request.body.email
    console.log(Email);
    let find = await queryback(`select email from user where email = '${Email}'`)
    // console.log(find);
    if (!find || find.length === 0) {
        let code = randomFns()
        console.log(code);
        if (regEmail.test(Email)) {
            await queryback(`insert into emails (email,code) values ('${Email}','${code}')`)
          
            //重点，化为异步之后方可实现返回验证码发送之后的结果
            //await是异步的标志，new promise是异步的施行
            let dd = await new Promise((resolve, reject) => {
                emailModel(Email, code, (call) => {
                    resolve(call)
                })
            })
            console.log(dd)
            if (dd === true)
               {
                   ctx.response.status = 200
                   ctx.body = {
                       code: 0,
                       msg: '验证码已发送'
                   }
                    setTimeout(async () => { //5分钟后失效
                    await queryback(`delete from emails where email = '${Email}'`)
                }, 1000 * 60 * 5)
               }else{
                ctx.response.status = 200
                ctx.body = {
                    code: 0,
                    msg: '验证码发送失败，请稍后再试'
                }
               }
             
        } else {
            // assert(false,422,'请输入正确的邮箱格式！')
            ctx.response.status = 422
            ctx.body = {
                code: 0,
                msg: '请输入正确的邮箱格式'
            }
        }
    } else {
        ctx.response.status = 400
        ctx.body = {
            code: -1,
            msg: '该邮箱已注册'
        }
    }
})

//校验验证码
email.post('/examEmail', async (ctx) => {
    const email = ctx.request.body.email
    const code = ctx.request.body.code
    const examE = await queryback(`select * from emails where email = '${email}' and code = '${code}'`)
    if(!examE || examE.length ===0){
        ctx.response.status = 400
                ctx.body = {
                    code: 0,
                    msg: '验证码错误，请稍后再试'
                }
    }else {
        ctx.response.status = 200
                ctx.body = {
                    code: 0,
                    msg: '验证码填写正确'
                }
    }
})

module.exports = email;

3、加密、解密
配置md5.js

const crypto = require('crypto')

function md5(s){
  // 给密码加密
    //注意参数需要为string类型，否则会报错
    return crypto.createHash('md5').update(String(s)).digest('hex');
}

module.exports = {
    md5,
    // 处理密码的密钥
    PWD_SALT:'xd_node',
    // 处理token的密钥
    PRIVATE_KEY:'xd_blog',
    // token的过期时间
    EXPIRESD:60*60*24
}

login.js

const Router = require('koa-router');
const queryback = require('../util/db/db.js')
const login = new Router();

const {
    md5,
    PWD_SALT,
    PRIVATE_KEY,
    EXPIRESD
} = require('../util/encrpytion/md5.js')
const jwt = require('jsonwebtoken')

//注册接口
login.post('/register', async (ctx, next) => {
    let myusername = ctx.request.body.username
    let mypwd = ctx.request.body.password
    let myemail = ctx.request.body.email
    console.log(myusername, mypwd, myemail);
    // 查询有无相同的用户名
    let regis = await queryback(`select * from user where username = '${myusername}'`)
    // 用户名不存在
    if (!regis || regis.length === 0) {
        // 调用加密方法给密码加密
        mypwd = md5(`${mypwd}${PWD_SALT}`)
        // 然后再插入到数据库
        await queryback(`insert into user (username, password, email) values ('${myusername}','${mypwd}','${myemail}')`)
        ctx.response.status = 200
        ctx.body = {
            code: 0,
            msg: "注册成功！"
        }
    } else {
        ctx.response.status = 400
        ctx.body = {
            code: -1,
            msg: "账号已存在，请重新注册！"
        }
    }
})

//更新密码
login.post('/forget', async(ctx) => {
    let mypwd = ctx.request.body.password
    let myemail = ctx .request.body.email
    console.log(mypwd, myemail);
    let regis = await queryback(`select * from user where email = '${myemail}'`)
    // 邮箱不存在
    if (!regis || regis.length === 0) {
        ctx.response.status = 400
        ctx.body = {
            code: -1,
            msg: "邮箱未注册，请先注册！"
        }
    } else {
        // 调用加密方法给密码加密
        mypwd = md5(`${mypwd}${PWD_SALT}`)
        // 然后再插入到数据库
        await queryback(`update user set password = '${mypwd}' where email = '${myemail}'`)
        ctx.response.status = 200
        ctx.body = {
            code: 0,
            msg: "修改成功！"
        }
      
    }
})

//登录接口
login.post('/', async (ctx, next) => {
    let myusername = ctx.request.body.username
    let mypwd = ctx.request.body.password
    let user = await queryback(`select username,email from user where username = '${myusername}' or email = '${myusername}'`)
    console.log(myusername, mypwd);
    console.log(user);
    if (!user || user.length === 0) {
        //用户名不存在
        //返回时必须返回status,status状态码可与前端element-ui中的form表单一起使用，可以判断
       ctx.response.status = 400
        ctx.body = {
            code: -1,
            msg: '该账号不存在'
        }
    } else {
        // 调用加密方法给密码加密
        console.log(myusername,mypwd);
        mypwd = md5(`${mypwd}${PWD_SALT}`)
        // 把加密过后的密码以及用户名 和 数据库的数据  匹配
        let result = await queryback(`select * from user where username = '${myusername}' or email = '${myusername}' and password = '${mypwd}'`)
        console.log(result);
        if (!result || result.length === 0) {
            ctx.response.status = 404
            ctx.body = {
                code: -1,
                msg: '账号或密码不正确'
            }
        } else {
            // 如果该结果存在说明登录成功，则生成token
            let token = jwt.sign({
                myusername
            }, PRIVATE_KEY, {
                expiresIn: EXPIRESD
            })
            ctx.response.status = 200
            ctx.body = {
                code: 0,
                msg: '登录成功',
                token: token
            }
        }
    }
})

// 获取用户信息
login.get('/info', async (ctx, next) => {
    // 这个req是经过了 koaJwt拦截token 后得到的对象  req.user可得到解密后的token信息
    // console.log(ctx.request.body.user);
    let token = ctx.request.header.authorization.split(" ")[1];
    console.log(token);
    if (token) {
        let jiemi = await jwt.verify(token, PRIVATE_KEY, (err, data) => {
            console.log(data);
            return data
        })
        let myusername = jiemi.myusername
        console.log(myusername);
        let userinfo = await queryback(`select test from user where username = '${myusername}'`)
        console.log(userinfo);
        ctx.response.status = 200
        ctx.body = {
            code: 0,
            msg: '成功',
            data: userinfo
        }
    }
})

module.exports = login;

4、在前端中已经通过判定生成的token进行放行(可设置直接放行)，在后端中也需在app.js中设置放行

//整个函数的入口
const Koa = require("koa2");  //构造函数
const app = new Koa();   //声明一个实例
const port = 5030;   //端口号
const router = require('../router/index.js');
const {PRIVATE_KEY} = require('../util/encrpytion/md5.js')
const koaBody = require('koa-body')
const koaJWT = require('koa-jwt')

const cors = require('koa2-cors')
app.use(cors())

// 使用kaoJwt拦截token
app.use(koaJWT({
    // 解密 密钥
    secret: PRIVATE_KEY,
    algorithms: ["HS256"]
   }).unless({
    path: [
    '/home',
    '/list',
    '/login',
    '/login/register',
    '/email',
    '/email/examEmail',
    '/email/forget',
  
  ] //⽩名单,除了这⾥写的地址，其 他的URL都需要验证
   }));

app.use(koaBody());

/*
   router.routers()的作用是：启动路由
   router.allowedMethods()的作用是：允许任何请求(get,post,put)
*/
app.use(router.routes(),router.allowedMethods())
//路由重定向


//调用中间件
// app.use( async (ctx)=>{
//    //返回数据给页面 ctx.response.body=""
//    ctx.response.body = "Hello,Koa";
// })

app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})

5、多层路由
index.js
const Router = require('koa-router');
const router = new Router();

const login =require('./login.js')

router.use('/login',login.routes(),login.allowedMethods());

//路由重定向
//修改此处重定向时，需要将当前初始页填入第一个，将修改的的填入第二个，方可成功修改，原因未知
router.redirect('/home','/list');

module.exports = router;
```

在结合Vue3+Element-plus+mysql开发中，后端最好返回如下

```js
ctx.response.status = 400
        ctx.body = {
            code: 0,
            msg: '成功',
            data: userinfo
        }
```

status状态码返回的状态码可在前端判判定，未成功不能进入下一个页面

参考链接：

[b站视频1，进主页查看所有](https://www.bilibili.com/video/BV1oK4y147t8)

[b站视频2](https://www.bilibili.com/video/BV1dz4y1X79Z)

[koa2文档](http://codesohigh.com/subject/koa2/koa2.html)
