import React, { Component } from "react";
import blogService from "../service/blogHttp"
import { Input, Button, message } from 'antd';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: ""
        }
    }
    async componentDidMount() {
    }

    handleInput(e, kind) {
        // console.log(e.target.value, kind);
        switch (kind) {
            case "title":
                this.setState({
                    title: e.target.value
                })
                break;
            case "content":
                this.setState({
                    content: e.target.value
                })
                break;
            default:
                break;
        }
    }

    async save() {
        // console.log({ ...this.state.detail });
        let res = await blogService.create({
            title: this.state.title,
            content: this.state.content
        })
        if (res && res.errno === 0) {
            message.success("创建成功");
            this.props.history.push({ pathname: "/admin" })
        } else {
            message.error("创建失败");
        }
    }

    render() {
        return (<div style={{ margin: "40px" }}>
            新建博客
            <Input placeholder="标题"
                value={this.state.title}
                style={{ marginBottom: "10px" }}
                onChange={(event) => this.handleInput(event, "title")} />
            <Input.TextArea rows={4}
                value={this.state.content}
                style={{ marginBottom: "10px" }}
                onChange={(event) => this.handleInput(event, "content")} />
            <Button onClick={this.save.bind(this)} type="primary">保存</Button>
        </div>)
    }
}

export default Edit