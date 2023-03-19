const id = (id) => document.getElementById(id);
const back = id("navBack");

const screens = {
  home: id("screenHome"),
  base64: id("screenBase64"),
  timestamp: id("screenTimestamp"),
  characterCount: id("screenCharacterCount"),
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

setupBase64Screen();
setupTimestampScreen();
setupCharacterCountScreen();
navigate();