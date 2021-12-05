import { userState, useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
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
        setLoadedSession(session);
      }
    });
  }, [router]);

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
      {loadedSession?.user?.username === username ? (
        <div>
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
