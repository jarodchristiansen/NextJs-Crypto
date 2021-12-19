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
  const [favorites, setFavorites] = useState();


  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (session !== undefined && session.user.username) {
        getUser(session.user.username);
        setLoadedSession(session);
      }
    });
  }, []);

  const getUser = async (session) => {
    fetchedUser = await fetch(`/api/user/get-user?user=${session}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);

    if (fetchedUser) {
        setFavorites(fetchedUser?.favorites)
    }
    console.log("this is fetchedUser", loadedUser);
  };

  return (
    <div>
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
          {loadedSession?.user?.favorites?.length > 1 && loadedSession?.user?.favorites.map((y) => {
            return (
              <div key={y.title}>
                {y.title}
                {y.symbol}
                <img src={y.image} />
              </div>
            );
          })}

            {loadedUser?.favorites?.length >= 1 && loadedUser?.favorites?.map((y) => {
                return (
                    <div key={y.title}>
                        {y.title}
                        {y.symbol}
                        <img src={y.image} />
                    </div>
                );
            })}

        </div>
    </div>
  );
}

export default Favorites;
