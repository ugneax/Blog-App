import React, { useRef } from 'react';


const Filtration = ({ posts, setPosts }) => {
    const dateFromRef = useRef(null)
    const dateToRef = useRef(null)
    const searchByUsernameRef = useRef(null)
    const searchByTitleRef = useRef(null)

    const getYearFromTimestamp = timestamp => {
        const date = new Date(timestamp);
        return date.getFullYear()
    }

    const filterPosts = async () => {
        let filteredPosts = [...posts]

        const dateFrom = dateFromRef.current.value;
        const dateTo = dateToRef.current.value;
        const searchByUsername = searchByUsernameRef.current.value.toLowerCase()
        const searchByTitle = searchByTitleRef.current.value.toLowerCase()

        if (dateFrom && dateTo) {
            filteredPosts = filteredPosts.filter(post =>
                getYearFromTimestamp(post.timestamp) >= Number(dateFrom) &&
                getYearFromTimestamp(post.timestamp) <= Number(dateTo)
            )
        } else if (dateFrom) {
            filteredPosts = filteredPosts.filter(post =>
                getYearFromTimestamp(post.timestamp) >= Number(dateFrom)
            )
        } else if (dateTo) {
            filteredPosts = filteredPosts.filter(post =>
                getYearFromTimestamp(post.timestamp) <= Number(dateTo)
            )
        }

        if (searchByUsername) {
            filteredPosts = filteredPosts.filter(post =>
                post.username.toLowerCase().includes(searchByUsername)
            )
        }

        if (searchByTitle) {
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchByTitle)
            )
        }

        setPosts(filteredPosts)
        console.log(filteredPosts)
    }

    return (
        <div>
            <div>
                <label>Date from: </label>
                <input className="searchInput" type="text" ref={dateFromRef}></input>
                <label>Date to:</label>
                <input className="searchInput" type="text" ref={dateToRef}></input>
            </div>
            <div>
                <label>Search by username: </label>
                <input className="searchInput" type="text" ref={searchByUsernameRef}></input>
            </div>
            <div>
                <label>Search by title: </label>
                <input className="searchInput" type="text" ref={searchByTitleRef}></input>
            </div>
            <button onClick={filterPosts}>Search</button>
        </div>
    )
}

export default Filtration
