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
    get DomainException () {
        return DomainException;
    },
    get Extension () {
        return Extension;
    }
});
let Extension = class Extension {
    constructor(message, key){
        this.message = message;
        this.key = key;
    }
};
let DomainException = class DomainException extends Error {
    constructor(errorInfo){
        super(errorInfo.message);
        this.message = errorInfo.message;
        this.code = errorInfo.code;
        this.extensions = errorInfo.extensions || [];
    }
};

//# sourceMappingURL=domain-exceptions.js.map