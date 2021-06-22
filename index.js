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


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


let calculatePayroll = function (records){
    return records.reduce(function(acc, cv){
        return acc + allWagesFor.call(cv)}, 0)
    }

function findEmployeeByFirstName(srcArray, firstName) {
    let finder = srcArray.find(function(name){
        let found = name => name === name.firstName;
        return found
    })
    return finder
}

let calculatePayroll = function (records){
    return records.reduce(function(acc, cv){
        return acc + allWagesFor.call(cv)}, 0)
    }



