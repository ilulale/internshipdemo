import React, { Component, useState, useEffect } from "react";
import Pagination from "./Pagination";
import Post from "./Post";
import axios from 'axios';


const Posts = ({user}) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)

    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await axios.get(`/api/posts/${user.id}`);
          setPosts(res.data);
          setLoading(false);
        };
        fetchPosts()},[])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if(loading){
        return <h3>Loading..........</h3>
    }else{
    return (
        <div
            style={{
                marginTop: "2rem"
            }}
        >
            <Post posts={currentPosts}
            />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>

    )

}}

export default Posts