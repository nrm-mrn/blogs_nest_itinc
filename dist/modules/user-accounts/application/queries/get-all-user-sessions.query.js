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
    get GetUserSessionsQuery () {
        return GetUserSessionsQuery;
    },
    get GetUserSessionsQueryHandler () {
        return GetUserSessionsQueryHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _sessionviewdto = require("../../api/view-dto/session.view-dto");
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _mongoose = require("@nestjs/mongoose");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _authtokeninjectconstants = require("../../constants/auth-token.inject-constants");
const _sessionentity = require("../../domain/session.entity");
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
let GetUserSessionsQuery = class GetUserSessionsQuery {
    constructor(token){
        this.token = token;
    }
};
let GetUserSessionsQueryHandler = class GetUserSessionsQueryHandler {
    async execute(query) {
        const payload = this.jwtRefreshTokService.decode(query.token);
        const sessions = await this.SessionModel.find({
            userId: payload.userId
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
    constructor(jwtRefreshTokService, SessionModel){
        this.jwtRefreshTokService = jwtRefreshTokService;
        this.SessionModel = SessionModel;
    }
};
GetUserSessionsQueryHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(GetUserSessionsQuery),
    _ts_param(0, (0, _common.Inject)(_authtokeninjectconstants.REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)),
    _ts_param(1, (0, _mongoose.InjectModel)(_sessionentity.DeviceAuthSession.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService,
        typeof _sessionentity.SessionModelType === "undefined" ? Object : _sessionentity.SessionModelType
    ])
], GetUserSessionsQueryHandler);

//# sourceMappingURL=get-all-user-sessions.query.js.map