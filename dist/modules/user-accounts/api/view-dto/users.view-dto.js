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
    get MeViewDto () {
        return MeViewDto;
    },
    get UserViewDto () {
        return UserViewDto;
    }
});
const _swagger = require("@nestjs/swagger");
let UserViewDto = class UserViewDto {
    static mapToView(user) {
        const dto = new UserViewDto();
        dto.id = user._id.toString();
        dto.login = user.login;
        dto.email = user.email;
        dto.createdAt = user.createdAt.toISOString();
        return dto;
    }
};
let MeViewDto = class MeViewDto extends (0, _swagger.OmitType)(UserViewDto, [
    'createdAt',
    'id'
]) {
    static mapToView(user) {
        const dto = new MeViewDto();
        dto.email = user.email;
        dto.login = user.login;
        dto.userId = user._id.toString();
        return dto;
    }
};

//# sourceMappingURL=users.view-dto.js.map