import { getYYYYMMDD } from "./date-utils"


export const getCalendarChartData = (rawData) => {

    const datesArray = rawData.map(elm => {
        return (getYYYYMMDD(elm.date))
    })

    const frequencyMap = {}

    datesArray.forEach(date => {
        frequencyMap[date] = (frequencyMap[date] || 0) + 1
    })
    
    const processedData = []

    for (const property in frequencyMap) {
        processedData.push({
            "value": frequencyMap[property],
            "day" : property 
        })
       }

       console.log(processedData)

    return (processedData)

}