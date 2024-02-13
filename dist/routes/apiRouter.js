"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const getRouter_1 = require("./api/getRouter");
const postRouter_1 = require("./api/postRouter");
const putRouter_1 = require("./api/putRouter");
const express = require('express');
exports.apiRouter = express.Router();
exports.apiRouter.use('/', (req, res, next) => {
    console.log(req.method, req.path, req.protocol);
    next();
});
exports.apiRouter.use('/get', getRouter_1.getRouter);
exports.apiRouter.use('/post', postRouter_1.postRouter);
exports.apiRouter.use('/put', putRouter_1.putRouter);
console.log('api router');
//# sourceMappingURL=apiRouter.js.map