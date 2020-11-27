
import React, {  useState, useEffect } from 'react'

const  updatePost = (id,event) => {
      event.preventDefault()
      window.location.href = `/posts/update/${id}`
  }

const deletePost = (id, event) => {

  event.preventDefault()
    
  const deleteData = async ( url = '') => {
            
              // Default options are marked with *
              
              const deleteMethod = {
                method: 'DELETE', // Method itself
                headers: {
                 'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                },
                // No need to have body, because we don't send nothing to the server.
               }
               // Make the HTTP Delete call using fetch api
               fetch(url, deleteMethod) 
               .then(response => response.json())
               .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
               .catch(err => console.log(err))
              }

            if (
              window.confirm(
                  `Do tou want to delete the movie ${id} permanently?`,
              )) {

            deleteData('http://localhost:9000/api/post/'+id)
            
            window.location.reload()

            }
            
}

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
        <p> <button className="btn btn-primary" onClick={(e) => updatePost(post._id, e)}>Update</button></p>
        <p><button className="btn btn-primary" onClick={(e) => deletePost(post._id, e)}>Delete</button></p>
        <a className="btn btn-danger" href={'/posts/list'}>Cancel</a>
           </div>): 'Chto-to ne tak'}
    </div>
  )
}

export default PostsList