"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GoogleAuthButton() {
  const router = useRouter();

  const onSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/api/auth/register", {
        googleToken: credentialResponse.credential,
      });

      localStorage.setItem("accessToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/problems");
    } catch (err) {
      console.error(err);
      alert("Google authentication failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => alert("Google Login Failed")}
      theme="filled_black"
      size="large"
      shape="pill"
      text="continue_with"
      logo_alignment="right"
    />
  );
}
