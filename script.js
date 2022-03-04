const btn = document.querySelector(".btn");
const btnShow = document.querySelector(".btn-divider");
const paragraph = document.querySelector(".advice-paragraph");
const h1Id = document.querySelector(".advice-id");
const form = document.querySelector(".form-id");
const input = document.querySelector(".input-id");

const API_URL = "https://api.adviceslip.com/advice";

/**
 *
 * @param {boolean} [state]
 * @param {number} id
 * @returns This function fetch data then returns a object
 */
const getAdvice = async function (state = true, id) {
  try {
    let res;
    if (state)
      res = await fetch(API_URL, {
        cache: "no-cache",
      });
    else
      res = await fetch(`${API_URL}/${id}`, {
        cache: "no-cache",
      });

    const data = await res.json();
    if (!data) throw new Error("No data");
    return data;
  } catch (error) {
    console.error(error);
    h1Id.innerHTML = "Error";
    paragraph.innerHTML = error.message;
  }
};

const renderData = async function (state = true, id) {
  let data;
  try {
    if (state) data = await getAdvice();
    else data = await getAdvice(false, id);

    console.log(data);
    paragraph.innerHTML = data.slip.advice;
    h1Id.innerHTML = `Advice #${data.slip.id}`;
  } catch (error) {
    console.log(error);
    h1Id.style.color = "red";
    h1Id.innerHTML = "Max number of advices for now is 224";
    setTimeout(function () {
      window.location.reload();
    }, 3000);
  }
};

const toogleForm = function () {
  form.classList.toggle("hidden");
};

btnShow.addEventListener("click", function () {
  toogleForm();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = input.value;
  input.value = "";
  renderData(false, id);
  toogleForm();
});

// const requestAdviceById = async function (id) {};

btn.addEventListener("click", renderData);
// init
renderData();
