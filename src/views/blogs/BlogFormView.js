"use strict";

import React from 'react';
import BlogForm from "../../components/blogs/BlogForm";
import BlogService from '../../services/BlogService';


export class BlogFormView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){

        if(this.props.history.location.pathname == '/postBlog') {
            this.setState({
                loading: false,
                blog: undefined,
                error: undefined
            });
        }
        else if(this.props.location.state != undefined && this.props.location.state.blog != undefined) {
            this.setState({
                loading: false,
                blog: this.props.location.state.blog,
                error: undefined
            });
        }
        else {
            this.setState({
                loading: true,
                error: undefined
            });

            let id = this.props.match.params.id;

            BlogService.getBlog(id).then((data) => {
                this.setState({
                    blog: data,
                    loading: false,
                    error: undefined
                });
            }).catch((e) => {
                console.error(e);
            });
        }
    }

    async updateBlog(blog) {
        if(this.state.blog == undefined) {
            try {
                let ret = await BlogService.postBlog(blog);
                this.props.history.push('/myBlogs');
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while creating blog'}));
            }
        } else {
            try {
                let ret = await BlogService.updateBlog(blog);
                this.props.history.goBack();
            } catch(err) {
                console.error(err);
                this.setState(Object.assign({}, this.state, {error: 'Error while updating blog'}));
            }
        }
    }

    render() {

        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (<BlogForm blog={this.state.blog} onSubmit={(blog) => this.updateBlog(blog)} error={this.state.error} />);
    }
}
