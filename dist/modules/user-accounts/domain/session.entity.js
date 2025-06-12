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
    get DeviceAuthSession () {
        return DeviceAuthSession;
    },
    get SessionSchema () {
        return SessionSchema;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _mongoose1 = /*#__PURE__*/ _interop_require_default(require("mongoose"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeviceAuthSession = class DeviceAuthSession {
    static createSession(dto) {
        const session = new this();
        session._id = dto.deviceId;
        session.userId = dto.userId;
        session.iat = new Date(dto.iat);
        session.ip = dto.ip;
        session.title = dto.title;
        session.expiration = dto.expiration;
        return session;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _mongoose1.default.Schema.Types.ObjectId,
        required: true
    }),
    _ts_metadata("design:type", typeof _mongoose1.default === "undefined" || typeof _mongoose1.default.Types === "undefined" || typeof _mongoose1.default.Types.ObjectId === "undefined" ? Object : _mongoose1.default.Types.ObjectId)
], DeviceAuthSession.prototype, "_id", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], DeviceAuthSession.prototype, "userId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Date,
        required: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DeviceAuthSession.prototype, "iat", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Date,
        required: true
    }),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DeviceAuthSession.prototype, "expiration", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], DeviceAuthSession.prototype, "ip", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], DeviceAuthSession.prototype, "title", void 0);
DeviceAuthSession = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], DeviceAuthSession);
const SessionSchema = _mongoose.SchemaFactory.createForClass(DeviceAuthSession);
SessionSchema.loadClass(DeviceAuthSession);

//# sourceMappingURL=session.entity.js.map