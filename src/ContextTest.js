import React, { Component } from 'react'

//创建上下文
//Context必须大写
const Context = React.createContext()
const store = {
    token: "jilei"
}

export default class ContextTest extends Component {
    render() {
        return (
            // 可以用 "." 语法把Context中的provider给 "." 出来，只能在react中用
            // 把store传给子组件,隔多少代都行
            <Context.Provider value={store}>
                <div>
                    <Context.Consumer>
                        {value => <p>{value.token}</p>}
                    </Context.Consumer>
                </div>
            </Context.Provider>
        )
    }
}
