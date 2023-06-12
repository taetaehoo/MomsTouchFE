import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = app => {
    app.use('/api',
        createProxyMiddleware({
            target: 'http://172.30.125.92:8071',
            changeOrigin: true,
        }))
}