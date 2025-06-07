"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DomainExceptionCode", {
    enumerable: true,
    get: function() {
        return DomainExceptionCode;
    }
});
var DomainExceptionCode = /*#__PURE__*/ function(DomainExceptionCode) {
    //common
    DomainExceptionCode[DomainExceptionCode["NotFound"] = 1] = "NotFound";
    DomainExceptionCode[DomainExceptionCode["BadRequest"] = 2] = "BadRequest";
    DomainExceptionCode[DomainExceptionCode["InternalServerError"] = 3] = "InternalServerError";
    DomainExceptionCode[DomainExceptionCode["Forbidden"] = 4] = "Forbidden";
    DomainExceptionCode[DomainExceptionCode["ValidationError"] = 5] = "ValidationError";
    //auth
    DomainExceptionCode[DomainExceptionCode["Unauthorized"] = 11] = "Unauthorized";
    DomainExceptionCode[DomainExceptionCode["EmailNotConfirmed"] = 12] = "EmailNotConfirmed";
    DomainExceptionCode[DomainExceptionCode["ConfirmationCodeExpired"] = 13] = "ConfirmationCodeExpired";
    DomainExceptionCode[DomainExceptionCode["PasswordRecoveryCodeExpired"] = 14] = "PasswordRecoveryCodeExpired";
    return DomainExceptionCode;
}({});

//# sourceMappingURL=domain-exception-codes.js.map