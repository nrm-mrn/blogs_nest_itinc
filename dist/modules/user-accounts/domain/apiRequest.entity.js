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
    get ApiRequest () {
        return ApiRequest;
    },
    get ApiRequestSchema () {
        return ApiRequestSchema;
    }
});
const _mongoose = require("@nestjs/mongoose");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApiRequest = class ApiRequest {
    static createApiRequest(dto) {
        const req = new this();
        req.key = dto.key;
        req.timestamps = dto.timestamps;
        req.blockedUntil = 0;
        return req;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        unique: true
    }),
    _ts_metadata("design:type", String)
], ApiRequest.prototype, "key", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: [
            Number
        ],
        default: []
    }),
    _ts_metadata("design:type", Array)
], ApiRequest.prototype, "timestamps", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Number,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ApiRequest.prototype, "blockedUntil", void 0);
ApiRequest = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], ApiRequest);
const ApiRequestSchema = _mongoose.SchemaFactory.createForClass(ApiRequest);
ApiRequestSchema.loadClass(ApiRequest);

//# sourceMappingURL=apiRequest.entity.js.map