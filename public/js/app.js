const weatherForm = document.querySelector("form");
const success = document.querySelector(".success");
const error = document.querySelector(".error");
error.textContent = "";
success.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = weatherForm.querySelector(".location").value;
  const apiUrl = window.location.origin + "/weather?address=" + search;
  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        error.textContent = data.error;
        success.textContent = "";
      } else {
        success.textContent = data.forecast;
        error.textContent = "";
      }
      console.log(search);
    });
  });
});
