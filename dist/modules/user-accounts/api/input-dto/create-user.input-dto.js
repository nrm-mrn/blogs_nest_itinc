"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateUserInputDto", {
    enumerable: true,
    get: function() {
        return CreateUserInputDto;
    }
});
const _userentity = require("../../domain/user.entity");
const _isstringwithtrim = require("../../../../core/decorators/validators/is-string-with-trim");
const _trim = require("../../../../core/decorators/transform/trim");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateUserInputDto = class CreateUserInputDto {
};
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_userentity.loginConstraints.minLength, _userentity.loginConstraints.maxLength),
    _ts_metadata("design:type", String)
], CreateUserInputDto.prototype, "login", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_userentity.passwordConstraints.minLength, _userentity.passwordConstraints.maxLength),
    _ts_metadata("design:type", String)
], CreateUserInputDto.prototype, "password", void 0);
_ts_decorate([
    (0, _trim.Trim)(),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsEmail)(),
    _ts_metadata("design:type", String)
], CreateUserInputDto.prototype, "email", void 0);

//# sourceMappingURL=create-user.input-dto.js.map