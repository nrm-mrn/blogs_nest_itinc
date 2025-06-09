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
    get CommentatorInfo () {
        return CommentatorInfo;
    },
    get CommentatorInfoSchema () {
        return CommentatorInfoSchema;
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
let CommentatorInfo = class CommentatorInfo {
    constructor(userId, userLogin){
        this.userId = userId;
        this.userLogin = userLogin;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], CommentatorInfo.prototype, "userId", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], CommentatorInfo.prototype, "userLogin", void 0);
CommentatorInfo = _ts_decorate([
    (0, _mongoose.Schema)({
        _id: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ])
], CommentatorInfo);
const CommentatorInfoSchema = _mongoose.SchemaFactory.createForClass(CommentatorInfo);

//# sourceMappingURL=commentator-info.schema.js.map