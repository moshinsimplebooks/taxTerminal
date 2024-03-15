import readlineSync from "readline-sync"

function getRentalIncome() {
    console.log("Enter your Rental income details:");
    let primaryIncome = parseFloat(readlineSync.question("Rental income : "));
    let primaryIncomeDesc = readlineSync.question("Description of Rental income: ");
    return {
        primaryIncome: { income: primaryIncome, description: primaryIncomeDesc },
    };
}
export default getRentalIncome