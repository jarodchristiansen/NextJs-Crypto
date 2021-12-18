// import classes from "./profile-form.module.css";
import { useState, useEffect, useRef } from "react";

function UsernameForm(props) {
    const newUsernameRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredNewUsername = newUsernameRef.current.value;

        //Need to Add validation

        props.onChangePassword({
            newUsername: enteredNewUsername,
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="new-password">New Username</label>
                <input type="text" id="new-username" ref={newUsernameRef} />
            </div>

            <div>
                <button>Change Username</button>
            </div>
        </form>
    );
}

export default UsernameForm;
