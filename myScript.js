/* Salary Calculator Script */

$(function() {
    
    $("#calcIt").on("click", function(e) {
        e.preventDefault();

        var $salary = $("#salary");
        var salary = parseFloat($salary.val());
        if(salary && salary > 0) {
            var allowance = 11500;
            var taxToPay = [0, 0, 0];
            var salaryTaxLevel = [33500, 150000];
            var salaryTaxRate = [0.2, 0.4, 0.45];
            var netSalary = salary;
            if(salary > allowance) {
                if(parseInt($("#selType").val())===2) {
                    //Deduct allowance after check tax level
                    var salaryForAdd = salary - Math.max(salaryTaxLevel[1], allowance);
                    console.log("salaryForAdd: "+salaryForAdd);
                    var salaryForHigh = Math.min(salary, salaryTaxLevel[1]) -
                        Math.max(salaryTaxLevel[0], allowance);
                    console.log("salaryForHigh: "+salaryForHigh);
                    var salaryforLow = Math.min(salary, salaryTaxLevel[0]) - allowance;
                    console.log("salaryforLow: "+salaryforLow);

                    if(salaryForAdd > 0) {
                        taxToPay[2] = salaryForAdd * salaryTaxRate[2];
                    }   
                    if(salaryForHigh > 0) {
                        taxToPay[1] = salaryForHigh * salaryTaxRate[1];
                    }   
                    if(salaryforLow > 0) {
                        taxToPay[0] = salaryforLow * salaryTaxRate[0];
                    }   

                    taxToPay.forEach(function(item) {
                        netSalary -= item;
                    });
                    
                } else {
                    //Deduct allowance before check tax level
                    var salaryToPayTax = salary - allowance;
                    var salaryForAdd = salaryToPayTax - salaryTaxLevel[1];
                    console.log("salaryForAdd: "+salaryForAdd);
                    var salaryForHigh = Math.min(salaryToPayTax, salaryTaxLevel[1]) -
                        salaryTaxLevel[0];
                    console.log("salaryForHigh: "+salaryForHigh);
                    var salaryforLow = Math.min(salaryToPayTax, salaryTaxLevel[0]);
                    console.log("salaryforLow: "+salaryforLow);

                    if(salaryForAdd > 0) {
                        taxToPay[2] = salaryForAdd * salaryTaxRate[2];
                    }   
                    if(salaryForHigh > 0) {
                        taxToPay[1] = salaryForHigh * salaryTaxRate[1];
                    }   
                    if(salaryforLow > 0) {
                        taxToPay[0] = salaryforLow * salaryTaxRate[0];
                    }   

                    taxToPay.forEach(function(item) {
                        netSalary -= item;
                    });
                }
            }
            
            $("#result").html("<table class='middle'>"+
                "<tr><th nowrap>Gross Salary</th><td nowrap>&nbsp;" + salary + "&nbsp;</td></tr>"+
                "<tr><th nowrap>Tax Free Allowance</th><td>&nbsp;" + allowance + "&nbsp;</td></tr>"+
                "<tr><th nowrap>Tax at 20%</th><td>" + taxToPay[0] + "</td></tr>"+
                "<tr><th nowrap>Tax at 40%</th><td>" + taxToPay[1] + "</td></tr>"+
                "<tr><th nowrap>Tax at 45%</th><td nowrap>" + taxToPay[2] + "</td></tr>"+
                "<tr><th nowrap>Net Salary</th><td nowrap>" + netSalary + "</td></tr>"+
                "</table>");
            
            
        } else {
            alert("Please enter a salary and it must be more than 0.");
            $salary.focus();
            $salary.select();
        }
    });
});