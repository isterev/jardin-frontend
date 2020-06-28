"use strict";

import React from 'react';

import BlogsList from '../../components/blogs/BlogsList';

//TODO import BlogsService from '../../services/BlogsService';


export class BlogsListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        /*this.setState({
            loading: true
        });*/

        // TODO
        /*BlogsService.getBlogs().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });*/
    }

    render() {
        // TODO
        /*if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }*/

        return (
            <BlogsList data={this.state.data}/>
        );
    }
}
