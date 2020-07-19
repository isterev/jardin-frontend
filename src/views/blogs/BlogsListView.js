"use strict";

import React, {useEffect, useState} from 'react';

import BlogsList from '../../components/blogs/BlogsList';
import BlogService from '../../services/BlogService';
import UserService from "../../services/UserService";


export class BlogsListView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        BlogService.getBlogs().then((data) => {
            data.map((blog) => {
                let dataWithUserInfo = []
                UserService.getUserById(blog['authorId']).then((val) => {
                    blog['authorFirstName'] = val['firstName']
                    blog['authorLastName'] = val['lastName']
                    dataWithUserInfo = [...dataWithUserInfo, blog]
                    this.setState({
                        data: dataWithUserInfo,
                        loading: false
                    });
                })
            })

        }).catch((e) => {
            console.error(e);
        });

        let findBlogs = async () => {
            return BlogService.getBlogs()
        }


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

