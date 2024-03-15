import readlineSync from "readline-sync"

function getSolarIncome() {
    console.log("Enter your Solar expense details:");
    let primaryIncome = parseFloat(readlineSync.question("Solar expense: "));
    let primaryIncomeDesc = readlineSync.question("Description of Solar expense: ");
    let solarReleifRate = 600000
    let solarRelief = 0
    if(primaryIncome>solarRelief){
        solarRelief=primaryIncome-solarReleifRate
    }
    return {
        primaryIncome: { expense: primaryIncome, description: primaryIncomeDesc,solarRelief },
    };
}
export default getSolarIncome