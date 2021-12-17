import AuthForm from "../components/auth/auth-form";
import {getProviders} from "next-auth/client";

function AuthPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AuthForm />
      </div>
    </div>
  );
}



export default AuthPage;
