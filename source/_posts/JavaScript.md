---
title:JavaScript
---

# JavaScript

## 一、注释

1. JavaScript 是脚本语言，浏览器会在读取代码时，逐行地执行脚本代码。而对于传统编程来说，会在执行前对所有代码进行编译。

2. JavaScript 不会执行注释。

   - 单行注释以 **//** 开头

   - 多行注释以 **/\*** 开始，以 ***/** 结尾

   - 我们可以添加注释来对 JavaScript 进行解释，或者提高代码的可读性



## 二、声明变量 

在 JavaScript 中创建变量通常称为"声明"变量。

赋值时，被赋值的var的类型是所赋值的类型

   ```javascript
   /*
   您可以在一条语句中声明很多变量。该语句以 var 开头，并使用逗号分隔变量即可：
   */
   var lastname="Doe", age=30, job="carpenter";
   
   //声明也可横跨多行：
   var lastname="Doe",
   age=30,
   job="carpenter";
   
   //一条语句中声明的多个变量不可以同时赋同一个值:
   var x,y,z=1;
   //x,y 为 undefined， z 为 1。

var x;               // x 为 undefined
var x = 5;           // 现在 x 为数字
var x = "John";      // 现在 x 为字符串
var x=true;
var y=false;

var cars=new Array();
cars[0]="Saab";
cars[1]="Volvo";
cars[2]="BMW";
//或
var cars=new Array("Saab","Volvo","BMW");

/*
键值对通常写法为 name : value (键与值以冒号分割)。
键值对在 JavaScript 对象通常称为 对象属性
对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔：*/
var person={firstname:"John", lastname:"Doe", id:5566};
//上面例子中的对象 (person) 有三个属性：firstname、lastname 以及 id。

//空格和折行无关紧要。声明可横跨多行：
var person={
firstname : "John",
lastname  : "Doe",
id        :  5566
};

/*
Undefined 这个值表示变量不含有值。
可以通过将变量的值设置为 null 来清空变量。
*/
cars=null;
person=null;

var var1 = 1; // 不可配置全局属性
var2 = 2; // 没有使用 var 声明，可配置全局属性

console.log(this.var1); // 1
console.log(window.var1); // 1
console.log(window.var2); // 2

delete var1; // false 无法删除
console.log(var1); //1

delete var2; 
console.log(delete var2); // true
console.log(var2); // 已经删除 报错变量未定义
   ```

   - 我们使用 var 关键词来声明变量
   - 使用var关键字声明的全局作用域变量属于window对象。
   - 使用let关键字声明的全局作用域变量不属于window对象。
   - 使用var关键字声明的变量在任何地方都可以修改。
   - 在相同的作用域或块级作用域中，不能使用let关键字来重置var关键字声明的变量。
   - 在相同的作用域或块级作用域中，不能使用let关键字来重置let关键字声明的变量。
   - let关键字在不同作用域，或不用块级作用域中是可以重新声明赋值的。
   - 在相同的作用域或块级作用域中，不能使用const关键字来重置var和let关键字声明的变量。
   - 在相同的作用域或块级作用域中，不能使用const关键字来重置const关键字声明的变量
   - const 关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:
   - var关键字定义的变量可以先使用后声明。
   - let关键字定义的变量需要先声明再使用。
   - const关键字定义的常量，声明时必须进行初始化，且初始化后不可再修改



## 三、JSON

JSON 是用于存储和传输数据的格式，JSON 通常用于服务端向网页传递数据

JSON 语法规则
  - 数据为 键/值 对。
  - 数据由逗号分隔。
  - 大括号保存对象
  - 方括号保存数组

```javascript
<h2>为 JSON 字符串创建对象</h2>
<p id="demo"></p>
<script>
var text = '{ "sites" : [' +
	'{ "name":"Runoob" , "url":"www.runoob.com" },' +
	'{ "name":"Google" , "url":"www.google.com" },' +
	'{ "name":"Taobao" , "url":"www.taobao.com" } ]}';
	
obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.sites[1].name + " " + obj.sites[1].url;
</script>


<p id="demo1"></p>
<p id="demo2"></p>
<script>
var person = {
    firstName: "John",
    lastName : "Doe",
    id : 5566,
    fullName : function() 
	{
       return this.firstName + " " + this.lastName;
    }
};
document.getElementById("demo1").innerHTML = "不加括号输出函数表达式："  + person.fullName;
document.getElementById("demo2").innerHTML = "加括号输出函数执行结果："  +  person.fullName();
</script>
/*
不加括号输出函数表达式：function() { return this.firstName + " " + this.lastName; }
加括号输出函数执行结果：John Doe
*/
```



## 四、函数



```javascript
<p>点击这个按钮，来调用带参数的函数。</p>
<button onclick="myFunction('Harry Potter','Wizard')">点击这里</button>
<script>
function myFunction(name,job){
    alert("Welcome " + name + ", the " + job);
}
</script>

