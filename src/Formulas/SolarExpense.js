import readlineSync from "readline-sync";

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}

function getSolarIncome() {
    console.log("*************Enter your Solar expense details*************");
    let hasIncome = readlineSync.question(`Do you have Solar Expense ? (yes/no): `).toLowerCase() === 'yes';
    let primaryIncomeDesc=''
    let primaryIncome=0
    let solarReliefRate = 600000;
    let solarRelief = 0;
    let reliefMessages = []; // Array to store relief messages for each year

    if (hasIncome) {
        primaryIncome = parseFloat(readlineSync.question("Solar expense Amount: "));
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
        primaryIncomeDesc = readlineSync.question("Description of Solar expense: ");

        primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);

        if (primaryIncome > solarReliefRate) {
            let remainingIncome = primaryIncome;
            let currentYearRelief = 0;
            for (let year = 1; year <= 4; year++) {
                currentYearRelief = Math.min(remainingIncome, solarReliefRate);
                solarRelief += currentYearRelief;
                remainingIncome -= currentYearRelief;
                reliefMessages.push(`Year ${year}: ${currentYearRelief}`);
            }
        } else {
            solarRelief = primaryIncome;
            reliefMessages.push("No breakdown, solar relief taken in full.");
        }
    }
    return {
        primaryIncome,
        primaryIncomeDesc,
        solarRelief,
        reliefMessages,
        deductionTotal: primaryIncome
    };
}

export default getSolarIncome;
