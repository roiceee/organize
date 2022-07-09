
function createProjectListContainer() {
    const nodeString = `
    <div class="container" id="list-container">
    <div></div>
    </div>`

return document.createRange().createContextualFragment(nodeString);
}

function createProjectListItem(project) {
   const element = `<div class="project-li card mx-auto mx-sm-0 gx-0 col p-2 bg-primary bg-opacity-50" data-project-li="${project.index}" id="project-li-${project.index}"><h3>${project.name.length > 20 ? project.name.substring(0,18) + "..." : project.name}</h3></div>`
   return document.createRange().createContextualFragment(element);
}

function createProjectButton() {
    const DOMString = `
    <button class="add-button add-button-project rounded-25 p-2 text-white" data-bs-toggle="modal" data-bs-target="#add-project-modal" id="add-project-modal-button">
          New Project
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    `
    return document.createRange().createContextualFragment(DOMString);
}
export {createProjectListContainer, createProjectListItem, createProjectButton};
