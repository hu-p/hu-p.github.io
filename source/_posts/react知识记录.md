---
title: react知识记录
---
# react知识记录

## 一、图片导入问题

```css
一、background-image
.login-logo {
  position: absolute;
  left: 42px;
  top: 32px;
  width: 56px;
  height: 46px;
  // 图片颜色 路径 不重复 居中
  background: #ecf2fb url("../login/logo.png") no-repeat center;
  // 图片大小
  background-size: 100% 100%;
}

二、<img src={} alt=''>
// 常规方式图片显示不出来
<div className="bigPic">
　　<img src={require('../../images/bg.png')} alt="" />
</div>

解决方法一、
　　再导入的图片后加.default即可
　　<img src={require('../../images/bg.png').default} alt="" />

解决方法二、
　　import imgUrl from '../../images/bg.png';
　　<img src={imgUrl} alt="" />
 
原因：
　　首先 webpack 支持 CommonJS、AMD 和 ES6模块打包。当我们用 单文件写组件时，在 script 标签内使用的是 ES6 的语法且使用 export default 进行默认导出。然而，require 是 CommonJS 的模块导入方式，不支持模块的默认导出，因此导入的结果其实是一个含 default 属性的对象，因此需要使用 .default 来获取实际的组件。
　　当然我们也可以使用 ES6 的 import 语句，如果使用 import，需要给定一个变量名，所有 import 语句必须统一放在模块的开头。
　　相反，如果  文件中使用 CommonJS 或 AMD 模块化语法，使用 module.exports 对象进行导出，那么使用 require 导入时就不需要使用 .default 来获取。
　　

推荐方法：
// 通过这种方式，您实际上并没有像导入模块那样导入图像文件，而是让服务器静态地为浏览器提供服务。
// 此处应当为src={}形式，引入值，但是位于静态资源public中，路径为public/img/logo.png，故可直接使用img/logo.png形式 
  <img src='img/logo.png' alt="" />
```

## 二、css屏幕宽超出问题

```
/* 宽度小于1500 */
@media (max-width: 1500px) {
    .login-section-layout {
        width: 75vw;
    }
}

/* 宽度大于1500 */
@media (min-width: 1500px) {
    .login-section-layout {
        width: 65vw;
    }
}
```

### 三、react导入antd问题

```
import 'antd/dist/antd.min.css'
/* Failed to parse source map: 'webpack://antd/./components/config-provider/style/index.less'URL is not supported 
此问题为react-script 升级到5.0.0之后出现此问题，也就是说从14号开始，所有通过npx create-react-app 创建的项目，
 引入antd.css 之后都会看到这个警告， 将import 'antd/dist/antd.css'改为import 'antd/dist/antd.min.css'
*/
```

## 四、两盒子重叠

```
// 在父盒子中设置position: relative;
// 在子盒子中设置position: absolute;
效果：
   一个大盒子中包裹多个排列有序的子盒子(诸如使用display:flex命令)，此时需要添加一个盒子，会和其中的和重叠，故而此盒子设置position: absolute，其父盒子设置position: relative;即可实现
```

## 五、react中样式局部和全局

```css
在vue中可以设置 <style scoped='lang' less> 设置less和局部显示
vue使用/deep/.className实现穿透

react使用:global(.className)实现穿透
在react中css默认为全局有效，故令文件名为XX.module.css或XX.module.less可实现局部有效，这种方式为模块化，实现方式是修改类选择器名和id选择器名，故局部有效是针对于类选择器和id选择器，诸如（img,footer）等元素选择器会失效，故使用时需留意
当在react中需要穿透时，则使用:global(.className),:global(.className)在.css文件和.module.css等文件中都有效

//导入 .css等样式文件时
import './xxxx.css'

// 类选择器单一样式
<div className='yangshi1'>
// 类选择器多个样式
<div className='yangshi2 yangshi3'>

//导入 .module.css等样式文件时
import styles from './xxxx.css'

// 类选择器单一样式
<div className={style.yangshi1}>
或
// 因为在{}不识别—，识别_,故在此使用style[yangshi1]，而不是点语法
<div className={style[yangshi1]}>
或
//使用模板字符串，一般是使用与有多个样式导入一个类选择器
<div clssName={`${style['yangshi1']}`}

// 类选择器多个样式
//使用模板字符串
<div clssName={`${style['yangshi2']} ${style['yangshi3']}`}
```

## 六、Modal内嵌套一个form表单

### 一、form表单

