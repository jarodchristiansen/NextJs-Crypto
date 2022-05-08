import classes from "./auth-form.module.css";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaGithub,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { signIn } from "next-auth/client";
import { useMediaQuery } from "react-responsive";

const AuthFormFull = ({ setIsLoading, loadedProviders }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  const [hasError, setHasError] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [termsAndConditionsSigned, setTermsAndConditionsSigned] =
    useState(false);
  const [signUpOrIn, setSignUpOrIn] = useState("SignUp");
  const [formDisabled, setFormDisabled] = useState(false);

  async function handleValidateEmail(e) {
    console.log("this is the handleValidateEmail call", e);
    if (e.length > 5) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
        setHasError();
        setSubmitButtonDisabled(false);
        return true;
      } else {
        setHasError({
          ErrorText: "Email structure is invalid",
        });
        setSubmitButtonDisabled(true);
        return false;
      }
    }
  }

  const handleFormValues = async (fieldId, fieldValue) => {
    console.log("this is the name", fieldId, fieldValue);
    switch (fieldId) {
      case "emailAddress":
        // code block
        console.log("this is the emailAddress value", fieldValue);
        handleValidateEmail(fieldValue);
        break;
      case "password":
        // code block
        break;
      case "checkbox":
        // code block
        console.log("this is the checkbox value", fieldValue);
        if (hasError && termsAndConditionsSigned) {
          setSubmitButtonDisabled(false);
        }
        break;
      case "username":
        console.log("this is the username value", fieldValue);
        break;
      default:
      // code block
    }
  };

  async function signInOthers(provider) {
    setFormDisabled(true);
    const result = await signIn(provider.id, {
      callbackUrl: `${window.location.origin}`,
    });
    console.log("this is the result of SignInOthers", result);
  }

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    handleValidateSignUpForm();
    // setFormDisabled(true);
    // if (!hasError) {
    //   console.log("this is the handleSubmit values", e.target);
    //   !termsAndConditionsSigned &&
    //     setHasError({
    //       ErrorText: "Must Agree To Terms and Conditions To Proceed",
    //     });
    //   setFormDisabled(false);
    // } else {
    //   console.log("errors in this piece yo", hasError?.ErrorText);
    // }
  };

  const handleValidateSignUpForm = () => {
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  return (
    <div className={"flex col card outline-2"}>
      <h1 className={"mt-4"}>
        {signUpOrIn === "SignUp" ? "Sign Up" : "Sign In"}
      </h1>

      <div className={"mt-3"}>
        <button
          type="button"
          className="standardized-button px-3 mx-1"
          onClick={() => setSignUpOrIn("SignIn")}
        >
          Sign In
        </button>
        <button
          type="button"
          className="standardized-button px-3 mx-1"
          onClick={() => setSignUpOrIn("SignUp")}
        >
          Sign Up
        </button>
      </div>
      {signUpOrIn === "SignUp" ? (
        // <form
        //   onSubmit={handleSubmitSignUp}
        //   className={"py-3 px-5"}
        //   disabled={formDisabled}
        // >
        //   {hasError && <div>{hasError?.ErrorText}</div>}
        //
        //   <div className="mb-3">
        //     <label htmlFor="emailAddress" className="form-label">
        //       Email address
        //     </label>
        //     <input
        //       type="email"
        //       className="form-control"
        //       id="emailAddress"
        //       aria-describedby="email address"
        //       onChange={(e) => {
        //         // handleValidateEmail(e.target.value);
        //         handleFormValues(e.target?.id, e.target.value);
        //       }}
        //       required
        //     />
        //     <div id="emailHelp" className="form-text">
        //       We'll never share your email with anyone else.
        //     </div>
        //   </div>
        //   <div className="mb-3">
        //     <label htmlFor="password" className="form-label">
        //       Password
        //     </label>
        //     <input
        //       type="password"
        //       className="form-control"
        //       id="password"
        //       onChange={(e) => {
        //         // handleValidateEmail(e.target.value);
        //         handleFormValues(e.target?.id, e.target.value);
        //       }}
        //       required
        //     />
        //   </div>
        //
        //   <div className="mb-3">
        //     <label htmlFor="username" className="form-label">
        //       Username
        //     </label>
        //     <input
        //       type="text"
        //       className="form-control"
        //       id="username"
        //       onChange={(e) => {
        //         // handleValidateEmail(e.target.value);
        //         handleFormValues(e.target?.id, e.target.value);
        //       }}
        //     />
        //   </div>
        //
        //   <div className={"mt-4"}>
        //     <input
        //       type="checkbox"
        //       className="form-check-input mx-3"
        //       id="checkbox"
        //       onChange={(e) => {
        //         // handleValidateEmail(e.target.value);
        //         setTermsAndConditionsSigned(!termsAndConditionsSigned);
        //         handleFormValues(e.target?.id, e.target.value);
        //       }}
        //       value={!termsAndConditionsSigned}
        //       checked={termsAndConditionsSigned}
        //       required
        //     />
        //     <label className="form-check-label text-nowrap " htmlFor="checkbox">
        //       I Agree To The Terms and Conditions
        //     </label>
        //   </div>
        //
        //   <div className={isMobile ? "container" : "container w-50"}>
        //     <div className={"row g-0 my-5"}>
        //       {loadedProviders &&
        //         Object.values(loadedProviders).map((provider) => (
        //           <div className={"col px-0"}>
        //             <button
        //               className={
        //                 isMobile
        //                   ? "standardized-button w-100"
        //                   : "standardized-button w-75"
        //               }
        //             >
        //               {provider.name === "GitHub" && <FaGithub size={28} />}
        //               {provider.name === "Facebook" && (
        //                 <FaFacebookSquare size={28} />
        //               )}
        //               {provider.name === "Google" && <FaGoogle size={28} />}
        //               {provider.name === "Twitter" && <FaTwitter size={28} />}
        //             </button>
        //           </div>
        //         ))}
        //
        //       {/*{loadedProviders &&*/}
        //       {/*  Object.values(loadedProviders).map((provider) => (*/}
        //       {/*    <div key={provider.name}>*/}
        //       {/*      /!*<button onClick={() => signIn(provider.id)}>*!/*/}
        //       {/*      /!*    Sign in with {provider.name}*!/*/}
        //       {/*      /!*</button>*!/*/}
        //
        //       {/*      <Button*/}
        //       {/*        onClick={() => {*/}
        //       {/*          signInOthers(provider);*/}
        //       {/*        }}*/}
        //       {/*        // disabled={buttonsDisabled}*/}
        //       {/*      >*/}
        //       {/*        {provider.name === "GitHub" && <FaGithub size={28} />}*/}
        //
        //       {/*        {provider.name === "Facebook" && (*/}
        //       {/*          <FaFacebookSquare size={28} />*/}
        //       {/*        )}*/}
        //
        //       {/*        {provider.name === "Google" && <FaGoogle size={28} />}*/}
        //
        //       {/*        {provider.name === "Twitter" && <FaTwitter size={28} />}*/}
        //       {/*      </Button>*/}
        //       {/*    </div>*/}
        //       {/*  ))}*/}
        //
        //       {/*{loadedProviders &&*/}
        //       {/*  Object.values(loadedProviders).map((provider) => (*/}
        //       {/*    <div key={provider.name}>*/}
        //       {/*      /!*<button onClick={() => signIn(provider.id)}>*!/*/}
        //       {/*      /!*    Sign in with {provider.name}*!/*/}
        //       {/*      /!*</button>*!/*/}
        //
        //       {/*      <Button*/}
        //       {/*        onClick={() => {*/}
        //       {/*          signInOthers(provider);*/}
        //       {/*        }}*/}
        //       {/*        // disabled={buttonsDisabled}*/}
        //       {/*      >*/}
        //       {/*        {provider.name === "GitHub" && <FaGithub size={28} />}*/}
        //
        //       {/*        {provider.name === "Facebook" && (*/}
        //       {/*          <FaFacebookSquare size={28} />*/}
        //       {/*        )}*/}
        //
        //       {/*        {provider.name === "Google" && <FaGoogle size={28} />}*/}
        //
        //       {/*        {provider.name === "Twitter" && <FaTwitter size={28} />}*/}
        //       {/*      </Button>*/}
        //       {/*    </div>*/}
        //       {/*  ))}*/}
        //
        //       {/*<div className={classes.square}></div>*/}
        //       {/*<div className={classes.square}></div>*/}
        //       {/*<div className={classes.square}></div>*/}
        //       {/*<div className={classes.square}></div>*/}
        //     </div>
        //   </div>
        //
        //   <button type="submit" className="standardized-button mt-3">
        //     Submit
        //   </button>
        // </form>
        <form
          className="row g-3 needs-validation"
          onSubmit={handleSubmitSignUp}
          noValidate
        >
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              value="Mark"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">
              State
            </label>
            <select className="form-select" id="validationCustom04" required>
              <option selected disabled value="">
                Choose...
              </option>
              <option>...</option>
            </select>
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Submit form
            </button>
          </div>
        </form>
      ) : (
        <form>Second Form</form>
      )}
    </div>
  );
};

export default AuthFormFull;
