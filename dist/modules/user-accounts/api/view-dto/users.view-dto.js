"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserViewDto", {
    enumerable: true,
    get: function() {
        return UserViewDto;
    }
});
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

//# sourceMappingURL=users.view-dto.js.map