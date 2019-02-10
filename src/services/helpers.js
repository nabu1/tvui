export const days = () => {
  const weekDayNames = ['Nie', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob']
  const monthNames = ['Sty', 'Luty', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru']
  const daysForSelectBox = []

  daysForSelectBox.push({
    text: 'Dzień',
    value: null,
  })

  for (let index = 0; index < 7; index++) {
    const startOfDay = new Date().setUTCHours(index * 24, 0, 0, 0)
    const dayName = weekDayNames[new Date(startOfDay).getDay()]
    const dayOfMonth = new Date(startOfDay).getDate()
    const monthName = monthNames[new Date(startOfDay).getMonth()]
    const dayString = `${dayName} ${dayOfMonth} ${monthName}`

    const dayObj = {
      text: dayString,
      value: startOfDay,
      dayString,
    }

    daysForSelectBox.push(dayObj)
  }

  return daysForSelectBox
}

const hoursArray = (start, end, isEnd) => {
  const hours = []

  for (let index = start + isEnd; index < end; index++) {
    const hour = {
      text: index,
      value: index,
    }
    hours.push(hour)
  }

  const lineFirst = isEnd ? { text: 'Godzina Do', value: null } : { text: 'Godzina Od', value: null }
  hours.unshift(lineFirst)
  return hours
}

export const startHours = (day, endHour) => {
  if ((!day || new Date(day).getDate() === new Date().getDate()) && !endHour) {
    return hoursArray(new Date().getHours(), 24, false)
  }
  return hoursArray(3, 24, false)
}

export const endHours = (day, startHour) => {
  console.log('%c startHour = ' + startHour, 'color: white')

  if ((!day || new Date(day).getDate() === new Date().getDate()) ) {
    if (startHour) {
      return hoursArray(startHour, 25, true)
    }
    return hoursArray(new Date().getHours(), 25, true)
  }

  if (startHour) {
    return hoursArray(startHour, 25, true)
  }

  return hoursArray(4, 25, true)
}
