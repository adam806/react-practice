import React, { Component } from "react";

function Dialog(props) {
    const color = props.color || "blue"
    return <div style={{ border: `4px solid ${color}` }}>
        {/* 此处必须叫children,类似与vue中的slot匿名插槽，代表插槽 */}
        {/* 将来使用Dialog的时候里面放的内容就在下面的props.children中渲染输出 */}

        {/* 面试题：props.children是什么？答：是合法的js表达式，可以是jsx，可以是函数，可以是元素 */}
        {props.children}

        {/* 作用域插槽 */}
        <div>
            {props.foo('这个内容是Dialog传递的')}
        </div>

        <div>
            {/* 具名插槽 */}
            {props.footer}
        </div>
    </div>
}
//welcomeDialog通过复合组件提供内容
function WelcomeDialog() {
    const footer = <button onClick={() => { alert("react") }}>确定</button>
    return (
        <Dialog color="red" footer={footer} foo={(c) => <p>{c}</p>}>
            <h1>欢迎光临</h1>
            <h1>感谢使用react</h1>
        </Dialog >
    )
}

//过滤器
function FilterP(props) {
    return <div>
        {/* Children一定是大写 */}
        {/* 这个map和数组的map不一样 是react的 */}
        {React.Children.map(props.children, child => {
            console.log(child);
            //不是p标签的元素都被过滤掉
            if (child.type !== "p") {
                return;
            }
            return child
        })}

    </div>
}

function RadioGroup(props) {
    //将name属性赋值给所有Radio
    return (
        <div>
            {/* 此处注意，虚拟dom的属性不可扩展，如果原来没有这个属性，则不可随意增加属性 */}
            {/* 如果按照下方写法，会报错object is not extensible，所以要用react的一个api：cloneElememt,用来复制一个虚拟dom */}
            {/* {React.Children.map(props.children, child => (
                child.props.name = props.name
            ))} */}

            {React.Children.map(props.children, child => (
                React.cloneElement(child, { name: props.name })
            ))}
        </div>

    )
}

function Radio(props) {
    return (
        <label>
            <input type="radio" name={props.name} />
            {/* 匿名插槽 */}
            {props.children}
        </label>
    )
}



export default function Composition() {
    return (
        <div>
            <WelcomeDialog>
            </WelcomeDialog>

            <FilterP>
                <h1>hhh</h1>
                <h2>555</h2>
                <h2>555</h2>
                <h2>555</h2>
                <p>我是被过滤出来的元素</p>
            </FilterP>

            <RadioGroup name="mvvm">
                <Radio value="vue">vue</Radio>
                <Radio value="vue">react</Radio>
                <Radio value="vue">angular</Radio>
            </RadioGroup>

        </div>

    )
}