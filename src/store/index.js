import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk" //用以解决异步问题

//使用redux
// 1.创建store实例
// 2.注册该实例
// 3.组件中使用状态


export const init = (payload) => ({
    type: "init",
    payload
})
export const add = (payload) => ({
    type: "add",
    payload
})
export const loadingStart = () => ({
    type: "loadingStart",
})
export const loadingEnd = () => ({
    type: "loadingEnd",
})

export const asyncFetch = payload => {
    return dispatch => {
        // dispatch({ type: "loading_start" });
        // setTimeout(() => {
        //     dispatch({ type: "loading_end" });
        //     dispatch({ type: "init", payload });
        // }, 1000)
    }
}

function fruitReducer(state = { list: [], loading: false }, action) {
    switch (action.type) {
        case 'init':
            return { ...state, list: action.payload };
        case 'add':
            return { ...state, list: [...state.list, action.paylod] };
        case 'loading_start':
            return { ...state, loading: true }
        case 'loading_end':
            return { ...state, loading: false }
        default:
            return state

    }
}

//参数二是中间件函数
//中间件有顺序，要按照顺序来用
const store = createStore(fruitReducer, applyMiddleware(logger, thunk)) //createStore的参数需要一个reducer

export default store;