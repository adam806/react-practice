import React, { Component } from 'react'

function formatName(user) {
  return `${user.firstName}-${user.lastName}`
}

export default class JsxTest extends Component {
  render() {
    let name = "jerry"  
    let greet=<p>hello world</p>
    return (
      <div>
        {/* 表达式 只要是合法的js表达式即可 */}
        <h1>{name}</h1>
        {/* 函数也是表达式 */}
        <h1>{formatName({ firstName: 'adam', lastName: 'lilith' })}</h1>
        {/* jsx也可以 */}
        {greet}
      </div>
    )
  }
}
