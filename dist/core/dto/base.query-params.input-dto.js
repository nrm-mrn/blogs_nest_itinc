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
    get BaseQueryParams () {
        return BaseQueryParams;
    },
    get SortDirection () {
        return SortDirection;
    }
});
const _swagger = require("@nestjs/swagger");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var SortDirection = /*#__PURE__*/ function(SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
    return SortDirection;
}({});
let BaseQueryParams = class BaseQueryParams {
    calculateSkip() {
        return (this.pageNumber - 1) * this.pageSize;
    }
    constructor(){
        this.pageNumber = 1;
        this.pageSize = 10;
        this.sortDirection = "desc";
    }
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'requested page',
        default: 1
    }),
    (0, _classtransformer.Type)(()=>Number),
    (0, _classvalidator.IsNumber)(),
    _ts_metadata("design:type", Number)
], BaseQueryParams.prototype, "pageNumber", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'number of elements on page',
        default: 10
    }),
    (0, _classtransformer.Type)(()=>Number),
    (0, _classvalidator.IsNumber)(),
    _ts_metadata("design:type", Number)
], BaseQueryParams.prototype, "pageSize", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'direction for sorting results',
        enum: SortDirection
    }),
    (0, _classvalidator.IsEnum)(SortDirection),
    _ts_metadata("design:type", String)
], BaseQueryParams.prototype, "sortDirection", void 0);

//# sourceMappingURL=base.query-params.input-dto.js.map