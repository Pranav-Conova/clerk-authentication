// src/AuthTest.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function AuthTest() {
  const { getToken } = useAuth();
  // const handleClick = async () => {
  //   const token = await getToken();
  //   try {
  //     const res = await axios.get("http://127.0.0.1:8000/api/dinkan/", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //   }
  // };
  useEffect(() => {
    async function callApi() {
      const token = await getToken();
      console.log(token)
      const res = await axios.get("http://127.0.0.1:8000/api/clerk-auth/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    }

    callApi();
  }, [getToken]);

  return (
    <>
      <div>
        Auth Tested. Check console.
        <button >click me</button>
      </div>
    </>
  );
}
