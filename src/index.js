import getBuisnessIncome from "./Formulas/BuisnessIncome.js"
import getDonationDetails from "./Formulas/Donations.js"
import getEmploymentIncome from "./Formulas/EmpIncome.js"
import getInvestmentIncome from "./Formulas/InvestIncome.js"
import getOtherIncome from "./Formulas/OtherIncome.js"
import payableRate from "./Formulas/PayableRate/PayableRate.js"
import getRentalIncome from "./Formulas/RentaIncome.js"
import getSolarIncome from "./Formulas/SolarExpense.js"

console.log("===============Simplebooks Tax Calculator====================")

var totalIncome = 0
var totlalForeignIncome=0
var totalCredits=0
var totalReleif=0
var taxPayable=0
var payableTaxWithRate=0
var balanceTaxPayable=0

// employement based
const empIncome =getEmploymentIncome()
console.log(empIncome)
totalIncome = totalIncome+empIncome.totalIncome
totlalForeignIncome = totlalForeignIncome+empIncome.foreignIncome
totalCredits = totalCredits+empIncome.totalCredits

//buisness based
const buisnessIncome = getBuisnessIncome()
console.log(buisnessIncome)
totalIncome = totalIncome+buisnessIncome.totalIncome
totlalForeignIncome = totlalForeignIncome+buisnessIncome.foreignIncome

//rental based
const rentalIncome = getRentalIncome()
console.log(rentalIncome)
totalIncome = totalIncome+rentalIncome.totalIncome
totalReleif = totalReleif+rentalIncome.relief

//solar based
const solarRelief = getSolarIncome()
console.log(solarRelief)
totalReleif = totalReleif+solarRelief.solarRelief

//donations based
const donationReleif = getDonationDetails()
console.log(donationReleif)
totalIncome = totalIncome+donationReleif.totalIncome
totalReleif = totalReleif+donationReleif.deductionTotal

//investments based
const investmentIncome = getInvestmentIncome()
console.log(investmentIncome)
totalIncome = totalIncome+investmentIncome.totalIncome
totalCredits = totalCredits+investmentIncome.totalCredits

//other category
const otherIncome = getOtherIncome()
console.log(otherIncome)
totalIncome = totalIncome+otherIncome.totalIncome

//final output
taxPayable=totalIncome-totalReleif-totlalForeignIncome
payableTaxWithRate = payableRate(taxPayable)
balanceTaxPayable = payableTaxWithRate-totalCredits

console.log("===============Tax Calculations====================")
// console.log("Total Taxable Income :"+taxPayable)
console.log("Total Tax Relief :"+totalReleif)
console.log("Total Tax Credits :"+totalCredits)
console.log("Total Foreign Income :"+totlalForeignIncome)
console.log("Total Tax Payable With Rate :"+payableTaxWithRate)
console.log("Total Balance Tax Payable :"+balanceTaxPayable)