```react
// 极度重要:挂载form
 const [form] = Form.useForm();
// 配置项form : form={form} 
//表单定义默认值form.setFieldsValue需放在useEffect副作用中

Form表单的一个常规写法：
1.通过 Form.useForm 对表单数据域进行交互。
const [form] = Form.useForm(); 
//这里用form要使用在钩子函数里，可以配合react的hook使用，
如果使用react生命周期开发的话可以给form表单添加ref来获取表单数据或者修改数据，（this.formRef = React.createRef();）
获取表单数据：this.formRef.current.getFieldsValue()。this.formRef.current.validateFields().then().catch()


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


<Form form={form} {...layout} name="nest-messages" onFinish={onFinish.bind(this)} validateMessages={validateMessages} className="login-form"
initialValues={{ name: 'ming', password: '123456' }}
>

    <Form.Item name='name' label="用户名" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
    </Form.Item>

    <Form.Item name='password' label="密码" rules={[{ required: true }]}>
        <Input placeholder="用户密码" />
    </Form.Item>

    <Form.Item >
        <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
        <Button >重置表单</Button>
    </Form.Item>
</Form>

2.获取对应字段名的值。用法：
form.getFieldValue('name')；
form.getFieldValue('password')

3.设置表单的值，更新对应的值，用法：
form.setFieldsValue({
    name: 'ming',
    password: '111222'
});

4.获取Form全部字段名对应的值，会按照对应结构返回。用法：
form.getFieldsValue()

5.触发表单验证。用法：
form.validateFields().then(value => { 

// 验证通过后进入 const { name,password} = value; console.log(name, password);  

}).catch(err => { // 验证不通过时进入 console.log(err); });
6.提交表单，与点击 submit 按钮效果相同，会走 onFinish 方法。用法：
<Button onClick={() => form.submit()}> 提交 </Button> // 与下面效果一样 <Button htmlType="submit"> 提交 </Button>

7.重置一组字段到 initialValues。用法:
form.resetFields();

8.获取光标方法：
form.getFieldInstance('name').focus();
```

### 二、form表单示例

```react
// 示例
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Radio, Row, Col } from 'antd';
import styles from '../index.module.less';

const addModel = (props) => {
    //传过来的add或edit
    const { isModalVisible, setIsModalVisible,editList} = props
    // 判断开启与否
    const [AddVisible, setAddVisible] = useState(false);

    //表单数据交互
    const [form] = Form.useForm();

    //副作用,代替生命周期钩子
    useEffect(() => {
        if (isModalVisible == 'add' || isModalVisible == 'edit') {
            setAddVisible(true)
        }
        if (isModalVisible == 'edit') {
            //表单定义需放在useEffect副作用中
            form.setFieldsValue({
               ...editList
            })
        }
    });   //不加[]每个周期都有效

    //确定
    const handleOk = () => {
        setIsModalVisible('view')
        // 启动表单提交
        form.submit()
        form.validateFields().then(value => { 
            // 验证通过后进入 const { name,password} = value; console.log(name, password);  
            console.log('成功',value);
              setAddVisible(false)
            }).catch(err => { 
            //   验证不通过时进入 
              console.log('失败',err); 
            });
    };

    //取消
    const handleCancel = () => {
        setIsModalVisible('view')
        setAddVisible(false)
    };

    //表单提交
    const onFinish = (values) => {
        console.log('提交', values);
    }

    return (
        <Modal title={isModalVisible == 'add' ? '新建门店信息' : (isModalVisible == 'edit' ? '编辑门店信息' : '详情')}
            visible={AddVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
            <Form
                form={form}    //挂载form
                layout="vertical"
                name="nest-messages"
                onFinish={onFinish}
            >
                <Row className={styles['add-title-message']}>
                    <Col span={24}>
                        基础信息
                    </Col>
                </Row>
                <Row >
                    <Col span={12}>
                        <Form.Item
                            name='org_no'
                            label="门店编号"
                            rules={[{ required: true, message: '请输入门店编号' }]}
                            className={styles['add-message-input']}
                        >
                            <Input style={{width:"100%"}}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='org_name'
                            label="门店名称"
                            rules={[{ required: true, message: '请输入门店名称' }]}
                            className={styles['add-message-input']}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
export default addModel
```

## 七、props,useContext基础使用

### 一、props双向传值

props传值与常规一样，父传子接，子传父是使用父传函数给子，传多个值时分开写

