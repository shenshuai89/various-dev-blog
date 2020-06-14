import React, { Component } from "react";
import cookie from 'react-cookies'
import { Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./login.css"
import userService from "../service/userHttp"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }
    async gotoLogin() {
        let res = await userService.login({
            username: this.state.username,
            password: this.state.password
        })
        if (res && res.errno === 0) {
            message.success(res.message);
            cookie.save("username", this.state.username)
            this.props.history.push({ pathname: "/admin" })
        } else {
            message.error(res.message);
        }
    }
    setUserName(e) {
        this.setState({
            username: e.target.value
        })
    }
    setPassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    render() {
        return (<div className="login">
            用户名：<Input placeholder="输入用户名" onInput={(e) => this.setUserName(e)} value={this.state.username} />
            密码：<Input.Password
                placeholder="请输入密码"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onInput={(e) => this.setPassword(e)} value={this.state.password}
            />
            <Button type="primary" onClick={this.gotoLogin.bind(this)}>登录</Button></div>)
    }
}

export default Login