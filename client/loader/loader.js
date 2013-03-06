(function () {

    Template.loader.moduleName = function () {
        return this._impact.moduleName;
    };

    Template.loader.errors = function () {
        if (this.errors === undefined)
            return [];
        if (this.errors instanceof Array)
            return this.errors;
        return [this.errors, ];
    };

    Template.loader.events({
        'click input[value=Retry]': function () {
            Impact.ModuleManager.resetModuleFactory(this._impact.moduleClass);
        },
    });

})();