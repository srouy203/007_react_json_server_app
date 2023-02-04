import React from 'react'
import { Link } from 'react-router-dom'


function Post({posts}) {
  return (
    <article className="post">

        <Link to={`/post/${posts.id}`}>
            <h2>{posts.title}</h2>
            <p className="postDate">{posts.datetime}</p>
        </Link>
        <p className="postBody">{
            (posts.body).length <=25
            ? posts.body
            : `${(posts.body).slice(0, 25)}...`
        }</p>
        
    </article>
  )
}

export default Post


