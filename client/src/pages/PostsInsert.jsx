import React, {  useState } from 'react'

const PostInsert = () => {

 const [post, setPost] = useState(
      {
        title: '',
        content: ''
      }
  )

 const handleChangeTitle = async (event) => {
    const value = event.target.value;
    setPost(prevNote => {
      return {
        ...prevNote,
          title: value
          }
    }
    )
 }
  
  const handleChangeContent = async (event) => {
    const value = event.target.value;
    setPost(prevNote => {
      return {
        ...prevNote,
          content: value
        }
      }
      )
   }

  const postData = async ( url = '', data = {} ) => {
    
    // Default options are marked with *
    
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .then(console.log(data))
    return response
  }

  const postDataClick = async () => {
    postData('http://localhost:9000/api/post', post)
  }

  return (
    <div className='container-fluid'>
                <input className="form-control"
                    type ="text"
                    onChange={handleChangeTitle}>
                    </input>

                    <input className="form-control"
                    type ="text"
                    onChange={handleChangeContent}>
                    </input>
                

                <button className="btn btn-primary" onClick={postDataClick}>Add Post</button>
                <button className="btn btn-primary" href={'/posts/list'}>Cancel</button>
    </div>
  )
}

export default PostInsert