(function () {
    angular.module('MonthYearPicker', [])
    .component('monthYearPicker', {
        template: `

            <a href="#" ng-click="$ctrl.AddMonth(-1)">PRE</a>

            <select name="SelectedMonth" 
                ng-model-options="{ debounce: { 'default': $ctrl.DebounceTime, 'blur': 0 } }"
                ng-options="SelectedMonth.id as SelectedMonth.name for SelectedMonth in $ctrl.Months" 
                ng-model="$ctrl.SelectedMonth"
                ng-change="$ctrl.ChangeMonth()">  
                </select>

            <select name="SelectedYear" 
                ng-model-options="{ debounce: { 'default': $ctrl.DebounceTime, 'blur': 0 } }"
                ng-options="SelectedYear.id as SelectedYear.name for SelectedYear in $ctrl.Years" 
                ng-model="$ctrl.SelectedYear"
                ng-change="$ctrl.ChangeMonth()">  
                </select>

            <a href="#" ng-click="$ctrl.AddMonth(1)">NEX</a>
        `,
        controllerAs: '$ctrl',
        controller: ['$http','$rootScope', function ($http,$rootScope) {
            //   Setup variables
            var vm = this;
            vm.AllowChange = true;
            
            //   When the component first starts up
            vm.$onInit = function () {

                vm.CurrentMonth = new Date().getMonth()
                vm.CurrentYear = new Date().getFullYear();
                vm.MinYear = 2000;
                vm.DebounceTime = 1000;

                //  To get started let's build a list of months
                vm.Months = [
                    {"id": 1, "name": "1"}, 
                    {"id": 2, "name": "2"}, 
                    {"id": 3, "name": "3"}, 
                    {"id": 4, "name": "4"}, 
                    {"id": 5, "name": "5"}, 
                    {"id": 6, "name": "6"}, 
                    {"id": 7, "name": "7"}, 
                    {"id": 8, "name": "8"}, 
                    {"id": 9, "name": "9"}, 
                    {"id": 10, "name": "10"}, 
                    {"id": 11, "name": "11"}, 
                    {"id": 12, "name": "12"}
                ];

                //  Now a list of years from 2000 (the first year of Scout7) to the current year
                vm.Years = [];
                for(var i = vm.MinYear; i <= new Date().getFullYear(); i++) {
                    vm.Years.push({"id": i, "name": i})
                }

                //  Let's get the current year's index to use to set the model
                var index = vm.Years.findIndex(function (x) {
                    return x.id == new Date().getFullYear();
                });

                vm.SelectedMonth = vm.Months[new Date().getMonth()].id;
                vm.SelectedYear = vm.Years[index].id;
            };

            //  Handles the event that is raised when the user changes month in the dropdown, and next/previous month buttons
            vm.ChangeMonth = function () {
                
                //  We want to throttle the amount of times the user can click the next previous buttons to mimit a debounce and for this 
                //  we make this value much longer as the possibility for interactivity is much higher!
                if (vm.AllowChange) {
                    vm.AllowChange = false;
                    setTimeout(function () {
                        vm.AllowChange = true;   
                    }, vm.DebounceTime)

                    //  Let's emit the event now back to any component that is listening
                    $rootScope.$emit("MonthYearPickerEvent", vm.SelectedMonth, vm.SelectedYear);               
                }
            }

            //  There be dragons here, as this needs to handle not raising an event, or changing the model if the selected date reaches
            //  the min or max values.
            vm.AddMonth = function (n) {
                if (vm.AllowChange && vm.SelectedMonth == 1 && n == -1) {
                    if (vm.SelectedYear > vm.MinYear) {
                        vm.SelectedMonth = 12;
                        vm.SelectedYear = vm.SelectedYear - 1;
                        vm.ChangeMonth();
                    }
                }
                else if (vm.AllowChange && vm.SelectedMonth == 12 && n == 1) {
                    if (vm.SelectedYear < vm.CurrentYear) {
                        vm.SelectedMonth = 1;
                        vm.SelectedYear = vm.SelectedYear + 1;
                        vm.ChangeMonth();
                    }
                }
                else if (vm.AllowChange) {
                    vm.SelectedMonth += n;
                    vm.ChangeMonth();
                }
            }

        }]
    })
})();
