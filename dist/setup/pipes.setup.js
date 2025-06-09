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
    get errorsFormatter () {
        return errorsFormatter;
    },
    get pipesSetup () {
        return pipesSetup;
    }
});
const errorsFormatter = (errors, errorMessage)=>{
    const errorsForResp = errorMessage || [];
    for (const error of errors){
        if (!error.constraints && error.children?.length) {
            errorsFormatter(error.children, errorsForResp);
        } else if (error.constraints) {
            const constraintsKeys = Object.keys(error.constraints);
            constraintsKeys.forEach((key)=>{
                errorsForResp.push({
                    message: error.constraints[key] ? `${error.constraints[key]}; Received value: ${error?.value}` : '',
                    key: error.property
                });
            });
        }
    }
    return errorsForResp;
};
function pipesSetup(app) {
    app.useGlobalPipes();
}

//# sourceMappingURL=pipes.setup.js.map