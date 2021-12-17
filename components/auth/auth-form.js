import React, { useState, useRef, useEffect } from "react";
import classes from "./auth-form.module.css";
import {getProviders, signIn, useSession} from "next-auth/client";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { toast, ToastContainer } from "react-nextjs-toast";
import {initializeStore} from "../../store";
import {Button, Row} from "react-bootstrap";
import {message} from "antd";
import { FaGithub, FaFacebookSquare, FaGoogle, FaTwitter } from 'react-icons/fa'


async function createUser(email, password, username) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function AuthForm(props) {

  const { providers } = props
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedProviders, setLoadedProviders] = useState()


  useEffect(() => {
    console.log("this is the providers in auth-form", providers)
    getSession().then((session) => {
      setIsLoading(false);
      if (session) {
        router.replace("/");
      } else {
        loadProviders()
      }
    });
  }, [router]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function loadProviders() {
    let providers = await getProviders();
    delete providers.credentials
    setLoadedProviders(providers)
    console.log("this is loadProviders output ---", loadedProviders)
  }

  const determineColor = (provider) => {
    console.log('this is the provider', provider)
    switch (provider) {
      case 'Facebook':
        return "outline-primary"
      case 'Google':
        return 'outline-danger'
      case 'Github':
        return 'outline-dark'
      case 'Twitter':
        return 'outline-info'
      default:
        return 'outline-dark'
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredPassword = passwordInputRef?.current?.value;
    const userName = userNameInputRef?.current?.value;

    //optional: Add validation on input form.

    if (isLogin) {
      //log user in
      console.log("entered information", enteredEmail, enteredPassword);
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log("result ----", result);
      if (!result.error) {
        //set some auth state


       await getSession().then((session) => {
          setIsLoading(false);
          if (session) {
            const reduxStore = initializeStore()
            const { dispatch } = reduxStore

          try {
            dispatch({
              type: "SET_USER",
              user: session.user
            })
            setTimeout(() => {
              router.replace("/");
            }, 3000);
          } catch (err) {
              console.log("no user to dispatch")
          }
          }
        });

        toast.notify(`you have been logged in!`, {
          duration: 3,
          type: "success",
        });
      } else {
        toast.notify(`${result.error}`, {
          duration: 10,
          type: "error",
        });
        console.log("this is the result.error", result.error);
      }
    } else {
      console.log("this is the username in else statement", userName);
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          userName
        );
        setTimeout(() => {
          router.replace("/");
        }, 3000);
        toast.notify(`user has been created!`, {
          duration: 3,
          type: "success",
        });
      } catch (err) {
        toast.notify(`${err}`, {
          duration: 10,
          type: "error",
        });
        console.log(err);
      }
    }
  }

  console.log("this is isLogin", isLogin);
  return (
    <section className={classes.auth}>
      <ToastContainer position={"bottom"} />
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">Your Username</label>
            <input type="text" id="username" ref={userNameInputRef} required />
          </div>
        )}
        <div className={classes.actions}>
          <button type={"submit"} onClick={(e) => submitHandler(e)}>
            {isLogin ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
            <hr/>
            <div className={classes.orText}>
              <h6>Or</h6>
            </div>
          </div>

          <div>
            Sign in with:
          </div>
          <div style={{display: "block", maxWidth: "90%"}}>
            <div className={classes.outer}>

              {loadedProviders && Object.values(loadedProviders).map((provider) => (
                  <div key={provider.name} className={classes.box}>
                    {/*<button onClick={() => signIn(provider.id)}>*/}
                    {/*    Sign in with {provider.name}*/}
                    {/*</button>*/}
                    <Button className={classes.iconButtons} onClick={() => {
                      setIsLoading(true)
                      message.success('Successfully Signed in')
                      signIn(provider.id, {
                        callbackUrl: `${window.location.origin}/`,
                      })
                      setIsLoading(false)
                    }}
                            disabled={isLoading}
                    >

                      {provider.name === "GitHub" && (
                          <FaGithub size={28}/>
                      )}

                      {provider.name === "Facebook" && (
                          <FaFacebookSquare size={28}/>
                      )}

                      {provider.name === "Google" && (
                          <FaGoogle size={28}/>
                      )}


                      {provider.name === "Twitter" && (
                          <FaTwitter size={28}/>
                      )}



                    </Button>
                  </div>
              ))}




              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
              {/*<div className={classes.square}></div>*/}
            </div>
          </div>

        </div>
      </form>
    </section>
  );
}


// This is the recommended way for Next.js 9.3 or newer
// export async function getServerSideProps(context) {
//   const providers = await getProviders()
//   return {
//     props: { providers },
//   }
// }

export default AuthForm;
