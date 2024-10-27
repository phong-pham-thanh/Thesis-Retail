const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "test",
    projectName: "bkrm",
    webpackConfigEnv,
    argv,
    // output: {
    //   publicPath: '/react/', // This ensures the public folder assets are served under /react/
    // },
    // devServer: {
    //   static: {
    //     directory: path.join(__dirname, 'public'), // Serve public folder
    //   },
    // },
  });
  

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    // module: {
    //   rules: [
    //     {
    //       test: /\.svg$/,
    //       use: ['@svgr/webpack'],
    //     },
    //   ],
    // },
  });
};
