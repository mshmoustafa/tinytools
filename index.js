const navs = {
  base64: document.getElementById("navBase64"),
  back: document.getElementById("navBack"),
}

const screens = {
  main: document.getElementById("screenMain"),
  base64: document.getElementById("screenBase64"),
  timestamp: document.getElementById("screenTimestamp"),
}

function showScreen(screenToShow) {
  const screens = document.getElementsByClassName("screen");
  for (let screen of screens) {
    screen.classList.remove("visible");
  }
  screenToShow.classList.add("visible");
}

window.addEventListener("hashchange", () => {
  navigate();
});

function navigate() {
  const hash = window.location.hash;
  if (hash === null || hash === "") {
    showScreen(screens.main);
    navs.back.classList.remove("show")
  } else {
    const screen = hash.substring(1);
    showScreen(screens[screen]);
    navs.back.classList.add("show")
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
    // debugger;
    if (timestamp > 1000000000000000) {
      date = new Date(timestamp / 1000);
    } else {
      date = new Date(timestamp);
    }

    timestampOutput.innerText = date.toLocaleString();
  }
}

navigate();
setupBase64Screen();
setupTimestampScreen();