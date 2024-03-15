function payableRate(yearlySalary) {

    if (yearlySalary <= 1200000) {
        return 0;
    }
    const taxBrackets = [
        { upperLimit: 500000, rate: 0.06 },
        { upperLimit: 1000000, rate: 0.12 },
        { upperLimit: 1500000, rate: 0.18 },
        { upperLimit: 2000000, rate: 0.24 },
        { upperLimit: 2500000, rate: 0.30 },
        { upperLimit: Infinity, rate: 0.36 }
    ];

    let tax = 0;
    let remainingSalary = yearlySalary - 1200000;

    for (let i = 0; i < taxBrackets.length; i++) {
        const bracket = taxBrackets[i];
        const taxableAmount = Math.min(remainingSalary, bracket.upperLimit - (taxBrackets[i - 1]?.upperLimit || 0));

        if (taxableAmount <= 0) {
            break;
        }

        tax += taxableAmount * bracket.rate;
        remainingSalary -= taxableAmount;

        if (remainingSalary <= 0) {
            break;
        }
    }

    return tax;
}

export default payableRate
