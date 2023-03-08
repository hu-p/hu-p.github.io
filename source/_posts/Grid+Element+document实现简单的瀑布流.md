---
title:Grid+Element+document实现简单的瀑布流
---
# Grid+Element+document实现简单的瀑布流

**<u>原理：通过对应的Grid布局可以实现图片的拼接式的布局(列宽固定，行高不固定，自由组合)，Element中el-image的preview-src-list实现了图片预览(preview-src-list接受的为数组)，为了让图片瀑布流可以循环展示或者获取更多的图片，可以通过对页面的滚动条是否到达底部时进行判断，当到达底部时，则触发函数</u>**

## 一、Grid布局+Element大图预览

```
采用vue3编写
思路：从服务端获取到对应的图片的链接，如果需要使用大图预览的功能，则需要将服务端传过来的对象数组转化成图片路径的数组，然后用preview-src-list展示，开启懒加载:lazy="true"，
懒加载：简单的理解就是加载你当前看到的图片，你看不到的等你下拉滚动栏后再加载

template 部分
<template>
  <!-- 图片瀑布流展示，使用的为grid -->
  <div class="home-picture-cont">
    <div
      v-for="(item, index) in picturelist.list"
      :key="index"
      :class="['home-picture-cont-img']"
      :style="gridHegiht(item.path)"
    >
      <!-- preview-src-list接受的是数组，故将字符改为数组 -->
      <!-- <img :src="item.filepath" alt=""> -->
      <el-image
        :src="item.path"
        :preview-src-list="picturelist.arrNew"
        :lazy="true"
      >
      </el-image>
    </div>
  </div>
</template>

js-grid划分部分
思路：由于知识有限，有个img.height第一次一直都是0的bug，所以转换了思路，若img.height=0时，则主动为其赋值
img.onload是个异步操作，无论怎样img.height在第一次都是0，亦或者img.height有值，但是在第一次加载时浏览器页面始终获取不到height的值，所以在第一次加载时主动为其赋值，在第二次时，浏览器可以获取到值，则开始了拼接式的布局，其余详情参看注解

    const gridHegiht = (imgUrl) => {
      //  img = new Image(); 定义Image对象的src: a.src=”xxx.gif”; 这样做就相当于给浏览器缓存了一张图片
      let img = new Image();
      img.src = imgUrl;
      //   创建一个匿名函数并立刻执行可以
      //   (function (x) { return x * x }) (3);
      //   但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括 起来
      //   img.onload = function() {}图片加载事件
      return (img.onload = function() {
        // 此处最开始加载时，img.src已被赋值，但是img.height等值还未来的及渲染，故为0，所以需要刷新页面，将其渲染上去
        let heightSm = "";
        let width = img.width;
        let height = img.height;
        if (img.height === 0) {
          heightSm = {
            // 举例：grid-row: 1 / span 2; 行 1 开始并横跨两行
            // 从某行开始跨parseInt(height / (width / 20))列，此处可根据图片之间的比例精准操作
            "grid-row": "auto / span 15",
          };
        } else {
          heightSm = {
            // 举例：grid-row: 1 / span 2; 行 1 开始并横跨两行
            // 从某行开始跨parseInt(height / (width / 20))列，此处可根据图片之间的比例精准操作
            "grid-row":
              "auto / span " + `${parseInt(height / parseInt(width / 20))}`,
          };
        }
        console.log(2255, heightSm);
        return heightSm;
      })();
    };


css部分
<style lang="scss">
.home-picture-cont {
  width: 100%;
  // 为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
  // 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度
  // 相当于后文中的100%已经是减去啦边框后的数据啦
  box-sizing: border-box;
  //   内距上下0px,左右10px
  padding: 0 10px;
  display: grid;
  //   列宽自动填充，每列宽度calc(calc(100% - 20px) / 3)，然后自动填充，直到容器不能放置更多的列
  //   此处的除数就是有多少列，三行所以减20px，因为列于列之间间隔10px
  grid-template-columns: repeat(auto-fill, calc(calc(100% - 20px) / 3));
  // 浏览器自动创建的多余网格的行高，如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的行高。列类似
  grid-auto-rows: 10px;
  //   列间隔10px
  column-gap: 10px;
  //   表示"先行后列"，并且尽可能紧密填满，尽量不出现空格
  grid-auto-flow: row dense;
  .home-picture-cont-img {
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    //超出隐藏
    overflow: hidden;
    img {
      display: block;
      max-width: 100%;
    }
  }
}
</style>
```



## 二、滚动条到底判断

```
思路：
    判断滚动条到底部，需要用到DOM的三个属性值，即scrollTop、clientHeight、scrollHeight。
     scrollTop为滚动条在Y轴上的滚动距离。
     clientHeight为内容可视区域的高度。
     scrollHeight为内容可视区域的高度加上溢出（滚动）的距离。
     从这个三个属性的介绍就可以看出来，滚动条到底部的条件即为scrollTop + clientHeight == scrollHeight
 
 //滚动条在Y轴上的滚动距离
    function getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }
    //文档的总高度
    function getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }
    //浏览器视口的高度
    function getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
    window.onscroll = function() {
      if (getScrollHeight() - getScrollTop() - getWindowHeight() < 1) {
       alert("you are success");
      }
    };
```



