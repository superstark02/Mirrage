const { NumberOfDaysLived } = require("./NumberOfDaysLived")

export function BiorythmicCalculations (constant,dob){

    var t = NumberOfDaysLived(dob)

    return Math.sin(2*Math.PI*t/constant)
}