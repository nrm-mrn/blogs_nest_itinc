"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfirmPasswordInputDto", {
    enumerable: true,
    get: function() {
        return ConfirmPasswordInputDto;
    }
});
const _classvalidator = require("class-validator");
const _crypto = require("crypto");
const _isstringwithtrim = require("../../../../core/decorators/validators/is-string-with-trim");
const _userentity = require("../../domain/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConfirmPasswordInputDto = class ConfirmPasswordInputDto {
};
_ts_decorate([
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", typeof _crypto.UUID === "undefined" ? Object : _crypto.UUID)
], ConfirmPasswordInputDto.prototype, "recoveryCode", void 0);
_ts_decorate([
    (0, _isstringwithtrim.IsStringWithTrim)(_userentity.passwordConstraints.minLength, _userentity.passwordConstraints.maxLength),
    _ts_metadata("design:type", String)
], ConfirmPasswordInputDto.prototype, "newPassword", void 0);

//# sourceMappingURL=pass-confirm.input-dto.js.map