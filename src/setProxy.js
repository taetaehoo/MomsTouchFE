import {createProxyMiddleware} from "http-proxy-middleware";

module.exports = app => {
    app.use('/api',
        createProxyMiddleware({
            target: 'http://202.31.202.9:80',
            changeOrigin: true,
        }))
}