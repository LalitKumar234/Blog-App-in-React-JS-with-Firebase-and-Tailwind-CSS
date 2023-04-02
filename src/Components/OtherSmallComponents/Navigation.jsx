import React, { useEffect, useState } from 'react'
import './Navigation.css'
import { auth } from '../../firebaseConfig'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [profilePic, setProfilePic] = useState('https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg')
    const [showDropDown, setShowDropDown] = useState(false)
    const [forceRender, setForceRender] = useState(false)
    const isAuth = localStorage.getItem("isAuth")
    const navigate = useNavigate()

    const handleForceRender = () => {
        setForceRender(!forceRender)
    }

    const handleSignOut = () => {
        localStorage.clear();
        signOut(auth).then(() => {
            navigate("/")
            handleForceRender()
            setProfilePic('https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg')
        })
        
    }
    useEffect(() => {
        const profile = localStorage.getItem("photoURL")

        if (profile) {
            setProfilePic(JSON.parse(profile))
        }
    }, [forceRender])
    return (
        <div className='navBar h-16 flex items-center justify-center shadow fixed w-full'>
            <div className="navBarInner mx-[2rem] w-full h-full flex items-center justify-between">
               <Link to='/'><div className="logo">
                <img className="w-12 rounded-full"src="edyLogo.jpg" alt="fontend_edy" />
                </div></Link> 
                <ul className='flex items-center gap-6'>
                    {isAuth ? (<li className="cursor-pointer bg-gray-800 p-2 px-5 text-white rounded-md" onClick={()=>navigate("/create")}>Create post</li>) : <div onClick={navigate('./login')}>Sign in to Create Post</div>}
                    <li className='profile-image cursor-pointer' onClick={() => setShowDropDown(!showDropDown)}>
                        <img src={profilePic} alt={JSON.parse(localStorage.getItem("userName"))} />
                        {
                            showDropDown ? <ul className="profileDropdown shadow flex flex-col p-1" onMouseLeave={() => setShowDropDown(false)}>
                                
                                {
                                    isAuth ? <><li className='p-3'>{JSON.parse(localStorage.getItem("userName"))}</li>
                                    <li className='p-3 cursor-pointer bg-gray-50' onClick={handleSignOut}>Log out</li> </>
                                    : <li className='p-3 cursor-pointer bg-gray-50' onClick={()=>navigate("/login")}>Login</li>
                                }
                            </ul> : null
                        }

                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation