import React from "react";
import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import Button from "../../components/dumbComponents/UI/Button/Button";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";

const LoginPage: React.FC = () => {
  return (
    <div>
      <HalfCircleOverlay />
      <Background data-test="app-background" />
      <AppLogo data-test="app-logo" />
      <Button children="Login with Chula SSO" />
    </div>
  );
};

export default LoginPage;
