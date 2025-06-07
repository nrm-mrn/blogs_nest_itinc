"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Trim", {
    enumerable: true,
    get: function() {
        return Trim;
    }
});
const _classtransformer = require("class-transformer");
const Trim = ()=>(0, _classtransformer.Transform)(({ value })=>// eslint-disable-next-line @typescript-eslint/no-unsafe-return
        typeof value === 'string' ? value.trim() : value);

//# sourceMappingURL=trim.js.map