import readlineSync from "readline-sync"

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}

function getOtherIncome() {

    let totalIncome = 0;
    let primaryIncomeDesc = '';

    console.log("*************Enter your Other income details*************");
    let hasIncome = readlineSync.question(`Do you have Other income ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        let primaryIncome = parseFloat(readlineSync.question("Other income amount: "));
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");
        primaryIncomeDesc = readlineSync.question("Description of Other income: ");

        primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);
        totalIncome += primaryIncome;
    }
    return {
        primaryIncomeDesc,
        totalIncome,
    };
}
export default getOtherIncome