"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiRequestsStorage", {
    enumerable: true,
    get: function() {
        return ApiRequestsStorage;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _apiRequestentity = require("../domain/apiRequest.entity");
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
let ApiRequestsStorage = class ApiRequestsStorage {
    async increment(key, ttl, limit, blockDuration, throttlerName) {
        const now = Date.now();
        const windowStart = now - ttl;
        const record = await this.ApiRequestModel.findOne({
            key
        }).exec();
        if (!record) {
            const newRec = this.ApiRequestModel.createApiRequest({
                key,
                timestamps: [
                    now
                ]
            });
            await newRec.save();
            return {
                totalHits: 1,
                timeToExpire: ttl,
                isBlocked: false,
                timeToBlockExpire: 0
            };
        }
        if (record.blockedUntil && now < record.blockedUntil) {
            const timeToBlockExpire = record.blockedUntil - now;
            return {
                totalHits: limit,
                timeToExpire: 0,
                timeToBlockExpire,
                isBlocked: true
            };
        }
        // Remove expired timestamps
        const recentHits = record.timestamps.filter((ts)=>ts > windowStart);
        recentHits.push(now);
        const totalHits = recentHits.length;
        const isBlocked = totalHits > limit;
        if (isBlocked) {
            record.blockedUntil = now + blockDuration;
            await record.save();
            return {
                totalHits,
                timeToExpire: 0,
                timeToBlockExpire: blockDuration,
                isBlocked: true
            };
        }
        record.timestamps = recentHits;
        record.blockedUntil = 0;
        await record.save();
        const timeToExpire = ttl - (now - recentHits[0]);
        return {
            totalHits,
            timeToExpire,
            isBlocked: false,
            timeToBlockExpire: 0
        };
    }
    constructor(ApiRequestModel){
        this.ApiRequestModel = ApiRequestModel;
    }
};
ApiRequestsStorage = _ts_decorate([
    _ts_param(0, (0, _mongoose.InjectModel)(_apiRequestentity.ApiRequest.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _apiRequestentity.ApiRequestModelType === "undefined" ? Object : _apiRequestentity.ApiRequestModelType
    ])
], ApiRequestsStorage);

//# sourceMappingURL=apiRequests.repository.js.map