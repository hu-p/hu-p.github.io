---
title: Vue杂记（一）———子调用父值
---
# Vue杂记（一）———子调用父值

## 一、在Vue中展示本地pdf文档

### 1、官方给出的方案，详见[vue-pdf-npm](https://www.npmjs.com/package/vue-pdf)

此方法仅限于展示第一页pdf，无法多张展示

```vue
//官方给出的展示
<template>
  <pdf src="./static/relativity.pdf"></pdf>
</template>
 
<script>
import pdf from 'vue-pdf'
 
export default {
  components: {
    pdf
  }
}
```

### 2、pdf文件展示全部页面

此方法可以展示一个pdf文件的所有内容，但是局限于已录入的路径，无法接收父组件传入的路径

```vue
//模板：查看多页pdf
<template>
  <div>
    <pdf 
        v-for="i in numPages" 
        :key="i" 
        :src="src" 
        :page="i" 
        style="display: inline-block; width: 80%">
    </pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";

var loadingTask = pdf.createLoadingTask("pdf文件所在路径");

export default {
  components: {
    pdf
  },

  data() {
    return {
      src: loadingTask,
      numPages: undefined
    };
  },

  mounted() {
    this.src.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  }
};
</script>
```

### 3、接收父组件传入的路径，然后在子组件中展示出来

```vue
//父组件
<template>
  <el-container style="height:660px;border: 1px solid #eee">
    <el-aside style="height: 100% ;background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']">      //在页面中显示1，2，3的下拉栏打开，其他的下拉栏关闭
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>可行性分析</template
          >
          <el-menu-item index="1-1">
            <button v-on:click="test(1)">示例</button>   //v-on 用于绑定html事件，点击按钮，即更新count值
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>需求分析</template
          >
          <el-menu-item index="2-1">
            <button v-on:click="test(2)">示例</button>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>总体设计</template
          >
          <el-menu-item index="3-1">
            <button v-on:click="test(3)">示例</button>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-message"></i>详细设计</template
          >
          <el-menu-item index="4-1">
            <button v-on:click="test(4)">示例</button>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-message"></i>编程</template>
          <el-menu-item index="5-1">
            <button v-on:click="test(5)">示例</button>
          </el-menu-item>
          <el-menu-item index="5-2">作业提交</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-message"></i>编程</template>
          <el-menu-item index="6-1">
            <button v-on:click="test(6)">示例</button>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

     <el-main >
    <el-container >
        <test :count="count"></test>  
      //此处为向子组件绑定的值，:count中的:为v-bind的缩写，而count为任意的命名，"count"中的count为 data()中的值
      </el-container>
    </el-main>
    </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  width: 300px;
}
</style>

<script>
import test from "./test";         //将暴露出的子组件导入

export default {
  data() {
    return {
      count: "/static/img/proimg/welcome.pdf",
    }
  },
  components: {
    test                        //使用子组件test
  },
  methods: {                     //上文的按钮所触发事件的函数
    test: function(n) {
      switch (n) {
        case 1:
          console.log("我是可行性分析");
          this.count = "/static/img/proimg/1.可行性分析.pdf";
          break;
        case 2:
          console.log("我是需求分析");
          this.count = "/static/img/proimg/2.需求分析.pdf";
          break;
        case 3:
          console.log("我是总体设计");
          this.count = "/static/img/proimg/3.总体设计.pdf";
          break;
        case 4:
          console.log("我是详细设计");
          this.count = "/static/img/proimg/4.详细设计.pdf";
          break;
        case 5:
          console.log("我是编程");
          this.count = "/static/img/proimg/5.编程.pdf";
          break;
        case 6:
          console.log("我是环境搭建");
          this.count = "/static/img/proimg/6.环境搭建.pdf";
          break;
      }
    }
  }
};
</script>




//子组件
<template>
  <div>
    <pdf 
        v-for="i in numPages" 
        :key="i" 
        :src="src" 
        :page="i" 
        style="display: inline-block; width: 80%">
    </pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";


export default {
  components: {
    pdf
  },
  data() {
    return {
      src: '',
      numPages: undefined
    };
  },
  watch:{
    count(n,o){                        //n为新值,o为旧值;
      this.src = n;                    //利用监听的方式去调用函数
      this.pdfTask(this.src);
    }
},
  props: ['count'],             //接收父组件传的值
   mounted() {   
     this.b=this.count;       //钩子函数，在页面加载时就运行函数
     this.pdfTask(this.b);     //调用padTask函数
   } ,
  methods: { 
      pdfTask(count) {            //由于无法将props的数据传入导script主体/script中，即以函数形式运行pdf.createLoadingTask方式
      var self = this           
      var loadingTask = pdf.createLoadingTask(count)    //解析该路径下的所有pdf页面
      loadingTask.promise.then(pdf => {
      self.src = loadingTask
      self.numPages = pdf.numPages
      })
      }
  },
};
</script>
```

## 二、杂记之传值监听

### 1、props传值

简单的props传值，就是父组件将某一值传入到子组件中

```vue
//父组件
<template>
<div :count="count"></div>
</template>
<script>
export default {
  data() {
    return {
      count: "/static/img/proimg/welcome.pdf",
    }
  }
}
</script>

子组件
<template>
<div>{{count}}</div>
</template>
<script>
export default {
   props: ['count'],            //此处的count无法被data接收，而methods等可通过this.count调用
  data() {
    return {
      count: "/static/img/proimg/welcome.pdf",
    }
  }
}
</script>
```

### 2、如需使data接收到props中的数据 ，详见[**pros**](https://cn.vuejs.org/v2/guide/components-props.html)

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

额外的，每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：

   ```vue
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```
2. **这个 prop 以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

   ```
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```
3. 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

### 3、监听机制 详见[监听](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E4%BE%A6%E5%90%AC%E5%B1%9E%E6%80%A7)

#### **计算属性computed :**

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算
2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化
3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props     中的数据通过计算得到的值
4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed
5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和 一个set方法，当数据变化时，调用set方法。

#### **侦听属性watch：**

1. 不支持缓存，数据变，直接会触发相应的操作；
2. watch支持异步；
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 当一个属性发生变化时，需要执行对应的操作；一对多；
5. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，

   .  immediate：组件加载立即触发回调函数执行，

   .  deep: 深度监听，为了发现**对象内部值**的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要  这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

## 三、for循环 详见[for](https://cn.vuejs.org/v2/guide/list.html)

```vue
<template>
  <div class="content">
    <ul>

      <li v-for="(item) in list"  v-bind:key="item.id">
         {{item.name}}
         <br/>
         {{item.id}}
         <br/>
      <>
    </ul>
    <button v-on:click="add">添加新元素<tton>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      list : [
        {
          id:1,
          name:'test'
        },
        {
          id:2,
          name:'test2',
        },
        {
          id:3,
          name:'test3'
        },
      ],
      newid:4,
    }
  }
  ,
  methods:{
    add:function () {
      this.list.splice(2,0,{id:this.newid++,name:"新加入元素"})
    }
  }
}
</script>
```