//计算结果返回
function myFunction(a,b)
{
    return a*b;
}
document.getElementById("demo").innerHTML=myFunction(4,3);
```



## 五、运算符、逻辑比较、判断语句、循环语句

与C语言等类似

```javascript
if (time<20)
{
    x="Good day";
}
else
{
    x="Good evening";
}



if (time<10)
{
    document.write("<b>早上好</b>");
}
else if (time>=10 && time<20)
{
    document.write("<b>今天好</b>");
}
else
{
    document.write("<b>晚上好!</b>");
}



var d=new Date().getDay();
switch (d)
{
    case 6:x="今天是星期六";
    break;
    case 0:x="今天是星期日";
    break;
    default:
    x="期待周末";
}
document.getElementById("demo").innerHTML=x;


for (var i=0;i<cars.length;i++)
{ 
    document.write(cars[i] + "<br>");
}


while (i<5)
{
    x=x + "The number is " + i + "<br>";
    i++;
}


for (i=0;i<10;i++)
{
    if (i==3) break;
    x=x + "The number is " + i + "<br>";
}

for (i=0;i<=10;i++)
{
    if (i==3) continue;
    x=x + "The number is " + i + "<br>";
}
```



## 六、转化

1. 全局方法 **String()** 可以将数字转换为字符串
2. 全局方法 String() 可以将布尔值转换为字符串
3. 全局方法 String() 可以将日期对象转换为字符串
4. 全局方法 **Number()** 可以将字符串转换为数字。字符串包含数字(如 "3.14") 转换为数字 (如 3.14).空字符串转换为 0。其他的字符串会转换为 NaN (不是个数字)
5. 全局方法 **Number()** 可将布尔值转换为数字
6. 全局方法 Number() 可将日期转换为数字
7. 当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型
8. 当你尝试输出一个对象或一个变量时 JavaScript 会自动调用变量的 toString() 方法

```javascript
//typeof 操作符来检测变量的数据类型
typeof "John"                 // 返回 string
typeof 3.14                   // 返回 number
typeof NaN                    // 返回 number
typeof false                  // 返回 boolean
typeof [1,2,3,4]              // 返回 object
typeof {name:'John', age:34}  // 返回 object
typeof new Date()             // 返回 object
typeof function () {}         // 返回 function
typeof myCar                  // 返回 undefined (如果 myCar 没有声明)
typeof null                   // 返回 object

<p> typeof 操作符返回变量、对象、函数、表达式的类型。</p>
<p id="demo"></p>
<script>
document.getElementById("demo").innerHTML = 
    typeof "john" + "<br>" +
    typeof 3.14 + "<br>" +
    typeof NaN + "<br>" +
    typeof false + "<br>" +
    typeof [1,2,3,4] + "<br>" +
    typeof {name:'john', age:34} + "<br>" +
    typeof new Date() + "<br>" +
    typeof function () {} + "<br>" +
    typeof myCar + "<br>" +
    typeof null;
</script>

//constructor 属性返回所有 JavaScript 变量的构造函数
"John".constructor                 // 返回函数 String()  { [native code] }
(3.14).constructor                 // 返回函数 Number()  { [native code] }
false.constructor                  // 返回函数 Boolean() { [native code] }
[1,2,3,4].constructor              // 返回函数 Array()   { [native code] }
{name:'John', age:34}.constructor  // 返回函数 Object()  { [native code] }
new Date().constructor             // 返回函数 Date()    { [native code] }
function () {}.constructor         // 返回函数 Function(){ [native code] }

<p> constructor 属性返回变量或对象的构造函数。</p>
<p id="demo"></p>
<script>
document.getElementById("demo").innerHTML = 
    "john".constructor + "<br>" +
    (3.14).constructor + "<br>" +
    false.constructor + "<br>" +
    [1,2,3,4].constructor + "<br>" +
    {name:'john', age:34}.constructor + "<br>" +
    new Date().constructor + "<br>" +
    function () {}.constructor;
</script>

/*
全局方法 String() 可以将数字转换为字符串。
该方法可用于任何类型的数字，字母，变量，表达式：
*/
String(x)         // 将变量 x 转换为字符串并返回
String(123)       // 将数字 123 转换为字符串并返回
String(100 + 23)  // 将数字表达式转换为字符串并返回

//Number 方法 toString() 也是有同样的效果。
x.toString()
(123).toString()
(100 + 23).toString()

