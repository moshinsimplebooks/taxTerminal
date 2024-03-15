import readlineSync from "readline-sync";
import totalTax from "./totalTax.js";
import payableRate from "./PayableRate/PayableRate.js";

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount* 12 : amount ;
}

function calculateForeignIncome(income, currency) {
    if(currency.toLowerCase()!=='lkr'){
        let exRate = readlineSync.question("exchange rate : ");
        return income*exRate
    }else{
        return 0
    }
}

function getEmploymentIncome() {
    let totalCredits = 0;
    let totalIncome = 0;
    let foreignIncome = 0;

    console.log("Enter your primary employment income details:");
    let primaryIncome = parseFloat(readlineSync.question("Primary income amount: "));
    let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
    let primaryIncomeDesc = readlineSync.question("Description of primary income: ");
    let primaryIncomeCurrency = readlineSync.question("Currency (LKR or foreign): ");
    
    primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);
    totalIncome += primaryIncome;
    foreignIncome += calculateForeignIncome(primaryIncome, primaryIncomeCurrency);

    const primaryTax = totalTax(primaryIncome, "primary");
    totalCredits += primaryTax.credits;

    let secondaryIncomes = [];
    while (true) {
        let moreIncome = readlineSync.question("Do you have secondary income? (yes/no): ");
        if (moreIncome.toLowerCase() !== 'yes') {
            break;
        }
        let income = parseFloat(readlineSync.question("Secondary income amount: "));
        let secondaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
        let description = readlineSync.question("Description of secondary income: ");
        let currency = readlineSync.question("Currency (LKR or foreign): ");

        income = calculateMonthlyIncome(income, secondaryAnum);
        totalIncome += income;
        foreignIncome += calculateForeignIncome(income, currency);

        const secondaryTax = totalTax(income, "secondary");
        secondaryIncomes.push({ income, description, currency, exchangeRate });
        totalCredits += secondaryTax.credits;
    }

    return {
        totalCredits,
        totalIncome,
        taxPayable: payableRate(totalIncome) - totalCredits,
        foreignIncome
    };
}

export default getEmploymentIncome;
