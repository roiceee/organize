function createTaskModal() {
    return modalTemplate();
}

function modalTemplate() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="add-task-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Add Task</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
                <form onkeydown="return event.key != 'Enter';" id="task-form">
                    <div class="mb-3">
                    <label for="add-task">Title</label>
                        <input type="text" class="form-control" id="add-title" aria-describedby="Input Title" placeholder="Task Name">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="add-date">Deadline</label>
                        <input type="date" class="form-control" id="add-date" aria-describedby="Input Date">
                    </div>
                    <button type="button" id="submit-task-button" class="btn btn-success float-end" data-bs-dismiss="modal">Add</button>
                  </form>
            </div>
          </div>
        </div>
      </div>`
      container.innerHTML = template;
      return container;
}

function noProjectWarning(message) {
  const DOMString = `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Can't add task!</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="no-project-warning-button"></button>
</div>
  `
  return document.createRange().createContextualFragment(DOMString);
}

function addTaskModalButton() {
    const DOMString = `
    <button class="add-button rounded-25 p-2 position-fixed end-0 bottom-0 mx-5 mb-5" data-bs-toggle="modal" data-bs-target="#add-task-modal" id="task-modal">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    `
    return document.createRange().createContextualFragment(DOMString);
}

export {createTaskModal, addTaskModalButton, noProjectWarning};