import { useState, useRef, useEffect } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { toast, ToastContainer } from "react-nextjs-toast";

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

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
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
        setTimeout(() => {
          router.replace("/");
        }, 3000);
        toast.notify(`you have been logged in!`, {
          duration: 3,
          type: "success",
        });
      } else {
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
        console.log(result);
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
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
