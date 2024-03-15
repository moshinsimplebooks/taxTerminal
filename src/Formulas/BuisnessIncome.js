import readlineSync from "readline-sync"

function getBuisnessIncome() {
    console.log("Enter your Buisness income details:");
    let primaryIncome = parseFloat(readlineSync.question("Buisness income (in LKR or foreign currency): "));
    let primaryIncomeDesc = readlineSync.question("Description of Buisness income: ");
    let primaryIncomeCurrency = readlineSync.question("Currency (LKR or foreign): ");
    let primaryExchangeRate = 1;
    if (primaryIncomeCurrency.toLowerCase() !== 'lkr') {
        primaryExchangeRate = parseFloat(readlineSync.question("Exchange rate to LKR: "));
    }
    let secondaryIncomes=[]
    while(true){
        let moreIncome = readlineSync.question("Do you have more income? (yes/no): ");
        if (moreIncome.toLowerCase() !== 'yes') {
            break;
        }
        let income = parseFloat(readlineSync.question("New income (in LKR or foreign currency): "));
        let description = readlineSync.question("Description of more income: ");
        let currency = readlineSync.question("Currency (LKR or foreign): ");
        let exchangeRate = 1;
        if (currency.toLowerCase() !== 'lkr') {
            exchangeRate = parseFloat(readlineSync.question("Exchange rate to LKR: "));
        }
        secondaryIncomes.push({ income, description, currency, exchangeRate });
    }
    return {
        primaryIncome: { income: primaryIncome, description: primaryIncomeDesc, currency: primaryIncomeCurrency, exchangeRate: primaryExchangeRate },
        secondaryIncomes
    };
}
export default getBuisnessIncome