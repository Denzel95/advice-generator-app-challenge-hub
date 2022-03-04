const btn = document.querySelector(".btn");
const paragraph = document.querySelector(".advice-paragraph");
const h1Id = document.querySelector(".advice-id");

const getAdvice = async function () {
  const res = await fetch(" 	https://api.adviceslip.com/advice");
  const data = await res.json();
  return data;
};

const renderData = async function () {
  const data = await getAdvice();
  if (!data) return console.log("Erorr");
  paragraph.innerHTML = data.slip.advice;

  h1Id.innerHTML = `Advice #${data.slip.id}`;
};

btn.addEventListener("click", renderData);
renderData();
