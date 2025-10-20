using {anubhav.db} from '../db/datamodel';
using {anubhav.cds} from '../db/CDSViews';


service CatalogService @(path: 'CatalogService') {

    entity BusinessPartnerSet                         as projection on db.master.businesspartner;
    entity AddressSet                                 as projection on db.master.address;
    // @Capabilities : { Readable }
    entity EmployeeSet                                as projection on db.master.employees;

    // {
    //     nameFirst,
    //     nameLast,
    //     sex,
    //     phoneNumber,
    //     email
    // };
    entity PurchaseOrder @(odata.draft.enabled: true) as
        projection on db.transaction.purchaseorder {
            *,
            case
                OVERALL_STATUS
                when 'N'
                     then 'New'
                when 'B'
                     then 'Blocked'
                when 'P'
                     then 'Paid'
                when 'D'
                     then 'Delivered'
                else ''
            end as OVERALL_STATUS : String(20),

            case
                OVERALL_STATUS
                when 'N'
                     then 0
                when 'B'
                     then 2
                when 'P'
                     then 1
                when 'D'
                     then 3
                else 4
            end as Criticality    : Integer,
        }

        actions {
            @cds.odata.bindingparameter.name: '_anubhav'
            @Common.SideEffects             : {
                TargetProperties: ['_anubhav/GROSS_AMOUNT']
                }
            action   boost()        returns PurchaseOrder;

// OverallStatus Set

            @cds.odata.bindingparameter.name: '_raj'
               @Common.SideEffects             : {
                TargetProperties: ['_raj/OVERALL_STATUS']
                }
            action setOrderProcessing();

            function largestOrder() returns array of PurchaseOrder;
        };

    function getOrderDefaults() returns PurchaseOrder;

    entity PurchaseOrderItems                         as projection on db.transaction.poitems;
    entity ProductSet                                 as projection on db.master.product;
// entity PurchaseOrderSet as projection on cds.CDSViews.POWorklist;
// entity ItemView as projection on cds.CDSViews.ItemView;
// entity ProductView as projection on cds.CDSViews.ProductView;
// entity ProductSales as projection on cds.CDSViews.CProductValuesView;
}
