"use strict";
import React from 'react';
import { BlogList } from '../components/reactmd/Blogs/BlogList';
import BlogService from '../services/BlogService';

export class BlogListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        BlogService.getBlogs().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    async deleteBlog(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });

        try {
            let ret = await BlogService.deleteBlog(id);
            let BlogIndex = this.state.data.map(Blog => Blog['_id']).indexOf(id);
            let Blogs = this.state.data;
            Blogs.splice(BlogIndex, 1);
            this.setState({
                data: [...Blogs],
                loading: false
            });
        } catch(err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <BlogList data={this.state.data} onDelete={(id) => this.deleteBlog(id)}/>
        );
    }
}
