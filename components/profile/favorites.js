import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import fetch from "unfetch";
import { useRouter } from "next/router";

function Favorites() {
  let fetchedUser;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (session !== undefined && session.user.username) {
        // code below is to prevent a user accessing other user's sensitive data/processes
        // router.replace("/");
        console.log("else if statement", session);
        getUser(session.user.username);
        setLoadedSession(session);
        // console.log(
        //   "session.username && username mismatch",
        //   session.user.username,
        //   username
        // );
      }
    });
  }, [router]);

  const getUser = async (session) => {
    fetchedUser = await fetch(`/api/user/get-user?user=${session}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);
    console.log("this is fetchedUser", fetchedUser);
  };

  return (
    <div>
      {loadedUser && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "50%",
            border: "2px solid black",
            marginLeft: "25%",
          }}
        >
          Favorites Panel
          {loadedSession?.user?.favorites.map((y) => {
            return (
              <div key={y.title}>
                {y.title}
                {y.symbol}
                <img src={y.image} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
