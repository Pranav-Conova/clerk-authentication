import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";
import AuthTest from "./AuthTest";
import PaymentButton from "./components/PaymentButton";

function App() {
  return (
    <>
      <SignedIn>
        <div>Welcome! You are signed in.</div>
        <AuthTest/>
        <PaymentButton amount={5000} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
