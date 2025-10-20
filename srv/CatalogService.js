module.exports = cds.service.impl( async function () {

// Here we can use our DB tables as objects

 const { EmployeeSet, PurchaseOrder,PurchaseOrderItems } = this.entities;

 // Default Status Set

 this.on('getOrderDefaults', async req => {
        return {OVERALL_STATUS: 'N'};
      });

 //Actions

    this.on('boost', async (req,res) => {
        try {
            const ID = req.params[0];
            console.log("Hey Amigo, Your purchase order with id " + req.params[0].NODE_KEY + " will be boosted");
            const tx = cds.tx(req);
            await tx.update(PurchaseOrder).with({
                GROSS_AMOUNT: { '+=' : 20000 },
                NOTE: 'Boosted!!'
            }).where(ID);
        } catch (error) {
            return "Error " + error.toString();
        }
    });

// Set to Status Delivered.
    this.on('setOrderProcessing', PurchaseOrder, async req => {
        const tx = cds.tx(req);
        await tx.update(PurchaseOrder, req.params[0].ID).set({OVERALL_STATUS: 'D'});
    });

//Function

    this.on('largestOrder', async (req,res) => {
        try {
            // const ID = req.params[0];
            const tx = cds.tx(req);
            
            //SELECT * UPTO 1 ROW FROM dbtab ORDER BY GROSS_AMOUNT desc
            const reply = await tx.read(PurchaseOrder).orderBy({
                GROSS_AMOUNT: 'desc'
            }).limit(1);

            return reply;
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    // Generica Handlers Validation on Employee Set

        this.before('CREATE', EmployeeSet, (req,res) => {
        console.log("Aa gaya " + req.data.salaryAmount);
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500, "Salary must be less than a million for employee");
        }
    });
    
})