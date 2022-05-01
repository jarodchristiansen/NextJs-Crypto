import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import classes from "./main-header.module.css";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "../../store";
import CustomSearchComponent from "../searchComponents/CustomSearchComponent";

function MainHeader() {
  const [session, loading, status] = useSession();

  const { dispatch } = useStore();
  const router = useRouter();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    if (session?.user && !loading) {
      try {
        dispatch({
          type: "SET_USER",
          user: session?.user,
        });
      } catch (err) {
        console.log("Error dispatching user to redux", err);
      }
    } else if (loading) {
      console.log("loading statement in useEffect");
    } else {
      console.log("other conditional in useEffect");
    }

    console.log("this is the router in useEffect", router);
  }, [loading]);

  let username = session?.user?.username;

  return (
    // <Navbar bg="light" variant="light">
    //     <Container>
    //         <Nav>
    //         <Navbar.Brand>
    //             <div>
    //                 <Link href='/'><p style={{margin: "5%", cursor: "pointer", fontSize: "1.2rem"}}>TokenWatch</p></Link>
    //         </div>
    //         </Navbar.Brand>
    //
    //             <div style={{marginLeft: "20%"}}>
    //
    //             </div>
    //             <Link href="/asset-details"><Navbar.Text style={{margin: "5%", cursor: "pointer", fontSize: "1.2rem"}}>Assets</Navbar.Text></Link>
    //             <Link href="/asset-details"><Navbar.Text style={{margin: "5%", cursor: "pointer", fontSize: "1.2rem"}}>Favorites</Navbar.Text></Link>
    //             <div style={{whiteSpace: "nowrap", marginTop: '7%'}}>
    //                 {session && <Navbar.Text style={{margin: "5%", cursor: "pointer", fontSize: "1.2rem"}} onClick={handleSignout} className="btn-signin">Sign out</Navbar.Text>  }
    //                 {!session && <Navbar.Text style={{margin: "5%", cursor: "pointer", fontSize: "1.2rem"}} onClick={handleSignin}  className="btn-signin">Sign in</Navbar.Text>  }
    //             </div>
    //
    //         </Nav>
    //
    //         <div style={{display: "flex", flexDirection: "row"}}>
    //             {loading && <div>Loading...</div>}
    //             {session && <> <p> Welcome, {session.user.name ?? session.user.email}</p> <br />
    //                 <img src={session.user.image} style={{maxHeight: "50px"}} alt="" />
    //             </>}
    //         </div>
    //
    //     </Container>
    // </Navbar>

    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href={"/"}>HoDLWatch</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {session && (
              <Nav.Link eventKey={"1"} role={"link"}>
                <Link href="/assets">
                  <Navbar.Text>Assets</Navbar.Text>
                </Link>
              </Nav.Link>
            )}
            {/*<Nav.Link eventKey={"2"} href="#pricing">*/}
            {/*  Pricing*/}
            {/*</Nav.Link>*/}
            {/*<Nav.Link eventKey={"3"} onClick={session ? handleSignout : handleSignin}>{session ? "Sign out" : "Sign in"}</Nav.Link>*/}

            {session && (
              <Nav.Link eventKey={"3"} role={"link"}>
                <Link href={`/user/${username}`}>
                  <Navbar.Text>{"Profile"}</Navbar.Text>
                </Link>
              </Nav.Link>
            )}

            {!session ? (
              <Nav.Link eventKey={"3"} role={"link"}>
                <Link href="/auth">
                  <Navbar.Text>{"Sign in"}</Navbar.Text>
                </Link>
              </Nav.Link>
            ) : (
              <Nav.Link eventKey={"3"} role={"link"} onClick={handleSignout}>
                {"Sign out"}
              </Nav.Link>
            )}
            {/*{router?.route === "/assets" && (*/}
            {/*  <div className={"position-relative"}>*/}
            {/*    <CustomSearchComponent*/}
            {/*      className={"position-absolute bottom-0 end-0"}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}

            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
            {/*  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.2">*/}
            {/*    Another action*/}
            {/*  </NavDropdown.Item>*/}
            {/*  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
            {/*  <NavDropdown.Divider />*/}
            {/*  <NavDropdown.Item href="#action/3.4">*/}
            {/*    Separated link*/}
            {/*  </NavDropdown.Item>*/}
            {/*</NavDropdown>*/}
          </Nav>
          <Nav>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {loading && <div>Loading...</div>}
              {session && (
                <>
                  {/*<p style={{marginTop: "5%"}}>{session.user.name ?? session.user.email}</p> <br />*/}
                  <img
                    src={session.user.image}
                    style={{ maxHeight: "50px", float: "end" }}
                    alt=""
                  />
                </>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainHeader;
