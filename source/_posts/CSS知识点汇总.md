---
title: CSS知识点汇总
---

# CSS知识点汇总

```css
/*css可以认为时由多个选择器组成的集合，每个选择器由3个基本部分组成---"选择器名称"、"属性"、"值"*/
selector {
    property:value;
}
/*其中selector由不同的形式，包括HTML的标记(例如<body>、<table>、<p>等)，也可以是用户自定义的*/
/*标记；property是选择器的属性；value指定了属性的值*/

/*标记选择器*/
/*诸如<p>、<h>、<div>等,可直接使用*/
tagName {
    property:value;
}

/*类选择器，用于控制页面中所有同类标记的显示样式*/
.className{
    property:value;
}
/*className是选择器的名称，具体名称由css制定者自己命名，如果一个标记具有class属性，且属性值为Na么，那么*/
/*该标记的呈现样式由该选择器指定。在定类选择符时，需要在className前面加一个句点"."*/

/*ID选择器，和类选择器在设置样式的功能类似，都是对特定属性的属性值进行设置。但ID选择器的一个重要功能是用做网页的唯一标识*/
.idName{
    property:value;
}
/*idName是选择器名称，可以由css定义者自己命名，如果某标记具有id属性，并且该属性值为idName，那么该标记的呈现样式由ID选择*/
/*器指定，在正常情况下，id属性值在文档中具有唯一性。在定于ID选择器时，需要在idName前面加一个"#"符号*/
#font1{
    font-family: "幼圆";
    color: blue;
 }
/*a.类选择器可以给任意数量的标记定义样式，但ID选择器在页面的标记中只能使用一次，因为如果一个HTML页面中有*/
/*  两个相同id的标记，那么JavaScript在查找id时将会发生错误*/
/*b.ID选择器比类选择器具有更高的优先级，即当ID选择器与类选择器在样式定义上发生冲突时，优先使用ID选择器定义的样式*/

/*行内样式*/
/*<h1 style="color:blue; font-style:bold"></h1> */

/*在html中内嵌css*/
/*<!DOCTYPE html> */
/*<html lang="en"> */
/*<head> */
/*<meta charset="UTF-8">*/
/*<style type=text/css>*/
/*h2{*/
/*   font-family: "幼圆";*/
/*   font-size: 16px;*/
/*   color: blue;*/
/*   }*/
/*.sp123{*/
/*    line-height: 140%;*/
/*    background-color: blue;*/
/*}*/
/*#id1{*/
/*    line-height: 150%;*/
/*    background-color: red;*/
/*}*/
/*</style>*/
/*</head>*/
/*<body>*/
/*<h2> 可直接调用</h2>*/
/*<p class="sp123">用class调用.sp</p>*/
/*<p id="id1">用id调用id1</p>*/
/*</body>*/
/*</html>*/
链接样式

/*CSS外部样式表mystyle.css*/
body{
    font-family: "宋体";
    font-size: 12px;
    background-color: #0000ff;
}
#first{
    font-family:"幼圆";
    color:red;
}
/*再完成一个HTML文件main.html*/
/*<!DOCTYPE html> */
/*<html lang="en"> */
/*<head> */
/*<meta charset="UTF-8">*/
/*<link href="mystyle.css" type="text/css" rel="stylesheet"/>*/
/*</head>*/
/*<body>*/
/*<p id="first"> 我是链接样式的主体</p>*/
/*</body>*/
/*</html>*/

/*<link>标记的几个属性*/
/*a.rel属性指明了链接属性，定义链接的文件和HTML文档之间的关系就设为stylesheet*/
/*b.href属性指出了样式表的位置，他只是个普通的URL地址，可以是相对地址，也可以是绝对地址*/
/*c.type属性指明了样式表的位置，对于级联样式表，它的取值为text/css*/

/*各种样式的优先级*/
/*行内样式的优先级高于嵌入样式；嵌入样式的优先级高于链接样式；链接样式的优先级高于导入样式*/

/*css复合选择器*/
/*交集选择器，是由两个选择器直接连接构成的，其中结果是选中两者各自作用范围的交集，其中，第一个*/
/*必须是标记选择器，第二个必须是类选择器或ID选择器，例如："h1.class1; p#id1"*/

tagName.className {
    property:value;
}
div.class1 {
    color: #91a0ff;
    font-size: 10px;
    font-weight: bold;
}

/*<!DOCTYPE html> */
/*<html lang="en"> */
/*<head> */
/*<meta charset="UTF-8">*/
/*<style>{*/
/*     div{*/
/*         color: blue;*/
/*         font-size: 9px;*/
/*     }*/
/*     .class1{*/
/*         font-size: 12px;*/
/*     }*/
/*     div.class1 {*/
/*         color: red;*/
/*         font-size: 10px;*/
/*         font-weight: bold;*/
/*     }*/
/* }*/
/*</style>*/
/*</head>*/
/*<body>*/
/*<div> 正常div标记，蓝色，9px </div>*/
/*<p class="class1">类选择器，12px</p>*/
/*<div class="class1" > 交集选择器，红色，加粗，10px</div>*/
/*</body>*/
/*</html>*/

/*并集选择器，对多个选择器进行集体声明，多个选择器之间用","隔开，每个选择器可以是*/
/*任何类型的选择器，如果某些选择器定义的样式完全相同，或者部分相同，这时，便可以使用*/
/*并集选择器*/
selector,selector1 {
    property:value;
 }

/*<!DOCTYPE html> */
/*<html lang="en"> */
/*<head> */
/*<meta charset="UTF-8">*/
/*<style>{*/
/*     div,h1,p {*/
/*         color: blue;*/
/*         font-size: 9px;*/
/*     }*/
/*     div.class1,class1,#id1 {*/
/*         color: red;*/
/*         font-size: 10px;*/
/*         font-weight: bold;*/
/*     }*/
/* }*/
/*</style>*/
/*</head>*/
/*<body>*/
/*<div> 正常div标记，蓝色，9px </div>*/
/*<p >p标记，和div标记相同</p>*/
/*<div class="class1" >红色，加粗，10px</div>*/
/*<span id="id1" >红色，加粗，10px</span>*/
/*</body>*/
/*</html>*/

/*后代选择器*/
/*在CSS选择器中，可以通过嵌套的方式，对特殊位置HTML标记进行控制，例如：当<div>与</div>之间包含<b>标记时，*/
/*就可以使用后代选择器定义出现在<div>标记中的<b>标记的格式，后代选择器的写法是把外层的标记写在前面，内层标记写在*/
/*后面，之间用空格隔开*/
selector1  selector2 {
           property:value;
         }
div li {
    color: aqua;
    font-weight: 800;
}

子选择器
子选择器用于选中标记的直接后代（即儿子），它的定义符号是大于号（>）
selector>selector1

/*<!DOCTYPE html> */
/*<html lang="en"> */
/*<head> */
/*<meta charset="UTF-8">*/
/*<style>*/
/*div>p {*/
/*    font-family: "幼圆";*/
/*    color: red;*/
/*}*/
/*</style>*/
/*</head>*/
/*<body>*/
/*<div>
/*<p >本行应用了子选择器，幼圆，红色</p>*/
/*<em>*/
/*<p>本行不是div的直接后代，子选择器无效</p>*/
/*</em>*/
/*</div>*/
/*</body>*/
/*</html>*/

相邻选择器
相邻选择器，它的定义符号（+），可以选中紧跟在它后面的一个兄弟元素（这两个元素具有共同的父元素）
selector+selector1

属性选择器
例如：设置网页中id值为first的元素背景色和前景颜色，使用属性选择器的描述
div[id="first"] {
    color:blue;
    background-color: yellow;
}
例如：将网页表单中input元素中的text类型，设置蓝色边框，可以通过下面的属性选择器来绑定
input [type="text"] {
    border:1px dotted blue;
}

属性选择器及其功能
选择器              说明
[att*="value"]     匹配属性包含特定值的元素。例如，a[href*="lei"],匹配<a href="http://www.lei.edu.cn"> 包含匹配</a>
[att^="value"]     匹配属性包含以特定值开头的元素。例如，a[href^="ftp"],匹配<a href="ftp://www.lei.edu.cn"> 头匹配</a>
[att$="value"]     匹配属性包含以特定值结尾的元素。例如，a[href$="cn"],匹配<a href="http://www.lei.edu.cn"> 尾匹配</a>
[att="value"]      匹配属性等于某特定值的元素。例如，[type="text"],匹配<input type="text" name="username" />

* {   /*网页中所有文字的格式*/
     text-decoration: none;
     font-size: 16px;
}
a[href^=http]:before{              /*在指定属性之前插入内容*/
    content:"超文本传输协议：";
    color: red;
}
a[href$=jpg]:after,a[href$=png]:after {   /*在指定属性前之后插入内容*/
    content: "图像";
    color: green;
}


伪类选择器，是在css中已经定义的选择器，而不是由用户自行定义
/*此处未给出详细内容*/

字体属性
font-family属性用于确定要使用的字体列表，例如：宋体、幼圆等
font-size属性用于控制文字的大小，取值分为4种类型--绝对大小、相对大小、长度值、以及百分数，该属性默认值是medium
font-size属性确定指定元素显示的字形，font-style属性的值包括normal、italic和oblique3种，默认值为normal，表示
普通字形；itlic和oblique表示斜体字形
font-variant属性用于子浏览器中显示指定元素的字体变体。该属性有3个值：normal、small-caps、inherit，该属性
默认值为normal，表示使用标准字体；small-caps表示小体大写
font-weight属性定义了字体的粗细值，它的取值可以是normal、bold、bolder、lighter，默认值为normal，表示正常粗细，
bold表示粗体
组合属性font

文本属性
word-spacing用于设定单词之间的间隔，它的取值可以是normal或具体的长度值，也可以是负值
letter-spacing属性和word-spacing类似，它的值决定了字符间距（出去默认距离外）
text-align属性指定了所选元素的对齐方式（类似与HTML标记符的align属性），取值可以是left、right、center、
justify、start、end，分别为 左对齐、右对齐、居中对齐、两端对齐、开始边缘对齐、向行的结束边缘对齐
text-indent属性可以对特定选项的文本进行收行缩进，取值可以为长度值或百分比，默认值为0
line-height属性决定了相邻行之间的间距（或者说行高），其取值可以是数字、长度、百分比
/*长度值10pt，像素值10px*/
text-decoration属性可以对特定选项的文本进行修饰，它的取值为none、underline、overline、line-through和blink，默认值为none
text-transform属性用于转换文本，取值为capitalize、uppercase、lowercase、none，默认值为none，capitalize值表示
所选元素中文本的每个单词的首字母以大写显示；uppercase值表示所有文本都以大写显示，lowercase值表示所有文本都以小写显示
text-shadow属性用于向文本添加一个或多个阴影，取值为color、length、opacity

text-shadow:X-Offset Y-Offset shadow color;
X-Offset表示阴影的水平偏移距离，其值为正向右偏移，其值为负向左偏移
Y-Offset表示阴影的垂直偏移距离，其值为正向下偏移，其值为负向上偏移
shadow表示阴影的模糊度，不可以为负，值越大，阴影越模糊，反之，清晰
div {
    text-shadow: 5px 8px 3px gray;
    font: 24pt "楷体";
}
word-wrap属性允许超过容器的长单词换行到下一行，它的取值为normal和break-word，默认值为normal，表示只在允许的断字点换行；
break-word表示在长单词或URL地址内部进行换行

background-color属性用于设置HTML元素背景颜色
background-image属性用于设置HTML元素背景图片
background-attachment属性控制背景图片是否随内容一起滚动，取值为scroll或fixed，该属性默认值为scroll，表示背景图片随着
内容一起滚动，fixed表示背景图像静止，而内容可以滚动
background-position属性指定了背景图像相对于关联区域左上角的位置，该属性通常指定由空格隔开的两个值，既可以使用关键
字left/center/right和top/center/boottom,也可以指定百分数值，胡总和指定以标准单位计算的距离
background-repeat属性用来表示背景图片是否重复显示，取值可以是reapeat/repeat-x/repeat-y/no-repeat
组合属性background

boder:5px solid red;   /*制作圆角边框用这行代码*/

boder-width设置边框粗细
boder-color设置边框颜色
boder-style选择一些预先定义的好的线型，如虚线、实线等

max-width和max-heigth分别设置图片宽度最大值和高度最大值

浮动属性
CSS使用float属性实现文字环绕效果。float属性主要定义图像向那个方向浮动
float:none/left/right;

清除浮动属性
clear:none |left |right |both;

定位属性
position: static |relation |absolute |fixed
static静态定位，默认的定位属性
absolute绝对定位，通过top、left、bottom、right等属性值定位盒子相对其具有position设置的父对象的偏移位置，不
占用原页面空间
relative相对定位，通过top、left、bottom、right等属性值定位元素相对其原本应显示位置的偏移位置，占用原位置空间
fixed固定定位，通过通过top、left、bottom、right等属性值定位盒子相对浏览器窗口的拍内衣位置

层叠定位属性z-index

```

