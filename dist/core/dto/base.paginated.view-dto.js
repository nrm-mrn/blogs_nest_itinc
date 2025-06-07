"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PaginatedViewDto", {
    enumerable: true,
    get: function() {
        return PaginatedViewDto;
    }
});
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PaginatedViewDto = class PaginatedViewDto {
    static mapToView(data) {
        return {
            totalCount: data.totalCount,
            pagesCount: Math.ceil(data.totalCount / data.size),
            pageSize: data.size,
            page: data.page,
            items: data.items
        };
    }
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'array of entities'
    }),
    _ts_metadata("design:type", typeof T === "undefined" ? Object : T)
], PaginatedViewDto.prototype, "items", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'total number of found entites according to request filter'
    }),
    _ts_metadata("design:type", Number)
], PaginatedViewDto.prototype, "totalCount", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'calculated number of pages based on total cound and page size'
    }),
    _ts_metadata("design:type", Number)
], PaginatedViewDto.prototype, "pagesCount", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'page number'
    }),
    _ts_metadata("design:type", Number)
], PaginatedViewDto.prototype, "page", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'max number of entites on page'
    }),
    _ts_metadata("design:type", Number)
], PaginatedViewDto.prototype, "pageSize", void 0);

//# sourceMappingURL=base.paginated.view-dto.js.map