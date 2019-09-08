import React, { Component } from 'react'

//使用高阶函数强化很弱的input
function KFromCreate(Comp) {
  const Hoc = class extends React.Component {
    constructor(props) {
      super(props)

      this.options = {};

      this.state = {};
    }
    handleChange = (e) => {
      //解构数据
      const { name, value } = e.target
      this.setState({ [name]: value }, () => {
        this.validateField(name)
      })
    }

    validateField = (field) => {
      const rules = this.options[field].rules; //按照什么样的规则来校验
      const isValid = rules.some(rule => {
       //TODO:待完善校验信息
      })
    }
    //接收弱组件准备强化
    getFieldDec = (field, option) => {
      this.options[field] = option;
      return InputComp => (
        <div>
          {/* 给传进来的弱input增加onChange方法 */}
          {
            React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange
            })
          }
        </div>
      )
    }
    render() {
      // 经过高阶组件强化后返回的组件
      return <Comp getFieldDec={this.getFieldDec}></Comp>
    }
  };
  return Hoc;
}

//装饰器
@KFromCreate
class KFormTest3 extends Component {
  onSubmit = () => {
    console.log('提交登录信息')
  }
  render() {
    const { getFieldDec } = this.props;
    return (
      <div>
        <div>
          {getFieldDec("username", {
            rules: [{ required: true, message: "Please input your username" }]
          })(<input type="text" placeholder="请输入用户名"></input>)}
        </div>
        <div>
          {getFieldDec("password", {
            rules: [{ required: true, message: "Please input your password" }]
          })(<input type="password" placeholder="请输入密码"></input>)}
        </div>
        <button onClick={this.onSubmit}>登录3</button>
      </div>
    )
  }
}

export default KFormTest3
