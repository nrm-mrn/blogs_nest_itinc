"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectIdValidationPipe", {
    enumerable: true,
    get: function() {
        return ObjectIdValidationPipe;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("mongoose");
const _domainexceptions = require("../exceptions/domain-exceptions");
const _domainexceptioncodes = require("../exceptions/domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ObjectIdValidationPipe = class ObjectIdValidationPipe {
    transform(value, metadata) {
        if (!(0, _mongoose.isValidObjectId)(value)) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: `invalid objectId: ${value}`
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return value;
    }
};
ObjectIdValidationPipe = _ts_decorate([
    (0, _common.Injectable)()
], ObjectIdValidationPipe);

//# sourceMappingURL=object-id-validation-pipe.service.js.map