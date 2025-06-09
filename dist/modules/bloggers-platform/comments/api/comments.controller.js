"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentsController", {
    enumerable: true,
    get: function() {
        return CommentsController;
    }
});
const _common = require("@nestjs/common");
const _domainexceptioncodes = require("../../../../core/exceptions/domain-exception-codes");
const _domainexceptions = require("../../../../core/exceptions/domain-exceptions");
const _objectidvalidationpipeservice = require("../../../../core/pipes/object-id-validation-pipe.service");
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
let CommentsController = class CommentsController {
    async getComment(id) {
        throw new _domainexceptions.DomainException({
            code: _domainexceptioncodes.DomainExceptionCode.NotFound,
            message: 'No comments yet'
        });
    }
};
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], CommentsController.prototype, "getComment", null);
CommentsController = _ts_decorate([
    (0, _common.Controller)('comments')
], CommentsController);

//# sourceMappingURL=comments.controller.js.map