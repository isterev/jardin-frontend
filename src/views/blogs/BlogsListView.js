"use strict";

import React from 'react';

import BlogsList from '../../components/blogs/BlogsList';
import BlogService from '../../services/BlogService';


export class BlogsListView extends React.Component {

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

    render() {

       if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <BlogsList data={this.state.data}/>
        );
    }
}
