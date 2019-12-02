function grossIncome (current, lastIncome) {
    if (lastIncome!=0) { 
        return current / lastIncome
    }
};

function name (a,b) {
    return (a + " " + b);
};

function incomeTax (a) {
    if (a <= 18200) {
        return 0
    } 
    else if (a >= 18201 && a <= 37000) {
        return ((a - 18200)*0.19)/12
    } 
    else if (a >= 37001 && a <= 87000) {
        return (3572 + (a - 37000)*0.325)/12
    }
    else if (a >= 87001 && a <= 180000) {
        return (19822 + (a - 87000)*0.37)/12
    }
    else {
        return (54232 + (a - 180000)*0.45)/12
    }
}

function rounded (a) {
    return Math.round(a);
}

function date(a) {
    return a;
}

function netIncome(a,b) {
    return (a - b);
};

function superAmount(a,b) {
    return a*(b/100);
};

exports.incomeTax = incomeTax;
exports.rounded = rounded;
exports.grossIncome = grossIncome;
exports.name = name;
exports.netIncome = netIncome;
exports.superAmount = superAmount;
exports.date = date;