//全局方法 String() 可以将布尔值转换为字符串。
String(false)        // 返回 "false"
String(true)         // 返回 "true"
//Boolean 方法 toString() 也有相同的效果。
false.toString()     // 返回 "false"
true.toString()      // 返回 "true"

//Date() 返回字符串。
Date()      // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)

//全局方法 String() 可以将日期对象转换为字符串。
// 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)
String(new Date())      

//Date 方法 toString() 也有相同的效果。
obj = new Date()
obj.toString()   // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)

/*
全局方法 Number() 可以将字符串转换为数字。
字符串包含数字(如 "3.14") 转换为数字 (如 3.14).
空字符串转换为 0。
其他的字符串会转换为 NaN (不是个数字)。
*/
Number("3.14")    // 返回 3.14
Number(" ")       // 返回 0
Number("")        // 返回 0
Number("99 88")   // 返回 NaN


//全局方法 Number() 可将布尔值转换为数字。
Number(false)     // 返回 0
Number(true)      // 返回 1

//全局方法 Number() 可将日期转换为数字。
d = new Date();
Number(d)          // 返回 1404568027739
//日期方法 getTime() 也有相同的效果。
d = new Date();
d.getTime()        // 返回 1404568027739


//当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型。
5 + null    // 返回 5         null 转换为 0
"5" + null  // 返回"5null"   null 转换为 "null"
"5" + 1     // 返回 "51"      1 转换为 "1" 
"5" - 1     // 返回 4         "5" 转换为 5


//当你尝试输出一个对象或一个变量时 JavaScript 会自动调用变量的 toString() 方法：
document.getElementById("demo").innerHTML = myVar;
myVar = {name:"Fjohn"}  // toString 转换为 "[object Object]"
myVar = [1,2,3,4]       // toString 转换为 "1,2,3,4"
myVar = new Date()      // toString 转换为 "Fri Jul 18 2014 09:08:55 GMT+0200"
//数字和布尔值也经常相互转换：
myVar = 123             // toString 转换为 "123"
myVar = true            // toString 转换为 "true"
myVar = false           // toString 转换为 "false"
```



## 七、正则表达式

详情访问[菜鸟教程](https://www.runoob.com/js/js-regexp.html)




```javascript
//引用外部js文件
<script src="myScript.js"></script>

/*
输出流
使用 window.alert() 弹出警告框。
使用 document.write() 方法将内容写到 HTML 文档中。
使用 innerHTML 写入到 HTML 元素。
使用 console.log() 写入到浏览器的控制台
*/
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落。</p>");
/*
您可以在文本字符串中使用反斜杠对代码行进行换行；
非法语句 document.write \ 
("你好世界!");
*/
document.write("你好 \
世界!");
/*
getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用
改变输入的样式，将id为demo的内容改为Hello JavaScript!，且将字体格式改为红色*/
<h1>我的第一段 JavaScript</h1>
<p id="demo">
JavaScript 能改变 HTML 元素的内容。
</p>
<script>
function myFunction()
{
	x=document.getElementById("demo");  // 找到元素
	x.innerHTML="Hello JavaScript!";    // 改变内容
    x.style.color="#ff0000";           //改变样式
}
</script>
<button type="button" onclick="myFunction()">点击这里</button>



/*
切换图片，实现效果
（延展：图片的轮播可采用数组存放图片照片地址的方法实现）
onclick 事件会在元素被点击时发生，使用时需在特定的函数名后搭配()
onclick 属性可以使用与所有 HTML 元素，除了 ：<base>, <bdo>, <br>, <head>, <html>, <iframe>, <meta>, <param>, <script>, <style>, 和 <title>
*/
<script>
function changeImage()
{
	element=document.getElementById('myimage')
	if (element.src.match("bulbon"))
	{
		element.src="/images/pic_bulboff.gif";
	}
	else
	{
		element.src="/images/pic_bulbon.gif";
	}
}
</script>
<img id="myimage" onclick="changeImage()" src="/images/pic_bulboff.gif" width="100" height="180">
<p>点击灯泡就可以打开或关闭这盏灯</p>


/*
alert() 方法用于显示带有一条指定消息和一个 OK 按钮的警告框
isNaN() 函数用于检查其参数是否是非数字值
*/
<h1>我的第一段 JavaScript</h1>
<p>请输入数字。如果输入值不是数字，浏览器会弹出提示框。</p>
<input id="demo" type="text">
<script>
function myFunction()
{
	var x=document.getElementById("demo").value;
	if(x==""||isNaN(x))
	{
		alert("不是数字");
	}
}
</script>
<button type="button" onclick="myFunction()">点击这里</button>

<script src="myScript.js"></script>


```

