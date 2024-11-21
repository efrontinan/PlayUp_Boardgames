import axios from "axios"
import { useEffect, useState } from "react"

import { ResponsiveCalendar } from '@nivo/calendar'

import { getCalendarChartData } from '../../utils/data-preprocesors-utils'
import Loader from "../Loader/Loader"

const API_URL = "http://localhost:5005"

const CalendarChart = () => {

    const [contacts, setContacts] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = () => {
        axios
            .get(`${API_URL}/contact`)
            .then(response => {
                setContacts(response.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    return (isLoading ? <Loader /> :
        <ResponsiveCalendar
            data={getCalendarChartData(contacts)}
            from="2023-01-01"
            to="2024-01-12"
            emptyColor="#06020b"
            align="top"
            colors={['#35febb', '#6794fe', '#3571fe', '#35febb']}
            margin={{ top: 0, right: 24, bottom: 0, left: 0 }}
            yearSpacing={40}
            yearLegendPosition="after"
            monthSpacing={4}
            monthBorderWidth={0}
            monthBorderColor="#ffffff00"
            monthLegendPosition="after"
            monthLegendOffset={16}
            monthLegendColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff0f"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left',
                    textColor: '#fff'
                }
            ]}
            theme={{
                "text": {
                    "fill": "#8591ad"
                },
                "axis": {
                    "legend": {
                        "text": {
                            "fill": "#8591ad"
                        }
                    },
                    "ticks": {
                        "text": {
                            "fill": "#8591ad"
                        }
                    }
                }
            }} />
    )

}

export default CalendarChart