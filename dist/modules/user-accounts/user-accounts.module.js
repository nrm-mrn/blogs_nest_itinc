"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserAccountsModule", {
    enumerable: true,
    get: function() {
        return UserAccountsModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _userentity = require("./domain/user.entity");
const _userscontroller = require("./api/users.controller");
const _usersservice = require("./application/users.service");
const _usersqueryrepository = require("./infrastructure/users.query-repository");
const _usersrepository = require("./infrastructure/users.repository");
const _basicauthguard = require("./guards/basic/basic-auth.guard");
const _passHashservice = require("./adapters/passHash.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UserAccountsModule = class UserAccountsModule {
};
UserAccountsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _mongoose.MongooseModule.forFeature([
                {
                    name: _userentity.User.name,
                    schema: _userentity.UserSchema
                }
            ])
        ],
        controllers: [
            _userscontroller.UsersController
        ],
        providers: [
            _usersservice.UsersService,
            _usersqueryrepository.UsersQueryRepository,
            _usersrepository.UsersRepository,
            _basicauthguard.BasicAuthGuard,
            _passHashservice.HashService
        ],
        exports: [
            _basicauthguard.BasicAuthGuard
        ]
    })
], UserAccountsModule);

//# sourceMappingURL=user-accounts.module.js.map