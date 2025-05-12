const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const second = document.querySelector(".second");
const meridiem = document.querySelector(".meridiem");

setInterval(() => {
  const date = new Date();
  const rawHour = date.getHours();
  const h = rawHour % 12 || 12;
  const m = date.getMinutes();
  const s = date.getSeconds();
  const med = rawHour >= 12 ? 'PM' : 'AM';

  hours.innerHTML = h.toString().padStart(2, '0');
  minutes.innerHTML = m.toString().padStart(2, '0');
  second.innerHTML = s.toString().padStart(2, '0');
  meridiem.innerHTML = med;
}, 1000);
