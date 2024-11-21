export const formatInputDate = (dateData) => {
    const date = new Date(dateData)
    return date.toISOString().slice(0, 16)
}

export const exitingDateformat = (dateData) => {

    const date = new Date(dateData)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    const year = date.getFullYear()
    const hour = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return (`${day} de ${month} de ${year} a las ${hour}:${minutes}`)
}

export const getYYYYMMDD = (dateData) => {
    const date = new Date (dateData)

    const day = date.getDate() +1
    const month = date.getMonth() +1
    const year = date.getFullYear() 
    
    return ( `${year}-${month.toString().length<2? `0${month}`:`${month}`}-${day.toString().length<2? `0${day}`:`${day}`}` )

}

export const getTimePassed = (dateData, outputFormat) => {

    const date = new Date(dateData)
    const timePassed = new Date() - date

    let seconds = Math.floor(timePassed / 1000)
    let  minutes = Math.floor(seconds / 60)
    let  hours = Math.floor(minutes / 60)
    let  days = Math.floor(hours / 24)
    let  months = Math.floor(days / 30)
    let  years = Math.floor(days / 365)

    if (outputFormat === 'months') {

        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        days %= 30;
        months %= 12;

        return (`${months>0? `${months} meses` : ''}  ${days} días`)

    }

}