function apitForSecondary(amount){
    const taxSlabs = [
        { upperLimit: 100000, rate: 0.06 },
        { upperLimit: 141667, rate: 0.12 },
        { upperLimit: 183333, rate: 0.18 },
        { upperLimit: 225000, rate: 0.24 },
        { upperLimit: 266667, rate: 0.30 },
        { upperLimit: Infinity, rate: 0.36 }
    ];

    let apiitAmt = 0;
    for (let i = 0; i < taxSlabs.length; i++) {
        const bracket = taxSlabs[i];
        const taxableAmount = Math.min(amount, bracket.upperLimit - (taxSlabs[i - 1]?.upperLimit || 0));

        apiitAmt += taxableAmount * bracket.rate;
        amount -= taxableAmount;

        if (amount <= 0) {
            break;
        }
    }
    return apiitAmt
}

export default apitForSecondary