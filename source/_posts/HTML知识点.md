
---
title: 静态网页技术———HTML5知识点汇总
---

# 静态网页技术———HTML5知识点汇总

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<html>
<head>
    <title>标题</title>
</head>
<body>
<!--水平线标记-->
<hr style="width:982px;"/>
<!--标题文字标记，n表示数字-->
       <hn>   </hn>
<!--//段落标记-->
<p>   </p>
<!--//换行标记-->
</br>
<div>
<!--    //块标记，默认状态是占据一行-->
</div>
<span>
<!--   //块标记，默认状态是行间的一部分-->
</span>

</body>
</html>

<!--    //有序列表标记<ol>-->
<!--    //type="1"表示是数字1、2...有序标记，（默认）-->
    <ol type="" start="">
        <li>数字有序标记</li>
    </ol>

<!--    //type="a"表示是小写字母a、b...有序标记-->
    <ol type="a" start="">
        <li>小写字母有序标记</li>
    </ol>

<!--    //type="A"表示是大写字母A、B...有序标记-->
    <ol type="A" start="">
        <li>大写字母有序标记</li>
    </ol>

<!--    //type="i"表示是小写罗马数字i、ii...有序标记-->
    <ol type="i" start="">
        <li>小写罗马数字有序标记</li>
    </ol>

<!--    //type="I"表示是大写罗马数字I、II...有序标记-->
    <ol type="I" start="">
        <li>大写罗马数字有序标记</li>
    </ol>


<!--    //无序列表标记<ul>-->
<!--    //type="disc"表示是实心圆点无序标记，（默认）-->
    <ul type="disc">
        <li>实心圆点无序标记</li>
    </ul>

<!--    //type="circle"表示是空心圆圈无序标记，（默认）-->
    <ul type="circle">
        <li>空心圆圈无序标记</li>
    </ul>

<!--    //type="Square"表示是方形无序标记，（默认）-->
    <ul type="Square">
        <li>方形无序标记</li>
    </ul>

<!--    //自定义列表-->
    <dl>
        <dt>名称<dd>说明
    </dl>
    <dl>
        <dt>用户名<dd>6~18个字符，需以字母开头
        <dt>密码<dd>6~18个字符，区分大小写
    </dl>
    <article>
<!--        // articl元素代表文档，页面或应用程序独立的、完整的、可以独立被外部引用的内容-->
    </article>
    <section>
<!--        // section元素中的内容可以单独存储到数据库中或输出到Word文档中-->
<!--        // 在HTML5中，article元素可以看成是一种特殊类型的section元素-->
    </section>

<!--    //nav元素是一个可以用作页面导航的链接组-->
    <nav>
        <ul>
            <li><a href="链接地址">这是超链接</a></li>
            <li><a href="链接地址"></a></li>
        </ul>
    </nav>

    <aside>
<!--        // aside元素用来表示当前页面或文章的附属信息部分-->
    </aside>

    <header><h1>
<!--        页面标题-->
    </h1></header>

<!--    //footer元素一般作为其上层容器元素的注脚-->
    <footer>
        <ul>
            <li>版权信息</li>
            <li>联系方式</li>
        </ul>
    </footer>

<!--    图像标记<img/>-->
    <img src="url" title="" style="width:200px; height:200px; border:10px solid #0000ff;" align="middle"/>

<!--    boder属性表示边框-->
<!--    align属性设置图像对齐方式-->
<!--    align属性值 ：-->
<!--    top图像顶部与同行文字或图片顶部对齐-->
<!--    middle图像中部与同行文字或图片中部对齐-->
<!--    bottom图像底部与同行文字或图片底部对齐-->
<!--    left图像在文字左侧-->
<!--    right图像在文字右侧-->
<!--    absbottom图像底部与同行最低项的底部对齐，常用于netscape-->
<!--    absmiddle图像中部与同行最大项的中部对齐，常用于netscape-->
<!--    baseline图像底部与文本基准线对齐，常用于netscape-->
<!--    texttop图像顶部与同行最高项的顶部对齐，常用于netscape-->


<!--    //多媒体文件标记<embed>-->
    <embed src="url" autostart="" loop=""> </embed>
<!--    //src属性用来指定插入的多媒体文件的地址或多媒体文件名-->
<!--    //autostart属性用来设置多媒体文件是否自动播放true/false-->
<!--    //loop属性用来设置多媒体文件是否循环播放true/false-->

