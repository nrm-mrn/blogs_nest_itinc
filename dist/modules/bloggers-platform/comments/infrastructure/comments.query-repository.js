"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentsQueryRepository", {
    enumerable: true,
    get: function() {
        return CommentsQueryRepository;
    }
});
const _common = require("@nestjs/common");
const _basepaginatedviewdto = require("../../../../core/dto/base.paginated.view-dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CommentsQueryRepository = class CommentsQueryRepository {
    async getCommentsForPosts(dto) {
        return _basepaginatedviewdto.PaginatedViewDto.mapToView({
            items: [],
            page: dto.pageNumber,
            size: dto.pageSize,
            totalCount: 0
        });
    }
};
CommentsQueryRepository = _ts_decorate([
    (0, _common.Injectable)()
], CommentsQueryRepository);

//# sourceMappingURL=comments.query-repository.js.map