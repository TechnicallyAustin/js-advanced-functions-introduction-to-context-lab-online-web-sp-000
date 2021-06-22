function createEmployeeRecord(array) {
    const record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(array) {
return array.map(createEmployeeRecord)
}

function createDateObj(getType, dateTime){
return {type: getType, hour: parseInt(dateTime.slice(-4)), date: dateTime.slice(0,10) }
}

function createTimeInEvent(record, date) { // "YYYY-MM-DD HHMM" for date
    record.timeInEvents.push(createDateObj('TimeIn', date))
    return record 
}

function createTimeOutEvent(record, date) {
    record.timeOutEvents.push(createDateObj('TimeOut', date))
    return record 
}

function hoursWorkedOnDate(record, dateTime) {
    let timeIn = record.timeInEvents.find(function(event) {
        return event => event.date === dateTime.date
    });

    let timeOut = record.timeOutEvents.find(function(event) {
        return event => event.date === dateTime.date
    })

    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, dateTime) {
    let wages = hoursWorkedOnDate(record, dateTime)
    return (wages * record.payPerHour)
}

function allWagesFor(record){
    const allWages = record.timeInEvents.map((day) => {return wagesEarnedOnDate(record, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)

}

function calculatePayroll(record) {
    let payOut = (record.map(function(employee){
        return allWagesFor(employee)
    }));
    return payOut.reduce((acc, cv)=> acc +cv)

}

function findEmployeeByFirstName(srcArray, firstName) {
    let finder = srcArray.find(function(name){
        let found = name => name === name.firstName;
        return found
    })
    return finder
}

function calculatePayroll(records) { 
    let allPay = records.map(function(employee){
        return allWagesFor(employee)
    })
    return allPay.reduce((acc, cv) => acc + cv)


}




