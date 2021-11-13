import {getProviders, signIn} from "next-auth/client";
import {Button, Col, Row} from "react-bootstrap";
import Image from "next/image";
import React, {useState, useEffect} from 'react';


import { FaGithub, FaFacebookSquare, FaGoogle, FaTwitter } from 'react-icons/fa'



export default function LoginPage({ providers }) {

    const [isLoading, setIsLoading] = useState(false)


    const determineColor = (provider) => {
        console.log('this is the provider', provider)
        switch (provider) {
            case 'Facebook':
                return "outline-primary"
            case 'Google':
                return 'outline-danger'
            case 'Github':
                return 'outline-dark'
            case 'Twitter':
                return 'outline-info'
            default:
                return 'outline-dark'
        }
    }

    const chooseLogo = (provider) => {
        switch(provider) {
            default:
                return FaGithub;
        }
    }


    return (
        <div style={{backgroundColor:"lightgray"}}>
            <div>
                <div style={{display: "flex", flexDirection: "column", width: "100%", height: "50%", justifyContent: "center", alignItems: "center"}}>
                    <div style={{display: "flex", flexDirection: "column", maxWidth: "60%", minWidth:"55%", minHeight: '400px', justifyContent: "center", alignItems: "center", backgroundColor:"white" }}>

                    {/*<div style={{margin: "5% 0 5% 0", display:"flex"}}>*/}
                    {/*  <h1>Sign In</h1>*/}

                    {/*</div>*/}

                        <Row>
                            <Col>
                                <h1>Sign In</h1>
                            </Col>
                        </Row>


                        {Object.values(providers).map((provider) => (
                            <Row key={provider.name} style={{marginTop: "2%", marginBottom: "2%", minWidth: "35%"}}>
                                {/*<button onClick={() => signIn(provider.id)}>*/}
                                {/*    Sign in with {provider.name}*/}
                                {/*</button>*/}
                                <Button variant={determineColor(provider.name)} onClick={() => {
                                    setIsLoading(true)
                                    signIn(provider.id)
                                    setIsLoading(false)
                                }}
                                    disabled={isLoading}
                                >
                                    Sign in with {provider.name}

                                    {provider.name === "GitHub" && (
                                        <FaGithub style={{marginLeft:"10px"}}/>
                                    )}

                                    {provider.name === "Facebook" && (
                                        <FaFacebookSquare style={{marginLeft:"10px"}}/>
                                    )}

                                    {provider.name === "Google" && (
                                        <FaGoogle style={{marginLeft:"10px"}}/>
                                    )}


                                    {provider.name === "Twitter" && (
                                        <FaTwitter style={{marginLeft:"10px"}}/>
                                    )}



                                </Button>
                            </Row>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}
