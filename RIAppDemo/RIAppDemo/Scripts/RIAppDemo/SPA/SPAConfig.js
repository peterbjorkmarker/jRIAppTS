require.config({
    baseUrl: '/Scripts/RIAppDemo/SPA',
    waitSeconds: 60,
    paths: {
    },
    shim: {
    }
});

require(['spaDemoApp'
], function (SPADEMO) {
    SPADEMO.mainOptions = RIAPP.global.utils.extend(false, SPADEMO.mainOptions, window.mainOptions);

    //create and start application here
    RIAPP.global.addOnLoad(function (sender, a) {
        var global = sender, mainOptions = SPADEMO.mainOptions;

        //initialize images folder path
        global.defaults.imagesPath = mainOptions.images_path;
        //create and then start application
        var thisApp = new SPADEMO.DemoApplication(mainOptions);

        thisApp.registerTemplateGroup('custGroup',
            {
                url: mainOptions.spa_template1_url,
                names: ["SPAcustTemplate", "goToInfoColTemplate", "SPAcustDetailTemplate", "customerEditTemplate", "customerDetailsTemplate", "orderEditTemplate",
                    "orderDetEditTemplate", "orderDetailsTemplate", "productTemplate1", "productTemplate2",
                    "prodAutocompleteTemplate"]
            });

        thisApp.registerTemplateGroup('custInfoGroup',
            {
                url: mainOptions.spa_template2_url,
                names: ["customerInfo", "salespersonTemplate1", "salespersonTemplate2", "salePerAutocompleteTemplate"]
            });

        thisApp.registerTemplateGroup('custAdrGroup',
            {
                url: mainOptions.spa_template3_url,
                names: ["customerAddr", "addressTemplate", "addAddressTemplate", "linkAdrTemplate", "newAdrTemplate"]
            });

        thisApp.startUp(function (app) { });
    });
});