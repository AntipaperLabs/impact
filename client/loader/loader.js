(function () {

    Template.loader.moduleName = function () {
        return this._impact.moduleName;
    };

    Template.loader.events({
        'click input[value=Retry]': function () {
            Impact.ModuleManager.deleteModuleFactory(this._impact.moduleClass);
        },
    });

})();