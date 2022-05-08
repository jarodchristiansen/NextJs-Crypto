import AuthForm from "../components/auth/auth-form";
import { getProviders, getSession } from "next-auth/client";
import LoadingSpinner from "../components/ui/loading-spinner";
import AuthFormFull from "../components/auth/auth-form-full";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProviders, setLoadedProviders] = useState([]);

  async function loadProviders() {
    let providers = await getProviders();
    delete providers.credentials;
    setLoadedProviders(providers);
  }

  useEffect(() => {
    getSession().then((session) => {
      setIsLoading(false);
      if (session) {
        router.replace("/");
      } else {
        loadProviders();
      }
    });
  }, [router]);

  return (
    <div className={"container"}>
      {/*<iframe*/}
      {/*  src="https://embed.lottiefiles.com/animation/88985"*/}
      {/*  style={{*/}
      {/*    position: "absolute",*/}
      {/*    zIndex: -1,*/}
      {/*    opacity: 0.5,*/}
      {/*    height: "90%",*/}
      {/*  }}*/}
      {/*></iframe>*/}
      {/*<LoadingSpinner />*/}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={"flex col text-center mt-4"}>
          {/*<AuthFormFull*/}
          {/*  setIsLoading={(e) => setIsLoading(e)}*/}
          {/*  loadedProviders={loadedProviders}*/}
          {/*/>*/}
          <AuthForm />
        </div>
      )}
    </div>
  );
}

export default AuthPage;
