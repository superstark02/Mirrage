import { db } from '../../firebase'
import { BiorythmicCalculations } from '../Logic/BiorythmCalculations'
import { Percentage } from '../Logic/Percentage'

export function getBiorythmicFunctions(number_of_days_lived) {

    var functions = []
    var biorythm_results = []
    var percentage_results

    db.collection("Functions").get().then(snapshot => {
        snapshot.forEach(doc => {
            functions.push(doc.data())
        })

        for (var i = 0; i < functions.length; i++) {
            biorythm_results.push({ name: functions[i].name, value: BiorythmicCalculations(functions[i].const, number_of_days_lived) })
        }

        percentage_results = Percentage(biorythm_results)
        return percentage_results;
    })
}

