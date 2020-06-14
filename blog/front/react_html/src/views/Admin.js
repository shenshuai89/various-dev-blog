import React, { Component } from "react";
import { PageHeader, Input, Space, Table,Button, message } from 'antd';
import blogService from "../service/blogHttp"
import "./admin.css"

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            lists: []
        }
    }
    async componentDidMount() {
        // console.log(document.cookie.split("=")[1])
        let author = document.cookie.split("=")[1]
        this.setState({
            username: author
        }, () => this.handleGetBlog())

    }

    async handleGetBlog() {
        // let author = document.cookie.split("=")[1]
        let blogList = await blogService.getLists({ author: this.state.username })
        if (blogList && blogList.errno === 0) {
            this.setState({
                lists: blogList.data
            })
        }
    }
    async handleSearchBlog(key) {
        let author = document.cookie.split("=")[1]
        let blogList = await blogService.getLists({ author, keyword: key })
        if (blogList && blogList.errno === 0) {
            this.setState({
                lists: blogList.data
            })
        }
    }
    async handleDel(id) {
        let res = await blogService.del({id})
        if(res && res.errno ===0){
            message.success("删除成功")
            this.handleGetBlog()
        }
    }
    handleEdit(id) {
        this.props.history.push("/edit/"+id)
    }
    createBlog(){
        this.props.history.push({pathname:"/new"})
    }

    render() {
        const columns = [
            {
                title: '标题',
                key: "id",
                dataIndex: 'title',
            },
            {
                title: '内容',
                key: "id",
                dataIndex: 'content',
            },
            {
                title: '操作',
                width: "120px",
                render: (text, record) => (
                    <Space size="middle">
                        <span onClick={() => this.handleEdit(record.id)}>编辑</span>
                        <span onClick={() => this.handleDel(record.id)}>删除</span>
                    </Space>
                ),
            },
        ];

        return (<div className="login">
            <PageHeader
                className="site-page-header"
                title="后台管理"
                subTitle={this.state.username || "只有登录之后才能访问"}
            />
            <Button type="primary" danger style={{margin:"10px 0"}}
                onClick={()=>this.createBlog()}
            >新建博客</Button>
            <Input.Search
                placeholder="搜索博客"
                enterButton="Search"
                size="large"
                onSearch={value => this.handleSearchBlog(value)}
            />
            <Table columns={columns} dataSource={this.state.lists} rowKey={(record, index) => `${record.id}`} pagination={false} />
        </div>)
    }
}

export default Admin