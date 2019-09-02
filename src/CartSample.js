import React, { Component } from 'react'

function Cart(props) { //函数型组件
    return (
        <table>
            <tbody>
                {props.data.map(d => (
                    <tr key={d.text} onClick={() => props.onSelect(d.text)}>
                        <td>{d.text}</td>
                        <td>{d.count}</td>
                        <td>¥{parseInt(d.price) * parseInt(d.count)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default class CartSample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "初始值",
            goods: [
                {
                    text: '标题1', price: 100, id: 1
                },
                {
                    text: '标题2', price: 80, id: 2
                }, {
                    text: '标题3', price: 60, id: 3
                }
            ],
            cart: [

            ]
        }
        setTimeout(() => {
            this.setState({ title: "this is title" })
        }, 1000)

    }
    handleChange = (e) => { //这是使用剪头函数来保存this的指向，这里很容易犯错
        this.setState({ name: e.target.value })
    }
    addGood = () => {
        this.setState({ goods: [...this.state.goods, { text: this.state.name, price: 60, id: 4 }] })
    }
    addCart = (good) => {
        const item = this.state.cart.find(c => c.text === good.text)
        if (item) {
            item.count += 1;
            this.setState({ cart: [...this.state.cart] })
        } else {
            this.setState({ cart: [...this.state.cart, { ...good, count: 1 }] })
        }

    }
    // 子父通信
    onSelect = (name) => {
        console.log(name)
    }
    render() {
        const goods = this.state.goods.map(good => <li key={good.text}>{good.text}<button onClick={(good) => this.addCart(good)}>加入购物车</button></li>)
        return (
            <div>
                {/* 条件语句 */}
                {/* 这里不能写if语句，但可以写三元表达式 */}
                <h1>{this.state.title}</h1>
                {this.state.title && <h1>{this.state.title}</h1>}
                {/* 事件处理说明 */}
                {/* 做事件处理时候一定注意this的指向，和单向数据流 */}
                <div>
                    {/* react中单向数据流 ，意味着任何的用户的输入和事件的输出都需要手动写*/}
                    <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e)}></input>
                    <button onClick={e => this.addGood(e)}>添加至列表</button>
                </div>
                <ul>
                    {/* 循环操作 */}
                    {goods}
                </ul>

                {/* 第一个onSelect是传给子组件使用的，第二个onSelect是在当前组件中生命的 */}
                <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>
            </div >
        )
    }
}
