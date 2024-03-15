
import apitForSecondary from "./ApitSec/ApitSec.js"
import apitForPrimary from "./ApitPrim/ApitPrim.js"

function totalTax(amount, taxType) {
    let anumAmt = amount

    let credits=0
    if(taxType==="primary")
        credits = apitForPrimary(anumAmt/12)
    else if(taxType==="secondary")
        credits =apitForSecondary(anumAmt/12)

    return {
        credits,
        anumAmt
    }
}
export default totalTax