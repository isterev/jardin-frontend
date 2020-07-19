"use strict";

import React from 'react';
import BlogDetails from "../../components/blogs/BlogDetails";
import BlogService from '../../services/BlogService';


export class BlogDetailsView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        BlogService.getBlog(id).then((data) => {
            this.setState({
                blog: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <BlogDetails blog={this.state.blog} onSubmit={(blog) => this.updateBlog(blog)} error={this.state.error}/>);
    }
}