<!--    //视频标记<video>-->
    <video src="url" controls="controls">替代文字</video>
<!--    属性        值            说明-->
<!--    src        url           要播放视频的URL-->
<!--    autoplay   autoplay      视屏就绪后马上播放-->
<!--    controls   controls      添加播放、暂停和音量等控件-->
<!--    width      像素           设置时评播放器的宽度-->
<!--    heigth     像素           设置视频播放器的高度-->
<!--    loop       loop           设置视频是否循环播放-->
<!--    preload    preload        视频在页面加载时进行加载，并预备播放-->



<!--音频标记<audio>-->
<audio src="url" controls="controls"> 替代内容</audio>


<!--超链接标记<a>-->
<a href="url" target="">链接标题</a>
<!--超链接target的值及说明-->
<!--parent   当前窗口的上级窗口，一般在框架中使用-->
<!--blank    在新窗口中打开-->
<!--self     在同一窗口打开，和默认值一致-->
<!--top      在浏览器的整个窗口打开，忽略任何框架-->

<!--表单定义标记<form>-->
<form name="formname" method="表单传送方式post/get" action="url" enctype="表单编码方式encoding"></form>
<!--在HTML5中增加formaction属性和formmethod属性-->
<form id="testform" action="test.html" method="post">
    第一个测试按钮：<input type="submit" name="n1" formaction="h1.html" formmethod="post" />
    第二个测试按钮: <input type="submit" name="n2" formaction="h2.html" formmethod="post" />
</form>


<!--输入标记<input>-->
<input name="控件名称" type="控件类型" maxlength="12 允许用户输入最大字符数" size="8 指定文本框的宽度" value="文本框默认值" />
<!--<input>标记的type属性值及说明-->
<!--属性值     说明-->
<!--text      文本框-->
<!--password  密码框-->
<!--file      文件域-->
<!--checkbox  复选框-->
<!--radio     单选按钮-->
<!--button    标准按钮-->
<!--submit    提交按钮-->
<!--reset     重置按钮-->
<!--image     图像域-->

<!--placehoder属性是指当文本框<input type="text">处于未输入状态时文本框中显示的输入提示-->
<input type="text" placeholder="default text" />

<!--autofocus属性，若给文本框、选择框或按钮等控制加上该属性，则当页面打开时，-->
<!--改控件将自动获得焦点，从而替代使用JavaScript代码，注意：一个页面内只能有一个控件具有该属性-->
<input type="text" autofocus>

<!--list属性，在HTNML5中，为单行文本框<input type="text">增加了一个list属性，-->
<!--该属性的值是莫格datalist元素的id，datalist也是HTML5中新增的元素，该元素类似于选择框（<select>),但是当-->
<!--用户想要设定的值不在选择列表之内时，允许其自行输入，datalist元素本身并不显示，而是当-->
<!--文本框获得焦点时以提示输入的方式显示-->

请选择文本：
<input type="text" name="greeting" list="greeting" />
<!--使用style="display:none;"将detalist元素设定为不显示-->
<datalist id="greeting" style="display: none;">
    <option value="选项1">选项1</option>
    <option value="选项2">选项2</option>
</datalist>

<!--autocomplete属性用于设置输入时是否自动完成，提供了十分方便辅助输入功能。对于autocomplete属性，-->
<!--可以指定其值为"on"、”off“、”“三类值。不指定时，使用浏览器的默认值（取决于个浏览器的设定）。该属性设置为on时，-->
<!--可以显示指定待输入的数据列表。如果使用datalist元素与list属性提供待输入的数据列表，自动完成时，可以将该datalist元素-->
<!--中的数据作为待输入的数据在文本框钟自动显示。-->
<input type="text" name="school" autocomplete="on" />

<!--required属性，可以应用在大多数输入元素上（除了隐藏元素、图片元素按钮外）。在提交时，-->
<!--如果元素内容为空白，则不允许提交，同时在浏览器中显示提示信息，提示用户这个元素必须输入内容-->

<!--pattern属性，要求输入的内容符合一定的格式，若不符合时，则不允许提交且会有显示-->
<input type="text" pattern="[0-9] [A-Z] {3}" name=part placeholder="输入内容：1个数字与三个大写字母。" />

