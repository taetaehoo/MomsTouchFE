import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = app => {
    app.use('/api',
        createProxyMiddleware({
            target: 'http://172.30.81.237/8071',
            changeOrigin: true,
        }))
}