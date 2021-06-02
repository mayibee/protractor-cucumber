const { by } = require("protractor");

let customlocators = function() {
    by.addLocator('ngClick', function(toState,parentElement) {
        let using = parentElement || document;
        let prefixes = ['ng-click'];
        for (let p = 0; p<prefixes.length;++p) {
            let selector = '*['+prefixes[p]+'="'+toState+'"]';
            let inputs = using.querySelectorAll(selector);
            if(inputs.length) {
                return inputs;
            }
        }
    });
};
module.exports = new customlocators();