var input_total_exp;
var input_inc_exp_get;

var input_total_exp = 621;
var input_inc_exp_get = 161;

var rate_exp_booster1 = 0.15;
var rate_exp_booster2 = 0.2;


var base_exp_get = 100;
var exp_get_without_buff = 146;

var exp_per_hour = (input_total_exp * base_exp_get)/input_inc_exp_get;
console.log("exp/h = " + exp_per_hour);

console.log(exp_per_hour * (input_inc_exp_get/100));
console.log("without buff = " + exp_per_hour * (exp_get_without_buff)/100);
console.log("with booster 1 = " + exp_per_hour * ((exp_get_without_buff + rate_exp_booster1)/100));
