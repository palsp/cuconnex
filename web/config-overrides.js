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
    },
  };

  return config;
};
