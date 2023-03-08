---
title: Vue-router路由传递
---
# Vue-router路由传递

## 一、在components中建立组件，并将其暴露

```javascript
//该文件名位files.vue
<template>
  
</template>

<script>
export default {
       name: 'files'   //可不写名称，export是暴露到环境，import是从环境中导入
}
</script>

<style>
  
</style>
```

## 二、主目录下main.js中使用router

```javascript
//main.js,文件建立时已存在
import Router from 'vue-router'

Vue.use(Router);                  //使用Router路由功能
```

## 三、在src中建立router文件夹，且在router文件夹下建立一个index.js文件

```js
//index.js
//该文件夹表示存放存放路由的相关配置
//index.js存放的路由具体内容（即：跳转页面功能的实现）

import Vue from 'vue'       //引用Vue
import Router from 'vue-router'   //引用Roter
import example from '../components/project/example'  //即将跳转至的组件
import 组件名称 from '组件路径'

Vue.use(Router)          //使用Router

export default new Router({         //将其暴露出去，且实例Roter
  routes: [
    {   //同级路由1
      path: '/renyi',             //路由路径
      name: 'files'               //路由名称，可不写
      component: example          //组件
    }
    ,
    {   //同级路由2
      path: '/XX',             //路由路径
      name: 'XX'               //路由名称，可不写
      component: 组件名称 ,         //组件
      children: [              //子路由即在父路由下添加children
        {   //子路由1
          path: '/XX',             //路由路径
          name: 'XX'               //路由名称，可不写
          component: 组件名称
        }
        ,
        {
         子路由2   
         }
        ]
    }
  ]
})
```

## 四、在main.js中导入写好的路由

```javascript
//只需在步骤二的基础上添加
import roter from './router'

new Vue({
    router           
})
```

## 五、路由的使用

```vue
//路由的使用
//首先，需要在使用的位置使用<router-view />

//链接可跳转
<router-link to="/renyi">跳转</router-link>   //此处的renyi为路由文件中的路由路径
```
