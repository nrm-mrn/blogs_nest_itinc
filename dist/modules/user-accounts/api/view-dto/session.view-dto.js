"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SessionViewDto", {
    enumerable: true,
    get: function() {
        return SessionViewDto;
    }
});
const _luxon = require("luxon");
let SessionViewDto = class SessionViewDto {
    static mapToView(session) {
        const dto = new SessionViewDto();
        dto.ip = session.ip;
        dto.title = session.title;
        dto.lastActiveDate = _luxon.DateTime.fromSeconds(session.iat).toISO();
        dto.deviceId = session._id.toString();
        return dto;
    }
};

//# sourceMappingURL=session.view-dto.js.map