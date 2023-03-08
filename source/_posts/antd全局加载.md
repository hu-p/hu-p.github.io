
---
title: antd全局加载
---
# antd全局加载

```typescript
// 当前正在请求的数量
let requestCount = 0

// 显示loading
const showLoading = () => {
  console.log('我在被调用',requestCount);
  
  if (requestCount === 0) { // 解决一个页面多个接口请求需要loading
    console.log('dddddd');
    
    const dom:any = document.createElement('div')
    console.log('kankan',dom);
    
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin />, dom)
  }
  requestCount ++
}

// 隐藏loading
const hideLoading = () => {
  requestCount --
  let retDom = document.getElementById('loading')
  if (requestCount === 0 ) {
    // document.body.removeChild(document.getElementById('loading'))
    return retDom ? document.body.removeChild(retDom) : null
  }
}

// 封装的get,post.put,delete请求
const get = async (
  url: string,
  parameter?: Record<string, unknown>,
  isLoading?:Boolean
): Promise<any> => {
  try {
    console.log('dangqianIsloading',isLoading);
    if(isLoading) {
      showLoading()
    }
    // const res = await request(url, { method: 'get', params: parameter })
    // return res;
    return await new Promise((resolve, reject) => {
      request(url, { method: 'get', params: parameter}).then((res)=> {
        // hideLoading();
        console.log('我在调用');
        resolve(res)
      })
    })
  } catch (error) {
    hideLoading()
    console.error(error);
  }
};
```

