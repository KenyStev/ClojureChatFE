System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var FilterArrayPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            // # Filter Array of Objects
            FilterArrayPipe = (function () {
                function FilterArrayPipe() {
                }
                FilterArrayPipe.prototype.transform = function (value, args) {
                    if (!args[0]) {
                        return value;
                    }
                    else if (value) {
                        return value.filter(function (item) {
                            for (var key in item) {
                                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                                    (item[key].indexOf(args[0]) !== -1)) {
                                    return true;
                                }
                            }
                        });
                    }
                };
                FilterArrayPipe = __decorate([
                    core_1.Pipe({ name: 'filter' }), 
                    __metadata('design:paramtypes', [])
                ], FilterArrayPipe);
                return FilterArrayPipe;
            }());
            exports_1("FilterArrayPipe", FilterArrayPipe);
        }
    }
});
//# sourceMappingURL=filter.component.js.map