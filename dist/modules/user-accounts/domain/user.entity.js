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
    get User () {
        return User;
    },
    get UserSchema () {
        return UserSchema;
    },
    get loginConstraints () {
        return loginConstraints;
    },
    get passwordConstraints () {
        return passwordConstraints;
    }
});
const _mongoose = require("@nestjs/mongoose");
const _emailConfirmationschema = require("./emailConfirmation.schema");
const _passRecoveryschema = require("./passRecovery.schema");
const _crypto = require("crypto");
const _luxon = require("luxon");
const _domainexceptions = require("../../../core/exceptions/domain-exceptions");
const _domainexceptioncodes = require("../../../core/exceptions/domain-exception-codes");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const loginConstraints = {
    minLength: 3,
    maxLength: 10
};
const passwordConstraints = {
    minLength: 6,
    maxLength: 20
};
let User = class User {
    /**
   * Generates random UUID, used in pass recovery
   * and email confirmation
   */ genConfirmationCode() {
        return (0, _crypto.randomUUID)();
    }
    /**
   * generates pass recovery confirmation code and sets
   * related fields in passwordRecovery obj
   */ genPasswordRecovery(duration) {
        this.passwordRecovery = {
            confirmationCode: this.genConfirmationCode(),
            expirationDate: _luxon.DateTime.now().plus(duration).toJSDate()
        };
    }
    /**
   * generates email confirmation code and sets related
   * fields in email.Confirmation object
   */ genEmailConfirmation(duration) {
        this.emailConfirmation = {
            expirationDate: _luxon.DateTime.now().plus(duration).toJSDate(),
            confirmationCode: this.genConfirmationCode(),
            isConfirmed: false
        };
    }
    /**
   * checks pass recovery code expiration
   * and resets password hash
   */ confirmPassword(newPassHash) {
        if (!this.passwordRecovery) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'No password confirmation object in entity'
            });
        }
        if (_luxon.DateTime.fromJSDate(this.passwordRecovery.expirationDate) < _luxon.DateTime.now()) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.PasswordRecoveryCodeExpired,
                message: 'Pass recovery code has expired',
                extensions: [
                    new _domainexceptions.Extension('Pass recovery code has expired', 'recoveryCode')
                ]
            });
        }
        this.passwordHash = newPassHash;
        this.passwordRecovery = null;
    }
    /**
   * checks email is not confirmed and code is not expired
   * marks email as confirmed
   */ confirmEmail() {
        if (!this.emailConfirmation) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.InternalServerError,
                message: 'No email confirmation object in entity'
            });
        }
        if (this.emailConfirmation.isConfirmed) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.BadRequest,
                message: 'Email is already confirmed',
                extensions: [
                    new _domainexceptions.Extension('Email is already confirmed', 'code')
                ]
            });
        }
        if (_luxon.DateTime.fromJSDate(this.emailConfirmation.expirationDate) < _luxon.DateTime.now()) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.ConfirmationCodeExpired,
                message: 'Email confirmation code has expired',
                extensions: [
                    new _domainexceptions.Extension('Email code has expired', 'code')
                ]
            });
        }
        this.emailConfirmation.isConfirmed = true;
    }
    markDeleted() {
        if (this.deletedAt !== null) {
            throw new _domainexceptions.DomainException({
                code: _domainexceptioncodes.DomainExceptionCode.NotFound,
                message: 'Entity is already deleted'
            });
        }
        this.deletedAt = new Date();
    }
    static createUser(dto) {
        const user = new this();
        user.email = dto.email;
        user.login = dto.login;
        user.passwordHash = dto.passHash;
        return user;
    }
};
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true,
        ...loginConstraints
    }),
    _ts_metadata("design:type", String)
], User.prototype, "login", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: String,
        required: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _emailConfirmationschema.EmailConfirmationSchema,
        required: false,
        default: null
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "emailConfirmation", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: _passRecoveryschema.PasswordRecoverySchema,
        required: false,
        default: null
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "passwordRecovery", void 0);
_ts_decorate([
    (0, _mongoose.Prop)({
        type: Date,
        nullable: true,
        default: null
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "deletedAt", void 0);
User = _ts_decorate([
    (0, _mongoose.Schema)({
        timestamps: true
    })
], User);
const UserSchema = _mongoose.SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

//# sourceMappingURL=user.entity.js.map