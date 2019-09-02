import React, { Component } from 'react'

class Clock extends Component {
  // 一 一和二都可以
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     date: new Date()
  //   }
  // }
  //二 一和二都可以
  state = {
    date: new Date(),
    counter: 1
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      //setState修改状态
      this.setState({
        date: new Date()
      })
    }, 1000);

    //批量操作：对同一个key的操作会合并成为一次，即最后一次
    //在componentDidMount中，对state的操作可能是异步的，会在在最后统一执行，所以setState下面紧接着的log是不能准确获取到state中修改的值的。
    //为了准确获取state中修改的值，可以给setState传一个回调函数，在回调函数中获取state中被修改的最新的值
    this.setState({
      counter: this.state.counter + 1
    })
    this.setState({
      counter: this.state.counter + 1
    })
    this.setState({
      counter: this.state.counter + 1
    })
    //这次log不能准确获取state中counter的值
    console.log('不准确获取counter', this.state.counter)

    //这次log可以准确获取state中counter的值
    this.setState((prev) => {
      console.log('准确获取counter', prev.counter)
      return prev.counter
    })

    //或者用一个定时器也可以获取到准确的counter值
    setTimeout(() => {
      console.log('准确获取counter', this.state.counter)
    }, 0)

    //还或者在原生事件中获取
    document.body.addEventListener("click", this.changeCounter)
  }

  componentWillMount() {
    clearInterval(this.timer)
  }
  changeCounter = () => { //用箭头函数是为了保持this的指向性
    console.log('准确获取counter', this.state.counter)
  }
  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
        <br></br>
        {this.state.counter}
      </div>
    )
  }
}


export default class StateTest extends Component {

  render() {
    return (
      <div>
        <Clock></Clock>
      </div>
    )
  }
}
