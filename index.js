// Your code here
let createEmployeeRecord = function(row){
    //TODO
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let date = dateStamp.split(' ')[0];
    let hour = parseInt(dateStamp.split(' ')[1]);
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: hour
    })
    return employee;
}

let createTimeOutEvent = function(employee, dateStamp){
    let date = dateStamp.split(' ')[0];
    let hour = parseInt(dateStamp.split(' ')[1]);
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: hour
    })
    return employee;
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let timeInEventHour = employee.timeInEvents.filter(e => e.date === soughtDate)[0].hour;
    let timeOutEventHour = employee.timeOutEvents.filter(e => e.date === soughtDate)[0].hour;
    return (timeOutEventHour - timeInEventHour)/100;
}

let wagesEarnedOnDate = function(employee, dateSought){
    let hours = hoursWorkedOnDate(employee, dateSought);
    let payRate = employee.payPerHour;
    return payRate*hours;
}

let allWagesFor = function(employee){
    let dates = employee.timeInEvents.map(e => e.date);
    return dates.reduce((acc, date) => acc+=wagesEarnedOnDate(employee, date), 0)
}


let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((acc, employee) => acc+=allWagesFor(employee), 0)
}