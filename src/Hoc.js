import React, { Component } from "react";

//下方为高阶组件，接收一个组件，返回一个组件
//创建一个函数接收一个组件返回另一个组件,返回后的组件就是强化后的组件
function withStage(Component) {
    const NewComponents = (props) => {
        return <Component {...props} stage="react"></Component>
    };
    return NewComponents
}

//高阶组件链式调用,可以多次加强一个组件的功能，每次加强一个
//功能：日志记录
function withLog(Component) {
    console.log(`${Component.name}加强了`);
    return props => {
        return <Component {...props}></Component>
    }
}

function logWithOpts(opt) {
    return function withLog(Component) {
        console.log(`${Component.name}加强了`);
        return props => {
            return <Component {...props}></Component>
        }
    }
}

@withLog
@withStage
@withLog

//只有这个函数本身不是高阶组件，返回的函数是高阶组件的时候才这样用
// @logWithOpts({})

//当想要扩充一个组件的能力的时候首先应该想到的就应该是高阶组件
class Kaikeba extends Component {
    render() {
        return (
            <div>
                {this.props.stage} - {this.props.name}
            </div >
        )
    }

}

//高阶组件 装饰器写法


export default Kaikeba