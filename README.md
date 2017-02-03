# ngMonthYearPicker
A month year picker component that can be used to raise an event.

1. Include the module in the application that you are working on

  angular.module('myApplication', ['MonthYearPicker']);

2. Use as follows in your HTML....  

  <month-year-picker></month-year-picker>

3. Listen for the event

  $rootScope.$on("MonthYearPickerEvent", function(evt, month, year){
    console.log('READY FOR THAT EVENT THEN ARE WE?', month, year)
  });            
