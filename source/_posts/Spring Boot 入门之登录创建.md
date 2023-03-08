---
title: Spring Boot 入门之登录创建
---
# Spring Boot 入门之登录创建

---

## 一、在IDEA中创建一个springboot项目

### 1.使用Spring Initializr创建项目

### 2.选定Developer Tools中的Spring Boot DevTools、Lombok、Spring Configuration Processor；选定Web中的Spring Web；选定Template Engine中的Thymeleaf

- spring-boot-devtools 模块能够实现热部署，添加类  添加方法  修改配置文件  修改页面等 都能实现热部署
- Lombok 是一种 Java™ 实用工具，可用来帮助开发人员消除 Java 的冗长，尤其是对于简单的 Java 对象（POJO）。它通过注解实现这一目的;在写入的文件中添加@Data就可，如下图：

  ![image-20210306163122698](C:\Users\hupeng\AppData\Roaming\Typora\typora-user-images\image-20210306163122698.png)
- spring默认使用yml中的配置，但有时候要用传统的xml或properties配置，就需要使用spring-boot-configuration-processor了
- 建立Web项目，所以挑选Spring web
- Thymeleaf可以包内使用，而jsp不支持打包使用
- ![image-20210306163350506](C:\Users\hupeng\AppData\Roaming\Typora\typora-user-images\image-20210306163350506.png)

使用thymeleaf时，@{XX}是跳转至XX代表的链接，${XX}是获取XX中的东西

### 3.建立以下文件

![image-20210306164319410](C:\Users\hupeng\AppData\Roaming\Typora\typora-user-images\image-20210306164319410.png)

其中login.html为登录动态页面，index.html为登陆后跳转的页面

```java
package com.example.firstwell.controller;

import com.example.firstwell.bean.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import javax.servlet.http.HttpSession;

@Controller
public class IndexController {

    /*
    在浏览器其中输入http://localhost:8080/
    或http://localhost:8080/login都可以进入
    */
    @GetMapping(value = {"/","/login"})
    public String loginpage(){
    //返沪登录界面
        return "login";
    }
    @PostMapping("/login")
    public String Indexpage(User user, HttpSession session, Model model){

        if(StringUtils.hasLength(user.getUserName()) && "123456".equals(user.getPassword())){
            //把登陆成功的用户保存起来
            session.setAttribute("loginUser",user);
            //登录成功，重定向到index，重定向防止表单重复提交
            return"redirect:/index.html";
        }else{

            model.addAttribute("msg","账号密码错误");
            //回到登录页
            return "login";
        }
    }

    /**
     * 去index页面
     * @return
     */
    @GetMapping("/index.html")
    public String mainPage(HttpSession session,Model model){
     /*
     判断是否登录，如果已登录，seesion中会被放入一个loginUser，
     即loginUser中不为空
     */
       Object loginUser = session.getAttribute("loginUser");
       if (loginUser != null){
           return "index";
       }else{
           //回到登录页
           model.addAttribute("msg","请重新登录");
           return "login";
       }
    }
}
```

```java
package com.example.firstwell.bean;

import lombok.Data;
@Data
public class User {
    private String userName;
    private String password;
}
```

```yaml
server.port=8888  //改变端口
```

个性化设置：在resources中加入banner.jpg或者搜索spring boot banner 在线

[学习自B站雷神](https://www.bilibili.com/video/BV19K4y1L7MT?p=44)

[笔记](https://www.yuque.com/atguigu/springboot/)