三、完整代码

```
<template>
  <!-- 图片瀑布流展示，使用的为grid -->
  <div class="home-picture-cont">
    <!-- <button @click="shuaxing"></button> -->
    <div
      v-for="(item, index) in picturelist.list"
      :key="index"
      :class="['home-picture-cont-img']"
      :style="gridHegiht(item.path)"
    >
      <!-- preview-src-list接受的是数组，故将字符改为数组 -->
      <!-- <img :src="item.filepath" alt=""> -->
      <el-image
        :src="item.path"
        :preview-src-list="picturelist.arrNew"
        :lazy="true"
        infinite
      >
      </el-image>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, onMounted, reactive,ref} from "vue";

export default defineComponent({
  setup() {
    let axios = inject("axios");
    
    let count = ref(1)

    let picturelist = reactive({
      list: [],
      arrNew: [],
      listcopy:[],
    });

    //转化数组
    let listarr = () => {
      picturelist.list.forEach((item) => {
        picturelist.arrNew.push(item.path);
      });
    };
    //滚动条到底触发获取新的图片
    let addimglist = () => {
        count.value += 1
        console.log(666555,count.value);
       axios
        .get("/otherapi/wallhaven/" + count.value)
        .then((res) => {
          picturelist.list =  picturelist.list.concat(res.data.imgs) 
        // addimglist()
          listarr();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const gridHegiht = (imgUrl) => {
      //  img = new Image(); 定义Image对象的src: a.src=”xxx.gif”; 这样做就相当于给浏览器缓存了一张图片
      let img = new Image();
      img.src = imgUrl;
      //   创建一个匿名函数并立刻执行可以
      //   (function (x) { return x * x }) (3);
      //   但是由于JavaScript语法解析的问题，会报SyntaxError错误，因此需要用括号把整个函数定义括 起来
      //   img.onload = function() {}图片加载事件
      return (img.onload = function() {
        // 此处最开始加载时，img.src已被赋值，但是img.height等值还未来的及渲染，故为0，所以需要刷新页面，将其渲染上去
        let heightSm = "";
        let width = img.width;
        let height = img.height;
        if (img.height === 0) {
          heightSm = {
            // 举例：grid-row: 1 / span 2; 行 1 开始并横跨两行
            // 从某行开始跨parseInt(height / (width / 20))列，此处可根据图片之间的比例精准操作
            "grid-row": "auto / span 15",
          };
        } else {
          heightSm = {
            // 举例：grid-row: 1 / span 2; 行 1 开始并横跨两行
            // 从某行开始跨parseInt(height / (width / 20))列，此处可根据图片之间的比例精准操作
            "grid-row":
              "auto / span " + `${parseInt(height / parseInt(width / 20))}`,
          };
        }
        console.log(2255, heightSm);

        return heightSm;
      })();
    };

    onMounted(() => {
      axios
        .get("/otherapi/wallhaven/" + count.value)
        .then((res) => {
          console.log(res.data);
          picturelist.list = res.data.imgs
          listarr();
        })
        .catch((err) => {
          console.log(err);
        });
    });

    //滚动条在Y轴上的滚动距离
    function getScrollTop() {
      var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop =
        bodyScrollTop - documentScrollTop > 0
          ? bodyScrollTop
          : documentScrollTop;
      return scrollTop;
    }
    //文档的总高度
    function getScrollHeight() {
      var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight =
        bodyScrollHeight - documentScrollHeight > 0
          ? bodyScrollHeight
          : documentScrollHeight;
      return scrollHeight;
    }
    //浏览器视口的高度
    function getWindowHeight() {
      var windowHeight = 0;
      if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
    window.onscroll = function() {
      if (getScrollHeight() - getScrollTop() - getWindowHeight() < 1) {
        addimglist()
      }
    };


    return {
      picturelist,
      gridHegiht,
    };
  },
});
</script>

<style lang="scss">
.home-picture-cont {
  width: 100%;
  // 为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
  // 通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度
  // 相当于后文中的100%已经是减去啦边框后的数据啦
  box-sizing: border-box;
  //   内距上下0px,左右10px
  padding: 0 10px;
  display: grid;
  //   列宽自动填充，每列宽度calc(calc(100% - 20px) / 3)，然后自动填充，直到容器不能放置更多的列
  //   此处的除数就是有多少列，三行所以减20px，因为列于列之间间隔10px
  grid-template-columns: repeat(auto-fill, calc(calc(100% - 20px) / 3));
  // 浏览器自动创建的多余网格的行高，如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的行高。列类似
  grid-auto-rows: 10px;
  //   列间隔10px
  column-gap: 10px;
  //   表示"先行后列"，并且尽可能紧密填满，尽量不出现空格
  grid-auto-flow: row dense;
  .home-picture-cont-img {
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    //超出隐藏
    overflow: hidden;
    img {
      display: block;
      max-width: 100%;
    }
  }
}
</style>

```





