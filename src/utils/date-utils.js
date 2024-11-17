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