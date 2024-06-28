import React, {useEffect} from 'react';
import SinglePost from "../Components/SinglePost";
import ReactPaginate from 'react-paginate';
import {useState} from "react";
import http from "../Plugins/http";
import Filtration from "../Components/Filtration";


const PostsPage = () => {
    return (
        <PaginatedItems itemsPerPage={30}/>
    )
}

const Items = ({ posts}) => {
    return (
        <>

            <div className="postsContainer">
                {posts && posts.map((post, index) => (
                    <SinglePost post={post} key={index} />
                ))}
            </div>
        </>
    )
}

const PaginatedItems = ({ itemsPerPage }) => {
    const [posts, setPosts] = useState([])
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        http.get("/getallposts")
            .then(res => {
                setPosts(res.data); // assuming res.data contains the posts array
            })
    }, [])

    const endOffset = itemOffset + itemsPerPage;
    const currentPosts = posts.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(posts.length / itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % posts.length
        setItemOffset(newOffset)
    }

    return (
        <>
            <Filtration posts={posts} setPosts={setPosts}/>
            <Items posts={currentPosts} />
            <ReactPaginate className="pegination"
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={30}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default PostsPage