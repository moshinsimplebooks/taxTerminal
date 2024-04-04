import readlineSync from "readline-sync"

function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}
function getRentalIncome() {
    let totalIncome = 0;
    let primaryIncomeDesc = '';

    console.log("*************Enter your Rental income details*************");
    let hasIncome = readlineSync.question(`Do you have Rental income ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        let primaryIncome = parseFloat(readlineSync.question("Rental income : "));
        primaryIncomeDesc = readlineSync.question("Description of Rental income: ");
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");

        primaryIncome = calculateMonthlyIncome(primaryIncome, primaryAnum);
        totalIncome = primaryIncome
    }
    return {
        totalIncome,
        primaryIncomeDesc,
        relief: totalIncome * 0.25
    };
}
export default getRentalIncome