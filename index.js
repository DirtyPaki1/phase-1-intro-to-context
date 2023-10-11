// Your code here
function createEmployeeRecord(array) {
    let employeeRecord = {};
  
    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
  
    return employeeRecord;
  }

  console.log(createEmployeeRecord(["Ada", "Lovelace", "Software Engineer", 50]));
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      date: date,
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeIn = timeInEvent.hour;
    const timeOut = timeOutEvent.hour;
  
    const hoursWorked = (timeOut - timeIn) / 100;
  
    return hoursWorked;
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = 0;
  
    for (const date of dates) {
      const wages = wagesEarnedOnDate(employeeRecord, date);
      totalWages += wages;
    }
  
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    for (const employeeRecord of employeeRecords) {
      const wages = allWagesFor(employeeRecord);
      totalPayroll += wages;
    }
  
    return totalPayroll;
  }