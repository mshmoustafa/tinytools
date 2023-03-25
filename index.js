const id = (id) => document.getElementById(id);
const back = id("navBack");

const screens = {
  home: id("screenHome"),
  base64: id("screenBase64"),
  timestamp: id("screenTimestamp"),
  characterCount: id("screenCharacterCount"),
  findReplace: id("screenFindReplace"),
  jsonFormat: id("screenJsonFormat"),
  csvParse: id("screenCsvParse"),
  urlEncoderDecoder: id("screenDateCalculator"),
  dateCalculator: id("screenUrlEncoderDecoder"),
  colorPicker: id("screenColorPicker"),
}

function showScreen(screenToShow) {
  const screens = document.getElementsByClassName("screen");
  for (let screen of screens) {
    screen.classList.add("hidden");
  }
  screenToShow.classList.remove("hidden");
}

window.addEventListener("hashchange", () => {
  navigate();
});

function navigate() {
  const hash = window.location.hash;
  if (hash === null || hash === "") {
    showScreen(screens.home);
    back.classList.remove("show")
  } else {
    const screen = hash.substring(1);
    showScreen(screens[screen]);
    back.classList.add("show")
  }
}

function setupBase64Screen() {
  const encodeButton = id("base64Encode");
  const decodeButton = id("base64Decode");
  const copyButton = id("base64Copy");
  const base64Input = id("base64Input");
  const base64Output = id("base64Output");

  encodeButton.onclick = () => {
    base64Output.value = btoa(base64Input.value);
  }
  decodeButton.onclick = () => {
    base64Output.value = atob(base64Input.value);
  }
  copyButton.onclick = () => {
    navigator.clipboard.writeText(base64Output.value);
  }
}

function setupTimestampScreen() {
  const timestampInput = id("timestampInput");
  const timestampConvertButton = id("timestampConvert");
  const timestampOutput = id("timestampOutput");

  timestampInput.value = new Date().getTime();

  timestampConvertButton.onclick = () => {
    const timestamp = Number(timestampInput.value);
    let date;
    if (timestamp > 1000000000000000) {
      date = new Date(timestamp / 1000);
    } else {
      date = new Date(timestamp);
    }

    timestampOutput.innerText = date.toLocaleString();
  }
}

function setupCharacterCountScreen() {
  const characterCountInput = id("characterCountInput");
  const characterCountOutput = id("characterCountOutput");
  const wordCountOutput = id("wordCountOutput");
  const lineCountOutput = id("lineCountOutput");
  const sizeCountOutput = id("sizeCountOutput");

  const count = () => {
    const input = characterCountInput.value;
    if (input === "") {
      characterCountOutput.innerText = `0 character(s)`;
      wordCountOutput.innerText = `0 word(s)`;
      lineCountOutput.innerText = `0 line(s)`;
      sizeCountOutput.innerText = `0 byte(s)`;
      return;
    } else {
      characterCountOutput.innerText = `${input.length} character(s)`;
      wordCountOutput.innerText = `${input.split(" ").length} word(s)`;
      lineCountOutput.innerText = `${input.split("\n").length} line(s)`;
      sizeCountOutput.innerText = `${(new TextEncoder().encode(input)).length} byte(s)`;
    }
  };
  characterCountInput.oninput = count;
  count();
}

function setupFindReplaceScreen() {
  const original = id("findReplaceOriginal");
  const findString = id("findReplaceFind");
  const replaceWith = id("findReplaceReplace");
  const findButton = id("findReplaceFindButton");
  const replaceButton = id("findReplaceReplaceButton");
  const result = id("findReplaceResult");
  const metrics = id("findReplaceMetrics");
  const copy = id("findReplaceCopyButton");

  const highlightMatches = (list, find, element) => {
    for (let i = 0; i < list.length; i++) {
      const str = list[i];
      const el = document.createElement("span");
      el.innerText = str;
      element.appendChild(el);
      if (i >= list.length - 1) break;
      const match = document.createElement("span");
      match.classList.add("match");
      match.innerText = find;
      element.appendChild(match);
    }
  }

  findButton.onclick = () => {
    result.innerHTML = "";
    metrics.innerHTML = "";

    if (findString.value === "") {
      metrics.innerText = `Found 0 match(es)`;
      result.innerText = original.value;
      return;
    }

    const split = original.value.split(findString.value);

    highlightMatches(split, findString.value, result);

    metrics.innerText = `Found ${split.length - 1} match(es)`;
  }

  replaceButton.onclick = () => {
    result.innerHTML = "";
    metrics.innerHTML = "";

    if (findString.value === "") {
      metrics.innerText = `Replaced 0 match(es)`;
      result.innerText = original.value;
      return;
    }

    const replaced = original.value.split(findString.value).join(replaceWith.value);

    highlightMatches(original.value.split(findString.value), replaceWith.value, result);

    metrics.innerText = `Replaced ${original.value.split(findString.value).length - 1} match(es)`;
  }

  copy.onclick = () => {
    navigator.clipboard.writeText(result.innerText);
  }
}

function setupJsonFormatScreen() {
  const jsonInput = id("jsonInput");
  const jsonFormatButton = id("jsonFormatButton");
  const formattedJson = id("formattedJson");
  const jsonFormatCopyButton = id("jsonFormatCopyButton");

  jsonFormatButton.onclick = () => {
    formattedJson.innerText = JSON.stringify(
      JSON.parse(jsonInput.value),
      null,
      "    "
    );
  }

  jsonFormatCopyButton.onclick = () => {
    navigator.clipboard.writeText(formattedJson.innerText);
  }
}

function setupCsvParseScreen() {
  const csvInput = id("csvInput");
  const csvParseButton = id("csvParseButton");
  const parsedCsvTable = id("parsedCsvTable");

  csvParseButton.onclick = () => {
    const csv = csvInput.value;
    const parsedCsv = parseCSV(csv, ",");

    const table = document.createElement("table");
    for (let row of parsedCsv) {
      const tr = document.createElement("tr");
      for (let column of row) {
        const td = document.createElement("td");
        td.innerText = column;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    parsedCsvTable.innerHTML = null;
    parsedCsvTable.appendChild(table);
  }
}

function setupUrlEncoderDecoderScreen() {
  // TODO
  return;
}

function setupDateCalculatorScreen() {
  // TODO
  return;
}

function setupColorPickerScreen() {
  // TODO
  return;
}

setupBase64Screen();
setupTimestampScreen();
setupCharacterCountScreen();
setupFindReplaceScreen();
setupJsonFormatScreen();
setupCsvParseScreen();
setupUrlEncoderDecoderScreen();
setupColorPickerScreen();
navigate();