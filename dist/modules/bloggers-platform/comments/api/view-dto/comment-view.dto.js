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
    get CommentViewDto () {
        return CommentViewDto;
    },
    get CommentatorInfoViewModel () {
        return CommentatorInfoViewModel;
    },
    get LikesInfoViewModel () {
        return LikesInfoViewModel;
    }
});
const _commentlikeentity = require("../../domain/comment-like.entity");
let LikesInfoViewModel = class LikesInfoViewModel {
};
let CommentatorInfoViewModel = class CommentatorInfoViewModel {
};
let CommentViewDto = class CommentViewDto {
    static mapToView(comm) {
        const dto = new CommentViewDto();
        dto.id = comm._id.toString();
        dto.content = comm.content;
        dto.commentatorInfo.userId = comm.commentatorInfo.userId;
        dto.commentatorInfo.userLogin = comm.commentatorInfo.userLogin;
        dto.createdAt = comm.createdAt.toISOString();
        dto.likesInfo.myStatus = _commentlikeentity.CommentLikeStatus.NONE;
        dto.likesInfo.likesCount = comm.likesCount;
        dto.likesInfo.dislikesCount = comm.dislikesCount;
        return dto;
    }
};

//# sourceMappingURL=comment-view.dto.js.map