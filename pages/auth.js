import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <AuthForm />;
      </div>
    </div>
  );
}

export default AuthPage;