```react
// 父传
<AddModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editList={isModalVisible == 'edit' ? editList : ''}
      >
      </AddModel>

//子接
function demo(props) {
     //从父传过来的值
    const { isModalVisible, setIsModalVisible,editList} = props
}
```

### 二、useContext的使用

```react
//公共文件CountContext.jsx
import  {createContext} from "react";
const Context = createContext();
export default Context

//父组件中
import Context from './CountContext'
//传值可传值或函数，传函数可以起到子传父值效果
 <Context.Provider value={setData}>
            <Search />
 </Context.Provider>

 //子组件中
import { useContext} from 'react';
 import Context from './CountContext'
// setData为接到的值
 const setData = useContext(Context)
 
 //传多个值时，可以使用数组，在接受时使用数组接收
  <Context.Provider value={[data, setData,dictList]}>
          <Froms />
 </Context.Provider>
    
 const [data,SetData,dictList] = useContext(Context);
```

## 八、表格操作

[antd](https://ant.design/docs/react/introduce-cn)    或  [antdPro]([ProComponents - 模板组件 (ant.design)](https://procomponents.ant.design/components/))

```react
//antdPro封装了复杂表格的切换

//表格中Colums中存放列标题及配置，可写成一个对象，然后导入到表格中
//不推荐，极度缺乏灵活性，因为是如果放在函数外，当Colums中想使用函数中的数据时，是无法获取到的
const columns = [
  {
    title: '品牌编号',
    dataIndex: 'brand_no',
    key: 'brand_no',
    align: 'center' as 'center',
    width: 100,
    sorter: (a: any, b: any) => a.brand_no - b.brand_no,
  },
      {
    title: '品牌编号',
    dataIndex: 'brand_no',
    key: 'brand_no',
    align: 'center' as 'center',
    width: 100,
    sorter: (a: any, b: any) => a.brand_no - b.brand_no,
  },
//推荐使用
<Column title='联系人'
            dataIndex='contact'
            key='contact'
            align='center'
            width='100'/>)


//table配置
<Table
          rowKey="id"
          //rowSelection配值项，为一个对象，详细的配置写在rowSelection1中，详情参看官网
          rowSelection={rowSelection1}  
          // columns={columns}       //列标题默认操作
          dataSource={dataList}   //数据
          scroll={{ y: 'calc(100vh - 486px)', x: 800 }}//滚动条
          pagination={pagination}   //分页
          onRow={(record) => ({   //onRow行属性，点击当前行任意位置，调用该函数
             onClick: () => {
                 //当前行的数据
               console.log('调用', record)
            },
           })}
        >
```

### 示例

```react
import styles from '../index.module.less';
import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  Table,
  ConfigProvider,
  Modal,
  Dropdown,
  Menu,
} from 'antd';

const { Column, ColumnGroup } = Table;

import zhCN from 'antd/es/locale/zh_CN';
import request from '@/utils/request';
import {
  MoreOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import AddModel from './AddEdit';

import Context from './CountContext'

const { confirm } = Modal;

function delte(params) {
  confirm({
    centered: true,
    title: '确定要删除当前项吗？',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function Forms(props) {
  const count = useContext(Context)
  let dataList = []
  let total = 0
  if (count.flag) {
    dataList = count.rows
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState('');
    //编辑时携带的数据
  const [editList, setEditList] = useState('');

  const start = () => {
    setLoading(true);
    setSelectedRowKeys([])
    setLoading(false);
  };

  const onAdd = () => {
    console.log('添加addBtn');
    setIsModalVisible('add')
  }

  const onLeadingOut = () => {
    console.log('导出事件');
  };
  const onDelete = () => {
    console.log('删除事件');
  };
  const onSetting = () => {
    console.log('设置按钮');
  };
  const pagination = {
    pageSizeOptions: [10, 25, 50, 100, 200],
    total: total,
    showTotal: (total) => `共 ${total} 条数据`,
    showQuickJumper: true,
    showSizeChanger: true,
    showLessItems: true,
  };

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    console.log('kanakn', selectedRows);
  };

  const onSelectCallback = (a, b, c, d) => {
    console.log(1, a);
    console.log(2, b);
    console.log(3, c);
    console.log(4, d);
  }

  //行选中时的配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,    //选中项发生变化时的回调
    onSelect: onSelectCallback,   //用户手动选择/取消选择某行的回调
  };

  useEffect(() => {
    console.log('selectedRowKeys', selectedRowKeys);
  });   //不加[]每个周期都有效

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* 功能按钮 */}
      <div>
        <Button
          htmlType="button"
          className={styles.leadingOut}
          onClick={onAdd}
        >
          新建
        </Button>
        <Button
          htmlType="button"
          className={styles.leadingOut}
          onClick={onLeadingOut}
        >
          导出
        </Button>
        <Button danger className={styles.delete} onClick={onDelete}>
          删除
        </Button>
        <img
          src={require('../../../../../../public/img/iconSetting.png')}
          alt=""
          className={styles.set}
          onClick={onSetting}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {/* 选中行 */}
      <div
        className={styles.hang}
        style={{ backgroundColor: '#e6f5ff', borderColor: '#acdbff' }}
      >
        <p>
          已选择<span>{selectedRowKeys.length}</span>项{' '}
          <span className={styles.clear} onClick={start}>
            清空
          </span>
        </p>
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          rowKey="id"
          rowSelection={rowSelection}
          // columns={columns}       //列标题默认操作
          dataSource={dataList}   //数据
          scroll={{ y: 'calc(100vh - 486px)', x: 800 }}//滚动条
          pagination={pagination}   //分页
          // onRow={(record) => ({
          //   onClick: () => {
          //     console.log('调用', record)
          //     //  dataValueChange = record
          //   },
          // })}
        >
          <Column title="操作" dataIndex="operate"
            key="operate" align='center' width='80'
            render={(_, record) => (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={1}>
                      <div style={{ color: 'red' }} onClick={() => { 
                        setIsModalVisible('edit') 
                        setEditList(record)
                        }}>
                        编辑
                      </div>
                    </Menu.Item>
                    <Menu.Item key={2}>
                      <div style={{ color: 'red' }} onClick={delte}>
                        删除
                      </div>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomCenter"
              >
                <MoreOutlined className={styles.operate} />
              </Dropdown>
            )} />
          <Column title='门店编号'
            dataIndex='org_no'
            key='org_no'
            align='center'
            width='100'
            sorter={(a, b) => a.brand_no - b.brand_no} />
             <Column title='门店名称'
            dataIndex='org_name'
            key='org_name'
            align='center'
            width='100'/>
             <Column title='门店类型'
            dataIndex='shop_type'
            key='shop_type'
            align='center'
            width='100'/>
             <Column title='门店地址'
            dataIndex='address'
            key='address'
            align='center'
            width='100' />
             <Column title='联系方式'
            dataIndex='tel_no'
            key='tel_no'
            align='center'
            width='100'/>
             <Column title='联系人'
            dataIndex='contact'
            key='contact'
            align='center'
            width='100'/>
        </Table>

      </ConfigProvider>
      {/* 添加或编辑 */}
      <AddModel
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        editList={isModalVisible == 'edit' ? editList : ''}
      >
      </AddModel>
    </div>
  )
}
export default Forms
```

## 九、useEffect

```react
function Welcome(props) {
 //useEffect有两个参数
 //参数一:一个常见的钩子函数
 //参数二：当其为[],表示只执行一次
  useEffect(() => {
    console.log(`Hello, ${props.name}`);
  }
  , 
 [props.name]
 );
上面例子中，useEffect()的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（props.name）。只有该变量发生变化时，副效应函数才会执行。如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了
  
return (
    <div>讲解useEffect</div>
)
}


useEffect() 第一个函数参数的返回值
副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。
useEffect()允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，useEffect()就不用返回任何值。

useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
上面例子中，useEffect()在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。
```

### useEffect注意点

> 使用useEffect()时，有一点需要注意。如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起。

#### 错误写法

```react
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);
  useEffect(() => {
    const timeoutA = setTimeout(() => setVarA(varA + 1), 1000);
    const timeoutB = setTimeout(() => setVarB(varB + 2), 2000);

    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeoutB);
    };
  }, [varA, varB]);

  return <span>{varA}, {varB}</span>;
}
```

上面的例子是错误的写法，副效应函数里面有两个定时器，它们之间并没有关系，其实是两个不相关的副效应，不应该写在一起。正确的写法是将它们分开写成两个useEffect()。

#### 正确写法

```react
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);

    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
```

## 十、useState设置取值问题

```react
const [dictList, setDictList] = useState([])

  useEffect(() => {
    utils.getDict("SHOP_TYPE").then((res) => {
      console.log('resReturn',res)
      setDictList(res)
      在此处取不到dictList更新后的数据，但是其实数据已经渲染上去啦
    })
  },[]);

```
