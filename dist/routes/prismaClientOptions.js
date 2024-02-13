"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClientOptions = void 0;
exports.prismaClientOptions = {
    log: [
        {
            level: 'query',
            emit: 'event'
        },
        {
            level: 'error',
            emit: 'event'
        }
    ]
};
//# sourceMappingURL=prismaClientOptions.js.map