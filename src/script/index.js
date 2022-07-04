import startAppLogic from "./applogic.js";
import '/src/css/styles.css';
import '/src/css/override.css';
import '/src/script/bootstrap.min';
import logo from '/src/images/organize-icon.png';

function addIcon() {
    const head = document.head;
    head.appendChild(document.createRange().createContextualFragment(`<link rel="shortcut icon" href="${logo}" type="image/x-icon">`));
}

startAppLogic();
addIcon();