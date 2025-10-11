const day=document.getElementById("day");
const date=document.getElementById("date");
const month=document.getElementById("month");
const year=document.getElementById("year");

const dateTime=new Date();

date.innerHTML=dateTime.getDate();
day.innerHTML=dateTime.toLocaleString('en-US', {weekday: 'long'})
year.innerHTML=dateTime.getFullYear()
month.innerHTML=dateTime.toLocaleString('en-US', { month: 'long' });
