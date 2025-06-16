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
    get ExtendedLikesInfoViewModel () {
        return ExtendedLikesInfoViewModel;
    },
    get LikeDetailsViewModel () {
        return LikeDetailsViewModel;
    },
    get PostLikeStatus () {
        return PostLikeStatus;
    },
    get PostViewDto () {
        return PostViewDto;
    }
});
var PostLikeStatus = /*#__PURE__*/ function(PostLikeStatus) {
    PostLikeStatus["LIKE"] = "Like";
    PostLikeStatus["DISLIKE"] = "Dislike";
    PostLikeStatus["NONE"] = "None";
    return PostLikeStatus;
}({});
let LikeDetailsViewModel = class LikeDetailsViewModel {
};
let ExtendedLikesInfoViewModel = class ExtendedLikesInfoViewModel {
};
let PostViewDto = class PostViewDto {
    static mapToView(post) {
        const dto = new PostViewDto();
        dto.id = post._id.toString();
        dto.title = post.title;
        dto.shortDescription = post.shortDescription;
        dto.content = post.content;
        dto.blogId = post.blogId;
        dto.blogName = post.blogName;
        dto.createdAt = post.createdAt.toISOString();
        dto.extendedLikesInfo = {
            likesCount: post.extendedLikesInfo.likesCount,
            dislikesCount: post.extendedLikesInfo.dislikesCount,
            newestLikes: post.extendedLikesInfo.newestLikes,
            myStatus: "None"
        };
        return dto;
    }
    setLike(likes) {
        if (likes instanceof Map) {
            const likeStatus = likes.get(this.id);
            if (likeStatus) {
                this.extendedLikesInfo.myStatus = likeStatus;
            }
            return;
        }
        this.extendedLikesInfo.myStatus = likes.status;
    }
};

//# sourceMappingURL=posts.view-dto.js.map