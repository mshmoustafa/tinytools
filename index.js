const navs = {
  base64: document.getElementById("navBase64"),
  back: document.getElementById("navBack"),
}

const screens = {
  main: document.getElementById("screenMain"),
  base64: document.getElementById("screenBase64"),
}

const base64Screen = {
  encodeButton: document.getElementById("base64Encode"),
    decodeButton: document.getElementById("base64Decode"),
    copyButton: document.getElementById("base64Copy"),
    base64Input: document.getElementById("base64Input"),
    base64Output: document.getElementById("base64Output"),
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
  if (window.location.hash === '#base64') {
    showScreen(screens.base64);
  } else if (window.location.hash === '#main') {
    showScreen(screens.main);
  } else {
    showScreen(screens.main);
  }

  if (window.location.hash !== "") {
    navs.back.classList.add("show")
  } else {
    navs.back.classList.remove("show")
  }
}

function setupBase64Screen() {
  base64Screen.encodeButton.onclick = (event) => {
    base64Output.value = btoa(base64Input.value);
  }
  base64Screen.decodeButton.onclick = (event) => {
    base64Output.value = atob(base64Input.value);
  }
  base64Screen.copyButton.onclick = (event) => {
    navigator.clipboard.writeText(base64Output.value);
  }
}

navigate();
setupBase64Screen();