"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "proxySetup", {
    enumerable: true,
    get: function() {
        return proxySetup;
    }
});
function proxySetup(app) {
    app.set('trust proxy', true);
    app.use(async (req, res, next)=>{
        await new Promise((res)=>setTimeout(res, 1000));
        next();
    });
}

//# sourceMappingURL=proxie.setup.js.map