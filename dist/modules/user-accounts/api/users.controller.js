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
const _getusersqueryparamsinputdto = require("./input-dto/get-users-query-params.input-dto");
const _basicauthguard = require("../guards/basic/basic-auth.guard");
const _objectidvalidationpipeservice = require("../../../core/pipes/object-id-validation-pipe.service");
const _createuserinputdto = require("./input-dto/create-user.input-dto");
const _cqrs = require("@nestjs/cqrs");
const _createuserusecase = require("../application/usecases/create-user.usecase");
const _getuserquery = require("../application/queries/get-user.query");
const _getallusersquery = require("../application/queries/get-all-users.query");
const _deleteuserusecase = require("../application/usecases/delete-user.usecase");
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
        return this.queryBus.execute(new _getallusersquery.GetAllUsersQuery(query));
    }
    async createUser(body) {
        const input = {
            login: body.login,
            email: body.email,
            password: body.password
        };
        const { userId } = await this.commandBus.execute(new _createuserusecase.CreateUserByAdminCommand(input.login, input.password, input.email));
        const user = await this.queryBus.execute(new _getuserquery.GetUserQuery(userId));
        return user;
    }
    async deleteUser(id) {
        return this.commandBus.execute(new _deleteuserusecase.DeleteUserCommand(id));
    }
    constructor(commandBus, queryBus){
        this.commandBus = commandBus;
        this.queryBus = queryBus;
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
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus,
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus
    ])
], UsersController);

//# sourceMappingURL=users.controller.js.map