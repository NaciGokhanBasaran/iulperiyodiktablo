import { elements } from "./elements.js";

class elementContainer {
  constructor(name, number, symbol, category) {
    this.name = name;
    this.number = number;
    this.symbol = symbol;
    this.category = category.startsWith("unknown")
      ? "unknown"
      : category.replace(/ /g, "-");
  }

  makeElementDiv() {
    const div = document.createElement("div");
    div.classList.add("elementDiv");
    div.classList.add(this.category);
    div.id = this.symbol;

    const number = document.createElement("div");
    number.classList.add("element-number");
    number.textContent = this.number;

    const symbol = document.createElement("div");
    symbol.classList.add("element-symbol");
    symbol.textContent = this.symbol;

    const name = document.createElement("div");
    name.classList.add("element-name");
    name.textContent = this.name;

    div.appendChild(number);
    div.appendChild(symbol);
    div.appendChild(name);

    div.onclick = toggleWikiBox.bind(this);

    const tableContainer = document.querySelector("#tableContainer");
    tableContainer.appendChild(div);
  }
}

function toggleWikiBox() {
  const wikiBoxVisible =
    document.querySelector("#wikiBox").style.display !== "none";

  if (wikiBoxVisible) {
    document.querySelector("#tableContainer").style.display = "grid";
    document.querySelector("#wikiBox").style.display = "none";
  } else {
    document.querySelector(
      "#wikiBox > iframe"
    ).src = `https://tr.wikipedia.org/wiki/${this.name}`; //eleent isilerini değiştir
    document.querySelector("#tableContainer").style.display = "none";
    document.querySelector("#wikiBox").style.display = "flex";
  }
}

for (const element of elements) {
  const container = new elementContainer(
    element.name,
    element.number,
    element.symbol,
    element.category
  );
  container.makeElementDiv();
}

document.querySelector("#closeBtn").onclick = toggleWikiBox;

//by Naci Gökhan Başaran
//80.elementte kaldın
