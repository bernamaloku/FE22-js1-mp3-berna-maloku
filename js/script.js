const mainUrl = "https://restcountries.com/v3.1/";
const contentElement = document.getElementById("content-container");
const formElement = document.getElementById("form");
const clear = document.querySelector("input");

function extractData(item) {
  return {
    name: item.name.common,
    subregion: item.subregion,
    capital: item.capital,
    population: item.population,
    flag: item.flags.png,
  };
}

async function searchByLang(text) {
  const response = await fetch(mainUrl + "lang/" + text + "?fullText=false", {
    method: "GET",
  });

  const data = await response.json();

  const theMapedData = data.map(extractData);
  return theMapedData;
}

function sortItems(itemA, itemB) {
  if (itemA.population < itemB.population) {
    return 1;
  } else if (itemA.population > itemB.population) {
    return -1;
  } else {
    return 0;
  }
}

function itemToHtmlStr(item) {
  return `
    <div class="item">
        <p class="name">
            <span class = "title">Land</span>: ${item.name}
        </p>
        <p class="subregion">
            <span class = "title">Subregion</span>: ${item.subregion}
        </p>
        <p class="capital">
        <span class = "title">Huvudstad</span>: ${item.capital}
        </p>
        <p class="population">
        <span class = "title">Befolkning</span>: ${item.population}
        </p>
        <p class="flag">
        <span class = "title">Flagga:</span><img src="${item.flag}"> 
        </p>
    </div>
    `;
}

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = event.target[0].value;

  try {
    const data = await searchByLang(value);
    contentElement.innerHTML = data.sort(sortItems).map(itemToHtmlStr).join("");
  } catch {
    contentElement.innerHTML = `
                    <div class="error">
                        No languages found
                    </div>
                `;
  }
});

clear.addEventListener("click", () => {
  clear.value = "";
});
