export function compress_summary_text(text, upperLimit=400) {
    if (text.length > upperLimit)  {
        let i = upperLimit
        while (i--) {
            if (text.charAt(i) === ' ') {
                break;
            }
        }
        text = text.substring(0, i) + '...'
    }
    return text
}

export function formatDateTimeString(date) {
    let preferred_time_slot = new Date(date)
    let preferred_date = preferred_time_slot.toDateString()
    let preferred_time = preferred_time_slot.toLocaleTimeString()
    preferred_date = preferred_date.substring(4)
    if (preferred_time[2] === ':') {
        preferred_time = preferred_time.substring(2, preferred_time.length-6)
    }
    if (preferred_time[1] === ':') {
        preferred_time = preferred_time.substring(1, preferred_time.length-6)
    }
    if (preferred_time_slot.getHours() < 12) {
        preferred_time = preferred_time_slot.getHours() + preferred_time + ' AM'
    } else if (preferred_time_slot.getHours() === 12) {
        preferred_time = preferred_time_slot.getHours() + preferred_time + ' PM'
    } else {
        preferred_time = preferred_time_slot.getHours() % 12 + preferred_time + ' PM'
    }
    preferred_date = preferred_date + ' ' + preferred_time
    return preferred_date;
}

export function filterForLastNDays(allData, days=30, isBlogs=false) {
    let durationFilteredData = []

    allData.map((dataItem) => {
        let thirtyDaysAgo = new Date(Date.now());
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - days)
        thirtyDaysAgo.setHours(0);
        thirtyDaysAgo.setMinutes(0);
        thirtyDaysAgo.setSeconds(0)
        let itemDate = new Date(dataItem.createdOn)
        if (isBlogs) {
            itemDate = new Date(dataItem.createdAt)
        }
        if (itemDate > thirtyDaysAgo) {
            durationFilteredData = [...durationFilteredData, dataItem]
        }
    })
    return durationFilteredData
}

export function filterByYear(allData, year, isBlogs=false) {
    let durationFilteredData = []
    allData.map((dataItem) => {
        let itemDate = new Date(dataItem.createdOn)
        if (isBlogs) {
            itemDate = new Date(dataItem.createdAt)
        }
        if (itemDate.getFullYear().toString() === year) {
            durationFilteredData = [... durationFilteredData, dataItem]
        }
    })
    return durationFilteredData
}

export function getEarliestTime(hours = 72) {
    // let dateTime = new Date(Date.parse("2020-10-19T10:00"))
    let dateTime = new Date(Date.now())
    dateTime.setHours(dateTime.getHours())
    let month = (dateTime.getMonth() + 1).toString()
    month = month.length === 2 ? month: "0" + month
    let date = (dateTime.getDate()).toString().length === 2 ? dateTime.getDate(): "0" + (dateTime.getDate());
    return dateTime.getFullYear() + "-"
        + month + "-"
        + date + "T"
        + "10:"
        + "00"
}
