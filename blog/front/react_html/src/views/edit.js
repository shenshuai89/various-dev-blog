import React, { Component } from "react";
import blogService from "../service/blogHttp"
import { Input, Button, message } from 'antd';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: {
                title: "",
                content: ""
            }
        }
        // this.handleInput = this.handleInput.bind(this)
    }
    async componentDidMount() {
        console.log("id", this.props.match.params.id);
        let res = await blogService.getDetail({ id: this.props.match.params.id })
        if (res && res.errno === 0) {
            this.setState({
                detail: res.data
            })
        }
    }

    handleInput(e, kind) {
        // console.log(e.target.value, kind);
        switch (kind) {
            case "title":
                this.setState({
                    detail: {
                        ...this.state.detail,
                        title: e.target.value
                    }
                })
                break;
            case "content":
                this.setState({
                    detail: {
                        ...this.state.detail,
                        content: e.target.value
                    }
                })
                break;
            default:
                break;
        }
    }

    async save(){
        // console.log({...this.state.detail});
        let res = await blogService.update({ 
            id:this.state.detail.id,
            title:this.state.detail.title,
            content:this.state.detail.content
         })
        if (res && res.errno === 0) {
            message.success("更新成功");
            this.props.history.push({ pathname: "/admin" })
        } else {
            message.error("更新失败");
        }
    }

    render() {
        return (<div style={{ margin: "40px" }}>
            编辑页面
            <Input placeholder="标题"
                value={this.state.detail && this.state.detail.title}
                style={{ marginBottom: "10px" }}
                onChange={(event) => this.handleInput(event, "title")} />
            <Input.TextArea rows={4}
                value={this.state.detail && this.state.detail.content}
                style={{ marginBottom: "10px" }}
                onChange={(event) => this.handleInput(event, "content")} />
            <Button onClick={this.save.bind(this)} type="primary">保存</Button>
        </div>)
    }
}

export default Edit