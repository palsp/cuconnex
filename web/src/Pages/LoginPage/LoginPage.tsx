import React from "react";
import AppLogo from "../../components/dumbComponents/UI/AppLogo/AppLogo";
import Background from "../../components/dumbComponents/UI/Background/Background";
import HalfCircleOverlay from "../../components/dumbComponents/UI/HalfCircleOverlay/HalfCircleOverlay";

const LoginPage: React.FC = () => {
  return (
    <div>
      <Background data-test="app-background" />
      <AppLogo data-test="app-logo" />
      <HalfCircleOverlay />
    </div>
  );
};

export default LoginPage;
