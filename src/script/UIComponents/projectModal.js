
function createProjectModal() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="add-project-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Add Project</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
                <form id="project-form">
                    <div class="mb-3">
                        <input type="text" maxlength="30" class="form-control" id="add-project" aria-describedby="Input Title" placeholder="Project Name">
                    </div>
                    <button type="button" id="add-project-button" class="btn btn-success float-end" data-bs-dismiss="modal">Add</button>
                  </form>
            </div>
          </div>
        </div>
      </div>`
      container.innerHTML = template;
      return container;
}

function addProjectModalEvent() {
    const element = `
    <span class="dropdown-item" id="add-project-div" data-project="" data-bs-toggle="modal" data-bs-target="#add-project-modal"><i>Add New Project</i></span>
    `
    return element;
}

export {createProjectModal, addProjectModalEvent};