//grossIncome : Int x Int -> Int
//Pre : lastIncome != 0
//Post : 
//Result : return the gross income per month
function grossIncome (current, lastIncome) {
    if (lastIncome!=0) { 
        return current / lastIncome
    } else {
        return 0
    }
};

//fullName : String x String -> String
//Pre : 
//Post : 
//Result : return the full name of the user
function fullName (firstname,lastname) {
    return (firstname + " " + lastname);
};

//incomeTax : Int  -> Int
//Pre : 
//Post : 
//Result : return the income tax in relation to annual salary
function incomeTax (annualSalary) {
    if (annualSalary <= 18200) {
        return 0
    } 
    else if (annualSalary >= 18201 && annualSalary <= 37000) {
        return ((annualSalary - 18200)*0.19)/12
    } 
    else if (annualSalary >= 37001 && annualSalary <= 87000) {
        return (3572 + (annualSalary - 37000)*0.325)/12
    }
    else if (annualSalary >= 87001 && annualSalary <= 180000) {
        return (19822 + (annualSalary - 87000)*0.37)/12
    }
    else {
        return (54232 + (annualSalary - 180000)*0.45)/12
    }
}

//rounded : Int  -> Int
//Pre : 
//Post : 
//Result : return the value of a rounded number to the nearest integer
function rounded (a) {
    return Math.round(a);
}

//netIncome : Int x Int -> Int
//Pre : 
//Post : 
//Result : return the value of the net income
function netIncome(grossIncome,incomeTax) {
    return (grossIncome - incomeTax);
};

//superAmount : Int x Int -> Int
//Pre : superRate < 100
//Post : 
//Result : return the value of the super annuation
function superAmount(grossIncome,superRate) {
    return grossIncome*(superRate/100);
};

exports.incomeTax = incomeTax;
exports.rounded = rounded;
exports.grossIncome = grossIncome;
exports.fullName = fullName;
exports.netIncome = netIncome;
exports.superAmount = superAmount;