import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Typography } from 'antd';
import blogService from "../service/blogHttp"
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: null
        }
    }
    async componentDidMount() {
        let res = await blogService.getDetail({ id: this.props.match.params.id })
        if (res && res.errno === 0) {
            this.setState({
                detail: res.data
            })
        }
    }
    render() {
        const { Title, Paragraph, Text } = Typography;
        const { title, content, author } = this.state.detail ? this.state.detail : {}
        return (
            <div style={{margin:"20px"}}>
                <Title>{title}</Title><Text>作者:<Link to={`/list?author=`+author} className="author_link">{author}</Link></Text>
                <Paragraph>
                    {content}
                </Paragraph>
            </div>
        )
    }
}

export default Detail