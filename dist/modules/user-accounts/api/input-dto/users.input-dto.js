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
    get ConfirmPasswordInputDto () {
        return ConfirmPasswordInputDto;
    },
    get CreateUserInputDto () {
        return CreateUserInputDto;
    }
});
const _crypto = require("crypto");
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
let ConfirmPasswordInputDto = class ConfirmPasswordInputDto {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", typeof _crypto.UUID === "undefined" ? Object : _crypto.UUID)
], ConfirmPasswordInputDto.prototype, "code", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_userentity.passwordConstraints.minLength, _userentity.passwordConstraints.maxLength),
    _ts_metadata("design:type", String)
], ConfirmPasswordInputDto.prototype, "password", void 0);

//# sourceMappingURL=users.input-dto.js.map