import React from 'react'
//表单组件的核心：数据收集，数据校验，数据提交

//高阶组件:扩展现有表单，提供控件包装，事件处理，表单校验
function KFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      //传递进来的选项
      this.options = {};
      //收集到的数据
      this.state = {};
    }
    handleChange = (e) => {
      //数据的设置和校验
      const { name, value } = e.target
      //setStage是异步，此处要注意！validateField要放在回调中执行
      this.setState({ [name]: value }, () => {
        //单字段校验
        this.validateField(name);
      })
    }
    validateField = (field) => {
      const rules = this.options[field].rules;
      //some里任何一项不通过就返回true跳出，取反表示校验失败
      const isValid = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            //校验失败
            this.setState({
              [field + "Message"]: rule.messagee
            })
            return true;
          }
        }
        return false;
      })
      if (isValid) {
        this.setState({
          [field + "Message"]: ""
        })
      }
      return isValid;
    }
    validateFields = (cb) => {
      const rets = Object.keys(this.options).map(field => this.validateField(field))
      const ret = rets.every(v => v === true);
      cb(ret, this.state)
    }
    //强化input的包装函数，使input可以进行数据校验
    //接收字段名和校验选项返回一个高阶组件
    getFieldDec = (field, option) => {
      this.options[field] = option; //选项告诉我们如何校验
      //InputComp是传进来的input形参，这个返回出去的函数才是真正的高阶组件(接收一个组件，返回一个组件)
      return InputComp => (
        <div>
          {/* 注意，传进来的InputComp是一个虚拟dom，本身不能改变，需要先clone后再修改 */}
          {
            React.cloneElement(InputComp, {
              name: field,
              value: this.state[field] || "",
              onChange: this.handleChange //可以执行校验，设置状态等
            })
          }
        </div>
      )
    };
    render() {
      // 把上面的getFieldDec通过属性传递给需要被强化的组件
      return <Comp getFieldDec={this.getFieldDec} validateFields={this.validateFields}></Comp>
    }
  }

}

@KFormCreate
class KFormTest2 extends React.Component {
  onSubmit = () => {
    this.props.validateFields((isValid, values) => {
      if (isValid) {
        console.log(values);
        alert("登录了")
      } else {
        alert("校验失败")
      }
    });
  }
  render() {
    const { getFieldDec } = this.props;// 把getFieldDec从props中解构出来
    return (
      <div>
        <div>
          {getFieldDec('username', {
            rules: [{ required: true, message: "Please input your username" }]
          })(<input type="text" placeholder="用户名" />)}
        </div>
        <div>
          {getFieldDec('password', {
            rules: [{ required: true, message: "Please input your password" }]
          })(<input type="password" placeholder="密码" />)}
        </div>
        <button onClick={this.onSubmit}>登录2</button>
      </div>
    )
  }
}

export default KFormTest2;
