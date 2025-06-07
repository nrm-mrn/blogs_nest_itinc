"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsValidObjectId", {
    enumerable: true,
    get: function() {
        return IsValidObjectId;
    }
});
const _classvalidator = require("class-validator");
const _mongoose = require("mongoose");
function IsValidObjectId(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            name: 'IsValidObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate (value, args) {
                    return typeof value === 'string' && (0, _mongoose.isValidObjectId)(value);
                },
                defaultMessage (args) {
                    return `${args.property} must be a valid MongoDB ObjectId`;
                }
            }
        });
    };
}

//# sourceMappingURL=is-valid-object-id.js.map