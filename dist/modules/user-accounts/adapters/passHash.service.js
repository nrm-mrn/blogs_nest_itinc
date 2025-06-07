"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HashService", {
    enumerable: true,
    get: function() {
        return HashService;
    }
});
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _common = require("@nestjs/common");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let HashService = class HashService {
    async createHash(password) {
        const saltRounds = 10;
        try {
            const salt = await _bcrypt.default.genSalt(saltRounds);
            const hash = await _bcrypt.default.hash(password, salt);
            return hash;
        } catch (err) {
            throw new Error('Error creating password hash');
        }
    }
    async compareHash(password, hash) {
        return _bcrypt.default.compare(password, hash);
    }
};
HashService = _ts_decorate([
    (0, _common.Injectable)()
], HashService);

//# sourceMappingURL=passHash.service.js.map