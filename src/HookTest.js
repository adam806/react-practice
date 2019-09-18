import React, { useState, useEffect, useReducer, useContext } from 'react'
import { connect } from 'react-redux';
import { loadingStart, loadingEnd, init, asyncFetch } from "./store"
import { BrowserRouter, Link, Route } from "react-router-dom"

function FruitList({ fruits, setFruit }) {
    return (
        <div>
            <ul>
                {fruits.map(f => (
                    //这里有一个状态提升，把自组件的状态通过setFruit传给父组件了
                    <li key={f} onClick={() => setFruit(f)}>
                        <Link to={`/detail/${f}`}>{f}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}

const FruitAdd = connect()(function FruitAdd({ dispatch }) {
    const [pname, setPname] = useState("")
    const onAddFruit = (e) => {
        if (e.key === "Enter") {
            // props.onAddFruit(pname);
            dispatch({ type: 'add', payload: pname })
            setPname("")
        }
    }
    return (
        <div>
            <input type="text" value={pname} onChange={(e) => { setPname(e.target.value) }} onKeyDown={onAddFruit} />
        </div>
    )
})

const mapStateToProps = state => ({
    fruits: state.list,
    loading: state.loading
})

const mapDispatchToProps = {
    loadingStart, loadingEnd, init, asyncFetch
}

function Detail({ match, history, location }) {
    console.log(match, history, location)

    return (
        <div>
            <h3>{match.params.fruit}的详情</h3>
            <p>...</p>
            <div>
                <button onClick={history.goBack}>返回</button>
            </div>
        </div>
    )
}


function HookTest({ fruits, loading, asyncFetch }) {

    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数，需要注意的是第二个参数对第一个参数的变更是完全覆盖
    //现在这样写就相当于没用hook之前的state和setStat，这些fruit和fruits都可以理解成使用hook之前的state中的值
    const [fruit, setFruit] = useState("草莓")
    // const [fruits, setFruits] = useState([])

    //参数一是相关reducer,参数二是初始值
    // const [fruits, dispatch] = useReducer(fruitReducer, [])

    //使用useEffect操作副作用,副作用可以移步获取数据 
    //如果useEffect不设置依赖的话，任何状态变化都会导致useEffect不停的执行，会看到不断的打印出log来
    //所以useEffect的第二个参数很重要，是一个数组，用来表示useEffect的依赖，只有在该依赖变化了的时候useEffect才会执行
    //如果没有依赖，那就设置一个空数组，表示仅执行一次

    // useEffect(() => {
    //     console.log('get Fruits')
    //     //模仿一个接口调用
    //     // dispatch({ type: "loading_start" })
    //     loadingStart()
    //     setTimeout(() => {
    //         // setFruits(["草莓", "香蕉"]) 
    //         // dispatch({ type: "loading_end" })
    //         loadingEnd()
    //         init(["草莓", "香蕉"])
    //     }, 1000)
    // }, [])

    asyncFetch(["草莓", "香蕉"])

    useEffect(() => {
        document.title = fruit
    }, [fruit])

    //清除副作用，使用的场景是当这个组件被卸载的时候需要清除副作用（当前组件的隐藏就可以让这个组件被卸载），否则可能导致内存的泄漏
    //清除副作用只要返回清除函数即可
    // useEffect(() => {
    // const timer = setInterval(() => {
    //     console.log("应用启动了");
    // }, 100)

    // //返回清除函数
    // return function () {
    //     clearInterval(timer)
    // }
    // }, [])

    return (
        <BrowserRouter>
            <nav>
                <Link to="/">水果列表</Link>
                <Link to="/add">添加水果</Link>
            </nav>

            <div>
                {/* 给Route加一个exact属性 使 ‘/’  路由成为独占的，不会被/add也匹配上*/}
                <Route path="/" render={() => (
                    loading ? (<div>数据加载中...</div>) : (<FruitList fruits={fruits} setFruit={setFruit}></FruitList>)
                )}></Route>
                <Route path="/add" component={FruitAdd}></Route>
                <Route path="/detail/:fruit" component={Detail}></Route>
            </div>

            {/* 加载状态处理 */}
        </BrowserRouter>

    )
}
  
// 相当于vue中的mapState
export default connect(mapStateToProps, mapDispatchToProps)(HookTest)

