"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SessionsQueryRepository", {
    enumerable: true,
    get: function() {
        return SessionsQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _sessionentity = require("../../domain/session.entity");
const _sessionviewdto = require("../../api/view-dto/session.view-dto");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
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
let SessionsQueryRepository = class SessionsQueryRepository {
    async getSessionsOrFail(userId) {
        const sessions = await this.SessionModel.find({
            userId
        }).exec();
        if (!sessions.length) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'Not found any sessions for a valid refresh token'
            });
        }
        const res = [];
        sessions.forEach((session)=>{
            res.push(_sessionviewdto.SessionViewDto.mapToView(session));
        });
        return res;
    }
    constructor(SessionModel){
        this.SessionModel = SessionModel;
    }
};
SessionsQueryRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_sessionentity.DeviceAuthSession.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sessionentity.SessionModelType === "undefined" ? Object : _sessionentity.SessionModelType
    ])
], SessionsQueryRepository);

//# sourceMappingURL=devices-security.query-repository.js.map