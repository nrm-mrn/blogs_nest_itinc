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
    get GetCommentQuery () {
        return GetCommentQuery;
    },
    get GetCommentQueryHandler () {
        return GetCommentQueryHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _commentsqueryrepository = require("../../infrastructure/comments.query-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetCommentQuery = class GetCommentQuery {
    constructor(commentId, userId){
        this.commentId = commentId;
        this.userId = userId;
    }
};
let GetCommentQueryHandler = class GetCommentQueryHandler {
    execute(query) {
        return this.commentsQueryRepository.findCommentOrNotFoundFail(query);
    }
    constructor(commentsQueryRepository){
        this.commentsQueryRepository = commentsQueryRepository;
    }
};
GetCommentQueryHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(GetCommentQuery),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commentsqueryrepository.CommentsQueryRepository === "undefined" ? Object : _commentsqueryrepository.CommentsQueryRepository
    ])
], GetCommentQueryHandler);

//# sourceMappingURL=get-comment.query.js.map