import readlineSync from "readline-sync";
import apitTax from "./ApitCheck/apitTax.js";
import payableRate from "./PayableRate/PayableRate.js";

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

function getEmploymentIncome() {
    let totalCredits = 0;
    let totalIncome = 0;
    let foreignIncome = 0;
    let primaryIncomeDesc = '';
    let consultancyDescription = '';

    console.log("*************Enter your primary employment income details*************");
    let hasIncome = readlineSync.question(`Do you have Employment income ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        let primaryIncome = parseFloat(readlineSync.question("Primary income amount: "));
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
        primaryIncomeDesc = readlineSync.question("Description of primary income: ");
        let primaryIncomeCurrency = readlineSync.question("Currency (LKR or foreign): ");

        primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);
        totalIncome += primaryIncome;
        foreignIncome += calculateForeignIncome(primaryIncome, primaryIncomeCurrency);

        const primaryTax = apitTax(primaryIncome, "primary");
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

            const secondaryTax = apitTax(income, "secondary");
            secondaryIncomes.push({ income, description, currency });
            totalCredits += secondaryTax.credits;
        }

        let cosultancy = readlineSync.question("Do you have Consaltancy income? (yes/no): ");
        if (cosultancy === "yes") {
            let cosultancyIncome = parseFloat(readlineSync.question("Cosultancy income amount: "));
            let consultancyAnum = readlineSync.question("Is Your Income yearly or monthly : ");
            consultancyDescription = readlineSync.question("Description of secondary income: ");
            let consultancyCurrency = readlineSync.question("Currency (LKR or foreign): ");

            cosultancyIncome = calculateMonthlyIncome(cosultancyIncome, consultancyAnum);
            totalIncome += cosultancyIncome;
            foreignIncome += calculateForeignIncome(cosultancyIncome, consultancyCurrency);

            const consultTax = apitTax(cosultancyIncome, "consultancy");
            totalCredits += consultTax.credits;
        }
    }
    return {
        totalCredits,
        totalIncome,
        // taxPayable: payableRate(totalIncome) - totalCredits,
        foreignIncome
    };
}

export default getEmploymentIncome;
