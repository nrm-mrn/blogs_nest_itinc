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
        dto.commentatorInfo = {
            userId: comm.commentatorInfo.userId,
            userLogin: comm.commentatorInfo.userLogin
        };
        dto.createdAt = comm.createdAt.toISOString();
        dto.likesInfo = {
            myStatus: _commentlikeentity.CommentLikeStatus.NONE,
            likesCount: comm.likesCount,
            dislikesCount: comm.dislikesCount
        };
        return dto;
    }
    setLike(likes) {
        if (likes instanceof Map) {
            const likeStatus = likes.get(this.id);
            if (likeStatus) {
                this.likesInfo.myStatus = likeStatus;
            }
            return;
        }
        this.likesInfo.myStatus = likes.status;
    }
};

//# sourceMappingURL=comment-view.dto.js.map