sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"p2p/po/list/test/integration/pages/PurchaseOrderList",
	"p2p/po/list/test/integration/pages/PurchaseOrderObjectPage",
	"p2p/po/list/test/integration/pages/PurchaseOrderItemsObjectPage"
], function (JourneyRunner, PurchaseOrderList, PurchaseOrderObjectPage, PurchaseOrderItemsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('p2p/po/list') + '/test/flp.html#app-preview',
        pages: {
			onThePurchaseOrderList: PurchaseOrderList,
			onThePurchaseOrderObjectPage: PurchaseOrderObjectPage,
			onThePurchaseOrderItemsObjectPage: PurchaseOrderItemsObjectPage
        },
        async: true
    });

    return runner;
});

