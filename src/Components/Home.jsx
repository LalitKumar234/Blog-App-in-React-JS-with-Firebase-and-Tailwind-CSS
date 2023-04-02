import React, { useEffect, useState } from 'react'
import Navigation from './OtherSmallComponents/Navigation'
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import Loader from './OtherSmallComponents/Loader';
const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const postCollectionRef = collection(db, "Post")
  const getPost = async () => {
    const data = await getDocs(query(postCollectionRef, orderBy('createdAt', 'desc')))
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setIsLoading(false)
  }
  useEffect(() => {
    getPost()
    console.log(posts)
  }, [])
  return (
    <div>
      <Navigation />
      <div className="bg-slate-200 w-full h-[25rem] mt-[4rem]">
        <div className="flex  justify-between align-center h-full">
          <div className="px-[8rem] flex flex-col gap-5 align-start justify-center w-2/4">
            <h1 className='font-semibold text-lg text-5xl mt-3 '>Blog Application with React JS and Firebase</h1>
            <p className='font-semibold'>Follow @frontend_edy for more</p>

          </div>
          <div className="flex">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
          </div>
        </div>
      </div>
      {
        isLoading ? <Loader/> :<div className="flex w-full align-center justify-center ">
        <div className="flex flex-wrap container align-center justify-center mt-10 gap-5 w-[80rem] md:w-[50rem] lg:w-[80rem]">
          {
            posts && posts.map((post) => {
              return (<div className="max-w-lg mx-auto" key={post.id}>
                <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                  <img className="rounded-t-lg thumbnail-image" src={post.featureImage} alt={post.title} />
                  <div className="p-5">
                    <h5 className="text-gray-900 title font-bold text-2xl tracking-tight mb-2">{post.title}</h5>
                    <div className="font-normal text-gray-700 mb-3 content">
                    {/* <div dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
                    </div>
                    
                    <div className='mt-4 flex items-center gap-3 profile-image'><img className="w-10 " src={post.profilePic} alt="" /> <p className='font-semibold'>{post.author}</p></div>
                    <Link to={`/post/${post.link}`}><button className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                      Read Blog
                    </button>
                    </Link>
                  </div>
                </div>
              </div>)
            })
          }
        </div>
      </div>
      }
      
    </div>
  )
}

export default Home