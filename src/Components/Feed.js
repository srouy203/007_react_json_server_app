import React from 'react'
import Post from './Post';
function Feed({posts}) {
  return (
    <>
      {posts.map(posts => (
        <Post key={posts.id} posts={posts}/>
      ))}
    </>
  )
}

export default Feed;
