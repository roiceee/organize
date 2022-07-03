import {addProjectModalEvent} from './projectModal.js';

function createNavBar() {
    let nav = document.createElement('div');
    nav.classList.add('container');
    nav.innerHTML = `
    <nav class="navbar navbar-expand-sm text-light navbar-dark">
    <div class="container-fluid">
    <span class="navbar-brand mb-0 h1 mx-3">Organize™</span>
    ${createProjectsTab()}
    </div>
    </nav>
    `
    return nav;
}

function createProjectsTab() {
    let projectTab = 
    `
    <button class="navbar-toggler mx-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
  <div class="nav-item dropdown">
  <div class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Projects
  </div>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    <li>${addProjectModalEvent()}</li>
  </ul>
</div>
</div>
`
    return projectTab;
}

//missing add projects and load projects functionality

export default createNavBar();