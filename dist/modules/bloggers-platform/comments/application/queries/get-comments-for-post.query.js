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
    get GetCommentsByPostQuery () {
        return GetCommentsByPostQuery;
    },
    get GetCommentsByPostQueryHandler () {
        return GetCommentsByPostQueryHandler;
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
let GetCommentsByPostQuery = class GetCommentsByPostQuery {
    constructor(query, postId, userId){
        this.query = query;
        this.postId = postId;
        this.userId = userId;
    }
};
let GetCommentsByPostQueryHandler = class GetCommentsByPostQueryHandler {
    async execute(query) {
        return this.commentsQueryRepository.getCommentsForPost(query);
    }
    constructor(commentsQueryRepository){
        this.commentsQueryRepository = commentsQueryRepository;
    }
};
GetCommentsByPostQueryHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(GetCommentsByPostQuery),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commentsqueryrepository.CommentsQueryRepository === "undefined" ? Object : _commentsqueryrepository.CommentsQueryRepository
    ])
], GetCommentsByPostQueryHandler);

//# sourceMappingURL=get-comments-for-post.query.js.map