"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExtractUserFromRequestIfExists", {
    enumerable: true,
    get: function() {
        return ExtractUserFromRequestIfExists;
    }
});
const _common = require("@nestjs/common");
const ExtractUserFromRequestIfExists = (0, _common.createParamDecorator)((data, context)=>{
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        return null;
    }
    return user;
});

//# sourceMappingURL=extract-user-if-exists-from-request.decorator.js.map