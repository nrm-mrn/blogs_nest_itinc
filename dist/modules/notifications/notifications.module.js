"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationsModule", {
    enumerable: true,
    get: function() {
        return NotificationsModule;
    }
});
const _common = require("@nestjs/common");
const _mailer = require("@nestjs-modules/mailer");
const _emailservice = require("./email.service");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _mailer.MailerModule.forRootAsync({
                imports: [
                    _config.ConfigModule
                ],
                useFactory: (configService)=>{
                    return {
                        transport: `smtps://${configService.get('mailerLogin')}:${configService.get('mailerPass')}@${configService.get('mailerHost')}`,
                        defaults: {
                            from: `"bloggers platform" <${configService.get('mailerLogin')}>`
                        }
                    };
                },
                inject: [
                    _config.ConfigService
                ]
            })
        ],
        providers: [
            _emailservice.EmailService
        ],
        exports: [
            _emailservice.EmailService
        ]
    })
], NotificationsModule);

//# sourceMappingURL=notifications.module.js.map