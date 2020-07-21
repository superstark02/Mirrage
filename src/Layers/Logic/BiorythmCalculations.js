export function BiorythmicCalculations (constant,number_of_days_lived){

    var t = number_of_days_lived
    
    return Math.sin(2*Math.PI*t/constant)
}

