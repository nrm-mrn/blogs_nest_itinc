"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExtractUserFromRequest", {
    enumerable: true,
    get: function() {
        return ExtractUserFromRequest;
    }
});
const _common = require("@nestjs/common");
const ExtractUserFromRequest = (0, _common.createParamDecorator)((data, context)=>{
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return null;
    }
    return user;
});

//# sourceMappingURL=extract-user-if-exists-from-request.decorator.js.map