import readlineSync from "readline-sync"

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}

function calculateForeignIncome(income, currency) {
    if (currency.toLowerCase() !== 'lkr') {
        let exRate = readlineSync.question("exchange rate : ");
        return income * exRate
    } else {
        return 0
    }
}

function getBuisnessIncome() {

    let totalIncome = 0;
    let foreignIncome = 0;
    let primaryIncomeDesc=''
    console.log("*************Enter your Buisness income details*************");
    let hasIncome = readlineSync.question(`Do you have Buisness income ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        let primaryIncome = parseFloat(readlineSync.question("Buisness income amount: "));
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
        primaryIncomeDesc = readlineSync.question("Description of Buisness income: ");
        let primaryIncomeCurrency = readlineSync.question("Currency (LKR or foreign): ");

        primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);
        totalIncome += primaryIncome;
        foreignIncome += calculateForeignIncome(primaryIncome, primaryIncomeCurrency);
        if (foreignIncome > 0) totalIncome = foreignIncome;
    }

    return {
        primaryIncomeDesc,
        totalIncome,
        foreignIncome
    };
}
export default getBuisnessIncome