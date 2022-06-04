import { userState, useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import { getSession, session } from "next-auth/client";
import { useRouter } from "next/router";
import UsernameChangeModal from "./username-change-modal";
import fetch from "unfetch";
import { Button } from "react-bootstrap";
// import classes from "./user-profile.module.css";
import Favorites from "./favorites";
import dynamic from "next/dynamic";
import LoadingSpinner from "../ui/loading-spinner";
import SessionFavoritesTable from "./SessionFavoritesTable";

const AblyChatComponent = dynamic(() => import("../chat/AblyChatComponent"), {
  ssr: false,
});

function UserProfile() {
  // Redirect away if NOT auth
  const router = useRouter();
  const [show, setShow] = useState(false);

  let username = router?.query?.username;

  if (username !== null && username !== undefined) {
    username = Object.values(username)[0];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();

  const [profileSection, setProfileSection] = useState("Generic");

  let fetchedUser;

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else {
        if (username !== null && username !== undefined) {
          if (username.includes("!@$")) {
            handleShow();
          }
          getUser(username);
        }
        setLoadedSession(session);
      }
    });
  }, [router]);

  const getUser = async () => {
    fetchedUser = await fetch(`/api/user/get-user?user=${username}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);
  };

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/auth/change-password/", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const profileIsUser = loadedSession?.user?.username === username;

  return (
    <section>
      {/*<Button variant="primary" onClick={handleShow}>*/}
      {/*  Launch demo modal*/}
      {/*</Button>*/}

      {isLoading && <LoadingSpinner />}

      {profileIsUser && !isLoading ? (
        <div>
          <div></div>
          <div className={"text-center"}>
            <h1>Your User Profile</h1>
            {/*<AblyChatComponent />*/}
          </div>
        </div>
      ) : (
        <section>
          <h1>{`${username}'s`} Profile</h1>
        </section>
      )}

      <div className="btn-group w-100 mx-auto ">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setProfileSection("Generic")}
        >
          Left
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setProfileSection("History")}
        >
          Middle
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setProfileSection("Analytics")}
        >
          Right
        </button>
      </div>

      {!isLoading && profileSection == "Generic" && (
        <>
          {console.log("this is the loadedUser on user-profile", loadedUser)}
          {loadedUser && loadedUser?.favorites && (
            <div className={"text-center"}>
              {!profileIsUser && <h1>{`${username}'s`} favorites</h1>}
              <Favorites
                path={router.pathname}
                loadedUser={loadedUser}
                setLoadedUser={setLoadedUser}
              />
            </div>
          )}
        </>
      )}

      <SessionFavoritesTable />

      {profileIsUser && !isLoading && (
        <div>
          <div></div>
          <div className={"text-center"}>
            <h1>Your User Profile</h1>
            {/*<AblyChatComponent />*/}
            <UsernameChangeModal show={show} setShow={setShow} />
            <ProfileForm onChangePassword={changePasswordHandler} />
          </div>
        </div>
      )}
    </section>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//
//   if (!session || session.username !== username) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default UserProfile;
