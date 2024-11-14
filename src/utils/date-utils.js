export const formatInputDate = (dateData) => {
    const date = new Date(dateData)
    return date.toISOString().slice(0, 16)
}