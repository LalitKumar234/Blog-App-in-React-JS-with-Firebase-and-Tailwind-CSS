import React, { useEffect, useState } from 'react'
import Navigation from './OtherSmallComponents/Navigation'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useParams } from 'react-router-dom';
import Loader from './OtherSmallComponents/Loader';

const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState([])
  const postCollectionRef = collection(db, "Post")
  const [isLoading, setIsLoading] = useState(true)

  const getPost = async () => {
    const data = await getDocs(query(postCollectionRef, where("link", "==", `${id}`)))
    setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // console.log(data)
    setIsLoading(false)
  }
  useEffect(() => {
    getPost()
     if(post){
      console.log(post)
     }
  }, [])

  return (
    <div>
      <Navigation />
      {
        isLoading ? <Loader/> : <div className="flex mt-[5rem] container px-2">
        {
          post && post.map((data)=>{
            return(
              <div>
                <img className="postImage" src={data.featureImage} alt={data.title} />
                <h1 className='mt-5 font-semibold text-5xl text-center'>{data.title}</h1>
                <h3 className='text-center mt-5'><span className='font-semibold text-1xl '>Published At:</span> {data.createdAt.toDate().toDateString()}</h3>
                <div className="content text-center mt-5">
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </div>
              </div>
            )
          })
        }
        </div>
      }
      
    </div>
  )
}

export default Post