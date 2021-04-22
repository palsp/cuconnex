/* eslint-disable */
const path = require("path");

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@smartComponents": path.resolve(
        __dirname,
        "src",
        "components",
        "smartComponents"
      ),
      "@dumbComponents": path.resolve(
        __dirname,
        "src",
        "components",
        "dumbComponents"
      ),
      "@pages": path.resolve(__dirname, "src", "Pages"),
      "@icons": path.resolve(
        __dirname,
        "src",
        "components",
        "dumbComponents",
        "UI",
        "Icons"
      ),
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@src": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src", "api"),
      "@models": path.resolve(__dirname, "src", "models"),
      "@hooks": path.resolve(__dirname, "src", "hooks"),
      "@context": path.resolve(__dirname, "src", "context"),
    },
  };

  return config;
};
