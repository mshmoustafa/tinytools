const back = document.getElementById("navBack");

const screens = {
  home: document.getElementById("screenHome"),
  base64: document.getElementById("screenBase64"),
  timestamp: document.getElementById("screenTimestamp"),
  characterCount: document.getElementById("screenCharacterCount"),
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
  const encodeButton = document.getElementById("base64Encode");
  const decodeButton = document.getElementById("base64Decode");
  const copyButton = document.getElementById("base64Copy");
  const base64Input = document.getElementById("base64Input");
  const base64Output = document.getElementById("base64Output");

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
  const timestampInput = document.getElementById("timestampInput");
  const timestampConvertButton = document.getElementById("timestampConvert");
  const timestampOutput = document.getElementById("timestampOutput");

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
  const characterCountInput = document.getElementById("characterCountInput");
  const characterCountOutput = document.getElementById("characterCountOutput");
  const wordCountOutput = document.getElementById("wordCountOutput");
  const lineCountOutput = document.getElementById("lineCountOutput");
  const sizeCountOutput = document.getElementById("sizeCountOutput");

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