const id = (id) => document.getElementById(id);
const back = id("navBack");

const screens = {
  home: id("screenHome"),
  base64: id("screenBase64"),
  timestamp: id("screenTimestamp"),
  characterCount: id("screenCharacterCount"),
  findReplace: id("screenFindReplace"),
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
  characterCountInput.onkeyup = count;
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

    const split = original.value.split(findString.value);

    highlightMatches(split, findString.value, result);

    metrics.innerText = `Found ${split.length - 1} match(es)`;
  }

  replaceButton.onclick = () => {
    // debugger;
    result.innerHTML = "";
    metrics.innerHTML = "";

    const replaced = original.value.split(findString.value).join(replaceWith.value);

    highlightMatches(replaced.split(replaceWith.value), replaceWith.value, result);

    metrics.innerText = `Replaced ${original.value.split(findString.value).length - 1} match(es)`;
  }

  copy.onclick = () => {
    navigator.clipboard.writeText(result.innerText);
  }

  original.value = "Hello";
  findString.value = "l";
  replaceWith.value = "x";
}

setupBase64Screen();
setupTimestampScreen();
setupCharacterCountScreen();
setupFindReplaceScreen();
navigate();