<!--数值输入域number-->
<!--min和max属性是数值类型或日期类型的input元素的专用属性，它们限制了在input元素中输入的数值与日期的范围，-->
<!--step定义合法的数字间隔，例如step=3，则就是1、3、5...,value则是定义默认值-->
<input name="" type="number" min="" max="" step="" value="">

滑动条range
将<input>标记中的type属性设置为range，可以在表单中插入表示数值范围的滑动条，还可以限定可接受的数值范围
<input name="" type="range" min="" max="" step="" value="">

<!--日期选择器data pickers-->
<!--HTML5拥有多个供选取日期的和时间的新输入类型，秩序将<input>标记中的type属性设置为一下几种类型之一即可-->
<!--date   选取日、月、年-->
<!--month   选取月、年-->
<!--week   选取周、年-->
<!--time   选取时间（小时和分钟）-->
<!--datetime  选取时间、日、月、年（世界标准时间UTC）-->
<!--datetme-local   选取时间、日、月、年（本地时间）-->

<!--url类型是input元素专门用来输入url地址的文本框，提交时如果该文本框中的内容不是url地址格式的文字，则不允许提交-->
<input name="urll" type="url" value="http://www.icourses.cn" />

<!--email类型的input元素是一种专门用来输入email地址的文本框，提交时如果该文本框内不是email地址格式-->
<!--的文字则不允许提交，但是却不会检查email地址是否存在，email类型的文本框具有一个multiple属性，它允许在该文本框-->
<!--中输入一串以逗号分隔的email地址-->
<input name="email" type="email" value="testemail@163.com">

<!--列表框标记<select>-->
<form>
    <select name="列表框民名称" size="">
        <option value="选项值" />选项显示内容
        <option value="选项值" />选项显示内容
    </select>
</form>

<!--文本域输入标记<textarea>-->
<!--    在表单中，只要插入成对的<textarea></textarea>就可以插入文本域-->
<form >
    用户:<input type="text" value="login">
    <textarea name="文本域name" rows="行数5" cols="列数100"> </textarea>
</form>
<!--也可以应用form属性标识id-->
<!--<form  id="myform">-->
<!--    用户:<input type="text" value="login">-->
<!--</form><br/>-->
<!--<textarea form="myform" name="文本域name" rows="行数5" cols="列数100"> </textarea>-->

<!--使用成对的<table></table>标记就可以定义一个表格-->
<!--<tr>为行标记<td>为单元格标记<th>表头标记-->
<!--设置表格边框宽度border<table border="2">-->
<!--设置单元格跨列colspan  <td colspan="value">-->
<!--设置单元格跨行 rowspan <td rowspan="value">-->
<!--width  设置单元格宽度-->
<!--height  设置单元格高度-->
<!--bordercolor 设置表格边框颜色-->
<!--bgcolor   设置表格背景颜色-->
<!--background  设置表格背景图像-->
<!--align/valign   设置表格对齐方式-->
<!--cellspacing    设置单元格间距-->
<!--cellpadding    设置单元格边距-->

<table border="1" style="width: 400px;">
    <tr>
        <td>  1</td> <td> 2 </td>
    </tr>
    <tr>
        <td>  3</td>  <td> 4 </td>
    </tr>
</table>


<!--使用成对的<iframe></iframe>标记即可在网页中插入内嵌框架-->
<!--可内置进<td>中-->
<table>
<tr>
<td>
    <iframe>内嵌</iframe>
</td>
</tr>
</table>
<!--内置框架属性-->

<!--src    设置源文件地址-->
<!--width   设置内嵌框架窗口宽度-->
<!--height  设置内置框架窗口高度-->
<!--bordercolor  设置边框颜色-->
<!--align    设置框架对齐方式 可选left、right、top、middle、bottom-->
<!--name   设置框架名称，是链接标记的target所需的参数-->
<!--scrolling 设置是否需要显示滚动条，默认为auto，表示根据需要自动出现，Yes/No-->
<!--frameborder  设置框架边框，1表示显示边框、0表示不显示-->
<!--framespacing   设置框架边框宽度-->
<!--marginheight    设置内容与窗口上下边缘的边距，默认为1-->
<!--marginwidth    设置内容与窗口左右边缘的距离，默认为1-->
<iframe src="url"></iframe>

```

