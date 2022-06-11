import createProxyMiddlewares from "http-proxy-middleware";

module.exports = (app) => {
  app.use(
    createProxyMiddlewares("/covid", {
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
