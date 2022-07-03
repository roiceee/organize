import createNavBar from "./UIComponents/navbar.js";
import {createModal as loadAddProjectModal} from './UIComponents/addProjectModal.js';

function loadNav() {
    const navContainer = document.getElementById('nav-container');
    navContainer.appendChild(createNavBar);
}

function loadModalsToDOM() {
    const DOMBody = document.body;
    DOMBody.appendChild(loadAddProjectModal());
}












//Execution Area
//___________________________________________________________________________________________________________

loadNav();
loadModalsToDOM();