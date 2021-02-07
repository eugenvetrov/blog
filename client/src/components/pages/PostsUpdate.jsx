import React, {  useState } from 'react'

const PostsUpdate = ({match}) => {

    const id = match.params.id
    
    const [put, setPost] = useState(
        {
          title: '',
          content: ''
        }
    )
  
   const handleChangeUpdateTitle = async (event) => {
      const value = event.target.value
      setPost(prevNote => {
        return {
          ...prevNote,
            title: value
            }
      }
      )
   }
    
    const handleChangeUpdateContent = async (event) => {
      const value = event.target.value;
      setPost(prevNote => {
        return {
          ...prevNote,
            content: value
          }
        }
        )
     }
  
    const putData = async ( url = '', data = {} ) => {
      
      // Default options are marked with *
      
      const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
  
    const handleUpdatePost = async () => {
      putData('http://localhost:9000/api/post/'+id, put)
    }

        return (
            <div className='container-fluid'>
                <input className="form-control"
                    type ="text"
                    onChange={handleChangeUpdateTitle}>
                    </input>
                <input className="form-control"
                    type ="text"
                    onChange={handleChangeUpdateContent}>
                    </input>

                <button className="btn btn-primary" onClick={handleUpdatePost}>Update Post</button>
                <a className="btn btn-danger" href={'/posts/list'}>Cancel</a>
            </div>
        )
}

export default PostsUpdate