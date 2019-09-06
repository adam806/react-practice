import React from 'react'

//写一个高阶组件：扩展现有的表单，提供控件包装，事件处理，表单校验
function kFromCreate(Comp) {
    return class extends React.Component { //class后面可以不写名字，这叫匿名class
        constructor(props) {
            super(props)
            //选项
            this.options = {}
            //数据
            this.state = {}
        }
        //处理输入事件
        handleChange = (e) => {
            //数据的设置和校验
            const { name, value } = e.target
            //收集表单数据
            this.setState({ [name]: value }, () => {
                //这里一定要在回调里设置，以为setState是异步的
                //单字段校验
                this.validateField(name);
            });


        }
        validateField = (field) => {
            const rules = this.options[field].rules;
            //some里面任何一项不同哟就返回true跳出，取反表示校验的失败
            const isValid = !rules.some(rule => {
                if (rule.required) {
                    if (this.state[field]) {
                        //校验失败
                        this.setState({ [field + 'Message']: rule.message })
                        return true;
                    }
                }
                return false;
            })
            if (isValid) {
                this.setState({ [field + 'Message']: "" })
            }
            return isValid;
        }
        validateFields = (cb) => {
            const rets = Object.keys(this.options).map(field => {
                this.validateField(field)
            })

            const ret = rets.every(v => v === true)
            cb(ret, this.state)
        }
        //包装函数：接收字段名和校验选项返回一个高阶组件
        getFieldDec = (field, option) => {
            this.options[field] = option;
            return InputComp => (
                <div>
                    {
                        React.cloneElement(InputComp, {
                            name: field,
                            value: this.state[field] || "",
                            onChange: this.handleChange //执行校验设置状态等
                        })
                    }
                </div>
            )
        };

        render() {
            return <Comp getFieldDec={this.getFieldDec} validateFields={this.validateFields}></Comp>
        }
    }
}

@kFromCreate //装饰器

class KFromTest extends React.Component {
    onSubmit = () => {
        this.props.validateFields((isValid, values) => {
            if (isValid) {
                console.log(values);
                alert("登录了")
            } else {
                alert("校验失败!")
            }
        })
    }
    render() {
        const { getFieldDec } = this.props;
        return (
            <div>
                <div>
                    {getFieldDec("username", {
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(<input type="text" />)}
                </div>

                <div>
                    {getFieldDec("password", {
                        rules: [{ required: true, message: 'Please input your password!' }]
                    })(<input type="password" />)}
                </div>
                <button onClick={this.onSubmit}>登录</button>
            </div >
        )
    }
}

export default KFromTest
