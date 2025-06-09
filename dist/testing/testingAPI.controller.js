"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TestingAPIController", {
    enumerable: true,
    get: function() {
        return TestingAPIController;
    }
});
const _common = require("@nestjs/common");
const _testingAPIservice = require("./testingAPI.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TestingAPIController = class TestingAPIController {
    async clearAllData() {
        return this.testinApiService.clearDb();
    }
    constructor(testinApiService){
        this.testinApiService = testinApiService;
    }
};
_ts_decorate([
    (0, _common.Delete)('all-data'),
    (0, _common.HttpCode)(_common.HttpStatus.NO_CONTENT),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], TestingAPIController.prototype, "clearAllData", null);
TestingAPIController = _ts_decorate([
    (0, _common.Controller)('testing'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _testingAPIservice.testingAPIService === "undefined" ? Object : _testingAPIservice.testingAPIService
    ])
], TestingAPIController);

//# sourceMappingURL=testingAPI.controller.js.map