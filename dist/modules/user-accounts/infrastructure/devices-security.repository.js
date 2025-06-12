"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevicesSecurityRepository", {
    enumerable: true,
    get: function() {
        return DevicesSecurityRepository;
    }
});
const _common = require("@nestjs/common");
const _sessionentity = require("../domain/session.entity");
const _mongoose = require("@nestjs/mongoose");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let DevicesSecurityRepository = class DevicesSecurityRepository {
    async save(session) {
        const res = await session.save();
        return res._id.toString();
    }
    async deleteOtherSessions(iat, userId) {
        const result = await this.SessionModel.deleteMany({
            userId,
            iat: {
                $ne: iat
            }
        }).exec();
        if (result.acknowledged) {
            return;
        }
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'Failed to delete sessions, operation not acknowledged by db'
        });
    }
    async deleteSession(session) {
        const result = await session.deleteOne();
        if (result.acknowledged) {
            return;
        }
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
            message: 'Failed to delete the session, operation not acknowledged by db'
        });
    }
    async findSessionOrFail(deviceId, iat) {
        const session = await this.SessionModel.findOne({
            _id: deviceId,
            iat
        }).orFail(new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.Unauthorized,
            message: 'Session does not exist or already expired'
        }));
        return session;
    }
    //WARN: Unsafe without checking iat of the token presenter
    async findSessionByDeviceId(deviceId) {
        return this.SessionModel.findById(deviceId);
    }
    constructor(SessionModel){
        this.SessionModel = SessionModel;
    }
};
DevicesSecurityRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_sessionentity.DeviceAuthSession.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sessionentity.SessionModelType === "undefined" ? Object : _sessionentity.SessionModelType
    ])
], DevicesSecurityRepository);

//# sourceMappingURL=devices-security.repository.js.map