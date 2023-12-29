module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["nativewind/babel"],
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@type": "./src/type",
            "@api": "./src/api",
            "@redux": "./src/redux",
            "@i18n": "./src/i18n",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@config": "./src/config",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
