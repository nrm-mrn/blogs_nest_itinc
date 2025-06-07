"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get APIErrorResult () {
        return APIErrorResult;
    },
    get FieldError () {
        return FieldError;
    }
});
let FieldError = class FieldError {
    constructor(message, field){
        this.message = message;
        this.field = field;
    }
};
let APIErrorResult = class APIErrorResult {
    constructor(errorsMessages){
        this.errorsMessages = errorsMessages;
    }
};

//# sourceMappingURL=api-error.result.js.map