// 类组件和函数型组件的区别：
// 1.类组件必须要有render方法，render方法中要return最终的展现形式;
// 2.类组件中有独立的状态和独立的生命周期，函数型组件中没有;


import React, { Component } from 'react'

function Welcome1(props) { //函数型组件
  return (
    <div>
      Welcome1,{props.name},{props.age}
    </div>
  )
}


class Welcome2 extends Component { //类组件
  render() {
    return (
      <div>
        Welcome2,{this.props.name}-{this.props.age}
      </div>
    )
  }
}

export default function CompType() {
  return (
    <div>
      {/* 属性是只读的，不能改 */}
      {/* 将嵌套复杂的组件抽取为更小的组件是最佳实践 */}
      <Welcome1 name="tom" age="20"></Welcome1>
      <Welcome2 name="jerry" age="20"></Welcome2>
    </div>
  )
}
