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
    get ExtendedLikesInfo () {
        return ExtendedLikesInfo;
    },
    get ExtendedLikesInfoSchema () {
        return ExtendedLikesInfoSchema;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _likeDetailsschema = require("./likeDetails.schema");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ExtendedLikesInfo = class ExtendedLikesInfo {
    constructor(){
        this.likesCount = 0;
        this.dislikesCount = 0;
        this.newestLikes = [];
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Number,
        required: true,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "likesCount", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Number,
        required: true,
        default: 0
    }),
    _ts_metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "dislikesCount", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: [
            _likeDetailsschema.LikeDetailsSchema
        ],
        required: true,
        default: []
    }),
    _ts_metadata("design:type", Array)
], ExtendedLikesInfo.prototype, "newestLikes", void 0);
ExtendedLikesInfo = _ts_decorate([
    (0, _mongoose.Schema)({
        _id: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], ExtendedLikesInfo);
const ExtendedLikesInfoSchema = _mongoose.SchemaFactory.createForClass(ExtendedLikesInfo);

//# sourceMappingURL=extendedLikes.schema.js.map