import React from 'react';
// import JsxTest from "./JsxTest"
// import CompType from "./CompType"
// import StateTest from "./StateTest"
import CartSample from "./CartSample"

import './App.css';

function App() {
  return (
    <div className="App">
      {/* 自定义组件开头要大写 */}
      {/* <JsxTest></JsxTest> */}
      {/* 组件类型 */}
      {/* <CompType></CompType> */}
      {/* <StateTest></StateTest> */}
      {/* 购物车 */}
      <CartSample></CartSample>
    </div>
  );
}

export default App;
