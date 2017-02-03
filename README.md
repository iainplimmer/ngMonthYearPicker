# ngMonthYearPicker
A month year picker component that can be used to raise an event.

1. Include the module in the application that you are working on

  angular.module('myApplication', ['MonthYearPicker']);

2. Use as follows in your HTML....  

  <code>
  < month-year-picker >< / month-year-picker >
  </code>

3. Listen for the event

<code>
  $rootScope.$on("MonthYearPickerEvent", function(evt, month, year){
 
  }); 
  </code>
