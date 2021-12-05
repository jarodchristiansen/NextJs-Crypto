import { userState, useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import fetch from "unfetch";
// import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  const router = useRouter();

  let username = router?.query?.username;

  if (username !== null && username !== undefined) {
    username = Object.values(username)[0];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();

  let fetchedUser;

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (
        session !== undefined &&
        username !== undefined &&
        session.user.username !== username
      ) {
        // code below is to prevent a user accessing other user's sensitive data/processes
        // router.replace("/");
        // console.log(
        //   "session.username && username mismatch",
        //   session.user.username,
        //   username
        // );
      } else {
        if (username !== null && username !== undefined) {
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
    console.log("this is fetchedUser", fetchedUser);
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

  return (
    <section>
      {loadedUser && loadedUser?.favorites && (
        <div>
          <h1>User Favorites</h1>
          <ul>
            {loadedUser?.favorites.map((item) => {
              return (
                <li key={item.title}>
                  <div>
                    {item.title}
                    {item.symbol}
                    <img src={`${item.image}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {loadedSession?.user?.username === username ? (
        <div>
          {console.log("loadedSession", loadedSession)}

          <h1>Your User Profile</h1>
          <ProfileForm onChangePassword={changePasswordHandler} />
        </div>
      ) : (
        <div>Incorrect user data</div>
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
