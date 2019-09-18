import React from 'react';
import './App.css';
// import JsxTest from "./JsxTest"
// import CompType from "./CompType"
// import StateTest from "./StateTest"
// import CartSample from "./CartSample"
// import Button from "antd/lib/button" //全量倒入
// import "antd/dist/antd.css" //全量倒入

//经过config-overrides.js的配置，可以做到部分倒入
// import { Button } from "antd"

// import CommentList from "./CommentList"

// import Hoc from "./Hoc"

// import Composition from "./Composition"
// import ContextTest from "./ContextTest"

import HookTest from "./HookTest"

// import KFormTest from "./KFormTest"
// import KFormTest2 from "./KFormTest2"
// import KFormTest3 from "./KFormTest3"

import store from "./store"
import { Provider } from "react-redux" //用来作为上下文给组件提供数据


function App() {
  return (
    <div className="App">
      {/* 自定义组件开头要大写 */}
      {/* <JsxTest></JsxTest> */}
      {/* 组件类型 */}
      {/* <CompType></CompType> */}
      {/* <StateTest></StateTest> */}
      {/* 购物车 */}
      {/* <CartSample></CartSample> */}
      {/* <Button type="primary">Button</Button> */}
      {/* <CommentList></CommentList> */}
      {/* 高阶组件 */}
      {/* <Hoc name="hoc"></Hoc>
      <Composition></Composition>
      <ContextTest></ContextTest> */}
      <Provider store={store}>
        <HookTest></HookTest>
      </Provider>
      {/* 组件设计与实现 */} 
      {/* <KFormTest></KFormTest> */}

      {/* <KFormTest2></KFormTest2> */}
      {/* <KFormTest3></KFormTest3> */}

    </div>
  );
}

export default App;
