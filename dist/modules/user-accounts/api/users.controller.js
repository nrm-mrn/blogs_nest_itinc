"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersController", {
    enumerable: true,
    get: function() {
        return UsersController;
    }
});
const _common = require("@nestjs/common");
const _usersservice = require("../application/users.service");
const _usersqueryrepository = require("../infrastructure/query/users.query-repository");
const _getusersqueryparamsinputdto = require("./input-dto/get-users-query-params.input-dto");
const _basicauthguard = require("../guards/basic/basic-auth.guard");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
const _objectidvalidationpipeservice = require("../../../core/pipes/object-id-validation-pipe.service");
const _createuserinputdto = require("./input-dto/create-user.input-dto");
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
let UsersController = class UsersController {
    async getAllUsers(query) {
        return this.usersQueryRepo.getAllUsers(query);
    }
    async createUser(body) {
        const input = {
            login: body.login,
            email: body.email,
            password: body.password
        };
        const { userId } = await this.usersService.createUser(input);
        const user = await this.usersQueryRepo.getUserById(userId);
        if (!user) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'User not found after creation'
            });
        }
        return user;
    }
    async deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
    constructor(usersService, usersQueryRepo){
        this.usersService = usersService;
        this.usersQueryRepo = usersQueryRepo;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getusersqueryparamsinputdto.GetUsersQueryParams === "undefined" ? Object : _getusersqueryparamsinputdto.GetUsersQueryParams
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _common.HttpCode)(_common.HttpStatus.CREATED),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createuserinputdto.CreateUserInputDto === "undefined" ? Object : _createuserinputdto.CreateUserInputDto
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_param(0, (0, _common.Param)('id', _objectidvalidationpipeservice.ObjectIdValidationPipe)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
UsersController = _ts_decorate([
    (0, _common.Controller)('users'),
    (0, _common.UseGuards)(_basicauthguard.BasicAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _usersservice.UsersService === "undefined" ? Object : _usersservice.UsersService,
        typeof _usersqueryrepository.UsersQueryRepository === "undefined" ? Object : _usersqueryrepository.UsersQueryRepository
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map