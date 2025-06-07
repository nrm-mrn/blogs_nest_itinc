"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsStringWithTrim", {
    enumerable: true,
    get: function() {
        return IsStringWithTrim;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _trim = require("../transform/trim");
const IsStringWithTrim = (minLength, maxLength)=>{
    return (0, _common.applyDecorators)((0, _classvalidator.IsString)(), (0, _classvalidator.Length)(minLength, maxLength), (0, _trim.Trim)());
};

//# sourceMappingURL=is-string-with-trim.js.map