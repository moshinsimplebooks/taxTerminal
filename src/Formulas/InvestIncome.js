import readlineSync from "readline-sync";
import apitTax from "./ApitCheck/apitTax.js";

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}

function getInvestmentIncome() {
    let totalIncome = 0;
    let totalCredits = 0;
    let incomeSources = [];
    const incomeTypes = [
        "dividends",
        "interest",
        "discounts",
        "charges",
        "annuities",
        "natural resource payments",
        "premiums",
        "royalties"
    ];

    console.log("*************Enter your Investment income details*************");
    let hasIncome = readlineSync.question(`Do you have Buisness income ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        for (const incomeType of incomeTypes) {
            let hasIncome = readlineSync.question(`Do you have ${incomeType}? (yes/no): `).toLowerCase() === 'yes';
            if (hasIncome) {
                let income = parseFloat(readlineSync.question(`Enter ${incomeType} income: `));
                let description = readlineSync.question(`Description of ${incomeType} income: `);
                let sourceFrequency = readlineSync.question(`Is ${incomeType} income yearly or monthly : `);

                income = calculateMonthlyIncome(income, sourceFrequency);
                totalIncome += income;
                incomeSources.push({ type: incomeType, income, description, sourceFrequency, calculatedFrequency: "anually" });

            }
        }
        const investCredits = apitTax(totalIncome, "invest");
        totalCredits += investCredits.credits;
    }
    return {
        totalIncome,
        incomeSources,
        totalCredits
    };
}

export default getInvestmentIncome;
