import { SignedIn, SignedOut, SignIn, SignUp, RedirectToSignIn } from "@clerk/clerk-react";
import AuthTest from "./AuthTest";
function App() {
  return (
    <>
      <SignedIn>
        <div>Welcome! You are signed in.</div>
        <AuthTest/>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;
