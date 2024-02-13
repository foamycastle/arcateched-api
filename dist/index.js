"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = void 0;
const express_1 = __importDefault(require("express"));
const apiRouter_1 = require("./routes/apiRouter");
exports.express = (0, express_1.default)();
const bodyParser = require('body-parser');
const bodyParserOptions = {
    type: 'application/json'
};
exports.express.use(bodyParser.json(bodyParserOptions));
exports.express.use('/api', apiRouter_1.apiRouter);
exports.express.listen(3000, () => {
    console.log("listening on 3000...");
});
//# sourceMappingURL=index.js.map