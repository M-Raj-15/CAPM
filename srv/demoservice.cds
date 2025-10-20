using { anubhav.db.master } from '../db/datamodel';
service demoservice {

    function spiderman (to:String) returns String;

// Read Only Action
    @readonly
    entity ReadEmpSrv as projection on master.employees;

// To Create / Insert Action
    @insertonly
    entity InserEmployeeSrv as projection on master.employees;

// To Update/Patch/Merge Action
    @updateonly
    entity UpdateEmployeeSrv as projection on master.employees;

// To Delete Action
    @deleteonly
    entity DeleteEmployeeSrv as projection on master.employees;
}

