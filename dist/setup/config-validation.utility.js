"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "configValidationUtility", {
    enumerable: true,
    get: function() {
        return configValidationUtility;
    }
});
const _classvalidator = require("class-validator");
const configValidationUtility = {
    validateConfig: (config)=>{
        const errors = (0, _classvalidator.validateSync)(config);
        if (errors.length > 0) {
            const sortedMessages = errors.map((error)=>Object.values(error.constraints || {}).join(', ')).join('; ');
            throw new Error('Validation failed: ' + sortedMessages);
        }
    },
    convertToBoolean (value) {
        const trimmedValue = value?.trim();
        if (trimmedValue === 'true') return true;
        if (trimmedValue === '1') return true;
        if (trimmedValue === 'enabled') return true;
        if (trimmedValue === 'false') return false;
        if (trimmedValue === '0') return false;
        if (trimmedValue === 'disabled') return false;
        return null;
    },
    getEnumValues (enumObj) {
        return Object.values(enumObj);
    }
};

//# sourceMappingURL=config-validation.utility.js.map