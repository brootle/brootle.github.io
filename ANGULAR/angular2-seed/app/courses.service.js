System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CoursesService;
    return {
        setters:[],
        execute: function() {
            CoursesService = (function () {
                function CoursesService() {
                }
                CoursesService.prototype.getCourse = function () {
                    return ["Course1", "Course2", "Course3"];
                };
                return CoursesService;
            }());
            exports_1("CoursesService", CoursesService);
        }
    }
});
//# sourceMappingURL=courses.service.js.map