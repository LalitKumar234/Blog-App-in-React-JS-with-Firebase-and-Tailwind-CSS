import React from 'react'
import { auth, provider } from "../firebaseConfig"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({setIsAuth}) => {
    const navigate = useNavigate()
    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
          setIsAuth(true)
          localStorage.setItem("isAuth", true);
          navigate("/")
          localStorage.setItem("userName", JSON.stringify(result.user.displayName))
          localStorage.setItem("photoURL", JSON.stringify(result.user.photoURL))
        })
      }
    return (
        <div className='LoginComponent flex items-center justify-center h-screen'>
            <div className="loginCard flex flex-col items-center justify-center gap-3 shadow">
                <img src="https://img.freepik.com/premium-vector/modern-promotion-strategy-keywords-research-online-advertising-business-seo-optimization_566886-3851.jpg" alt="" />
                <h2 className='font-semibold text-lg text-2xl'>Welcome</h2>
                <p>Login to create your first Blog post</p>
                <div class="google-btn" onClick={signIn}>
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                    </div>
                    <p class="btn-text"><b>Sign in with google</b></p>
                </div>
            </div>
        </div>
    )
}

export default Login