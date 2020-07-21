export function Percentage(array) {
    var total = 0
    var percentage = []
    
    for(var i = 0; i<array.length ; i++){
        total = total + array[i].value
    }

    for(i = 0; i<array.length ; i++){
        percentage.push({name:array[i].name,value:Math.round(array[i].value*100/total)})
    }

    return percentage
}