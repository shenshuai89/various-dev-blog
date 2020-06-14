import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { Button, List } from 'antd';
import blogService from "../service/blogHttp"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      author:''
    }
  }

  async componentDidMount() {
    // console.log("componentDidMount", this.props.location.search.slice(1).split("=")[1]);
    let author = this.props.location.search.slice(1).split("=")[1]
    this.setState({
      author:author
    })
    let blogList = author ? await this.getAuthorList(author) : await this.getList()
    // console.log("blogList", blogList);
    if (blogList && blogList.errno === 0) {
      this.setState({
        list: blogList.data
      })
    }
  }
  // componentDidUpdate() {
  //   console.log("componentDidUpdate");
  //   console.log("this.state.author",this.state.author);
  // }
  // shouldComponentUpdate(nextProps,nextState) {
  //   if(this.state.author === this.state.newAuthor){
  //     return false
  //   }
  //   return true
  // }
  async getList() {
    this.props.history.push({ pathname : '/'})
    let blogList = await blogService.getLists()
    if (blogList && blogList.errno === 0) {
      this.setState({
        list: blogList.data,
        author:''
      })
    }
  }
  async getAuthorList(author) {
    if(!this.state.author){
      this.setState({
        author : author
      })
    }else if(this.state.author !== author){
      this.setState({
        author : author
      })
    }else if(this.state.author === author){
      return
    }
    
    let blogList = await blogService.getLists({ author })
    if (blogList && blogList.errno === 0) {
      this.setState({
        list: blogList.data
      })
    }
  }
  gotoLogin(){
    this.props.history.push({ pathname : '/login'})
  }
  componentWillUnmount(){
    this.setState({
      author:''
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span onClick={this.getList.bind(this)}>博客列表</span>  
          <Button type="primary" danger onClick={this.gotoLogin.bind(this)}>登录</Button>
        </header>
        <List
          itemLayout="horizontal"
          dataSource={this.state.list}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a href={'/detail/' + item.id}>{item.title}</a>}
                description={item.content}
              />
              <span className="author_link" onClick={() => this.getAuthorList(item.author)}>{item.author}</span>
            </List.Item>
          )}
        />

      </div>
    );
  }

}

export default App;
