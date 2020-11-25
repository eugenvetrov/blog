
import React, {  useState, useEffect } from 'react'

const PostsList = () => {
  let [callAPI, setCallAPI] = useState()

  const getData = async (url = '') => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    return response.json()


    
    // setCallAPI(result.json) // parses JSON response into native JavaScript objects
  }
  
    useEffect(() => {
      getData('http://localhost:9000/api/posts').then(
        res=> setCallAPI(res.data)
      )
    }, [])  

  return (
    <div className='container-fluid'>
        { callAPI ? callAPI.map(post =><div key={post._id}>
           <p>{post.title}</p>
        <p>{post.content}</p>
           </div>): 'Chto-to ne tak'}
    </div>
  )
}

export default PostsList