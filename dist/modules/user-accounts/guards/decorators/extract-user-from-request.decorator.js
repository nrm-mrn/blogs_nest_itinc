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
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const ExtractUserFromRequest = (0, _common.createParamDecorator)((data, context)=>{
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'there is no user in the request object!'
        });
    }
    return user;
});

//# sourceMappingURL=extract-user-from-request.decorator.js.map