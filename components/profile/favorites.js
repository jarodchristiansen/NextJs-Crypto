import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import fetch from "unfetch";
import { useRouter } from "next/router";
import { Accordion, Card } from "react-bootstrap";
import Draggable from "react-draggable";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Favorites(props) {
  const { path, loadedUser, setLoadedUser } = props;

  console.log("this is the path in Favorites ------", path);

  let fetchedUser;

  const router = useRouter();
  let username = router?.query?.username;

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  // const [loadedUser, setLoadedUser] = useState();
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (session !== undefined && session.user.username) {
        if (path.includes("user")) {
          console.log("favorites in user-profile");
          getUser(username);
          setLoadedSession(session);
        } else if (path.includes("assets")) {
          console.log("favorites on assets page");
          setLoadedUser(session.user.username);
          getUser(session.user.username);
          setLoadedSession(session);
        }
      }
    });
  }, []);

  const getUser = async (session) => {
    fetchedUser = await fetch(`/api/user/get-user?user=${session}`).then((r) =>
      r.json()
    );
    setLoadedUser(fetchedUser);

    if (fetchedUser) {
      setFavorites(fetchedUser?.favorites);
    }
    console.log(
      "this is favorites in Favorites Component after get user -----",
      favorites
    );
  };

  return (
    <Draggable>
      <div
        style={{ width: "80%", border: "2px solid black", marginLeft: "10%" }}
      >
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <div>
                {loadedSession?.user?.favorites?.length > 1 &&
                  loadedSession?.user?.favorites.map((y) => {
                    return (
                      <div key={y.title}>
                        {y.title}
                        {y.symbol}
                        <img src={y.image} />
                      </div>
                    );
                  })}

                {loadedUser?.favorites?.length >= 1 &&
                  loadedUser?.favorites?.map((y) => {
                    return (
                      <div key={y.title}>
                        {y.title}
                        {y.symbol}
                        <img src={y.image} />
                      </div>
                    );
                  })}
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </Draggable>
  );
}

export default Favorites;
