import readlineSync from "readline-sync";

// Function to calculate monthly income if needed
function calculateMonthlyIncome(amount, frequency) {
    return frequency === "monthly" ? amount * 12 : amount;
}

// Function to calculate donation relief based on the donation type and amount
function calculateDonationRelief(amount, donationType) {
    let reliefRate = 0;
    if (donationType === 'government') {
        reliefRate = 0.75; // 75% relief for government donations
    } else if (donationType === 'charity') {
        reliefRate = 0.50; // 50% relief for charity donations
    }

    return amount * reliefRate;
}

// Function to get donation details from the user
function getDonationDetails() {
    let donationDesc=''
    let donationReleif=0
    let primaryIncome=0
    let donationType=''
    console.log("*************Enter your Donation details*************");
    let hasIncome = readlineSync.question(`Do you have Donations ? (yes/no): `).toLowerCase() === 'yes';
    if (hasIncome) {
        let donationAmount = parseFloat(readlineSync.question("Donation Amount: "));
        donationType = readlineSync.question("Donation Type (government/charity): ");
        donationDesc = readlineSync.question("Description of Donation: ");
        let primaryAnum = readlineSync.question("Is Your Income yearly or monthly : ");

        primaryIncome = calculateMonthlyIncome(donationAmount, primaryAnum);
        donationReleif = calculateDonationRelief(primaryIncome, donationType)
    }
    return {
        totalIncome: primaryIncome,
        donationType,
        donationDesc,
        donationReleif,
        deductionTotal: primaryIncome
    };
}

export default getDonationDetails;
