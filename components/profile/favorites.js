import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import fetch from "unfetch";
import { useRouter } from "next/router";
import { Accordion, Card } from "react-bootstrap";
import Draggable from "react-draggable";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
// import { FaPlus, FaMinus } from "react-icons/all";
// import { CgAdd } from "react-icons/cg";

function CustomToggle({ children, eventKey, isEditing, setIsEditing }) {
  const [expandedState, setExpandedState] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setExpandedState(!expandedState);
    console.log("expandedState", expandedState);
  });

  return (
    <div>
      {!expandedState ? (
        // <FaPlus onClick={decoratedOnClick}>{children}</FaPlus>
        <div>
          <span onClick={decoratedOnClick}>Plus</span>
        </div>
      ) : (
        // <FaMinus onClick={decoratedOnClick}>{children}</FaMinus>
        <div>
          <span onClick={decoratedOnClick}>Minus</span>
          {!isEditing ? (
            <img
              onClick={() => setIsEditing(true)}
              style={{ marginLeft: "90%" }}
              src={"/local-fa-icons/edit.svg"}
              height={30}
            />
          ) : (
            <img
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: "90%" }}
              src={"/local-fa-icons/minus-square.svg"}
              height={30}
            />
          )}
        </div>
      )}
    </div>
  );
}

function Favorites(props) {
  const { path, loadedUser, setLoadedUser } = props;
  const [isEditing, setIsEditing] = useState(false);
  console.log("this is the path in Favorites ------", path);

  let fetchedUser;

  const router = useRouter();

  let username = router?.query?.username;

  if (username !== null && username !== undefined) {
    username = Object.values(username)[0];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loadedSession, setLoadedSession] = useState();
  // const [loadedUser, setLoadedUser] = useState();
  const [favorites, setFavorites] = useState();
  const [isAuthorized, setIsAuthorized] = useState();

  useEffect(() => {
    console.log("this is the username in favorites", username);
    getSession().then((session) => {
      setIsLoading(false);
      if (!session) {
        router.replace("/");
      } else if (session !== undefined && session.user.username) {
        if (session?.user?.username === username) {
          setIsAuthorized(true);
        } else if (loadedUser?.username === username) {
          setIsAuthorized(true);
        }
        if (path.includes("user")) {
          console.log("favorites in user-profile");
          // getUser(username);
          // setLoadedSession(session);
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
    <div>
      {isAuthorized ? (
        <Draggable axis={"x"}>
          <div
            style={{
              width: "80%",
              border: "2px solid black",
              marginLeft: "10%",
            }}
          >
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <CustomToggle
                    eventKey="0"
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  ></CustomToggle>
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
                          <div
                            key={y.title}
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {y.title}
                            {y.symbol}
                            <img src={y.image} />
                            {isEditing && (
                              <div style={{ marginLeft: "70%" }}>
                                Edit active
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </Draggable>
      ) : (
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
      )}
    </div>
  );
}

export default Favorites;
