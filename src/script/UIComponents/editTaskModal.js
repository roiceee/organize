function editTaskModalTemplate() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="edit-task-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Edit Task</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
                <form id="task-form">
                    <div class="mb-3">
                    <label for="edit-title">Title</label>
                        <input type="text" maxlength="40" class="form-control" id="edit-title" aria-describedby="Input Title" placeholder="Task Name">
                    </div>
                    <div class="mb-3 col-6">
                        <label for="edit-date">Deadline (Optional)</label>
                        <input type="date" class="form-control" id="edit-date" aria-describedby="Input Date">
                    </div>
                    <button type="button" id="edit-task-button" class="btn btn-success float-end" data-bs-dismiss="modal">Update</button>
                  </form>
            </div>
          </div>
        </div>
      </div>`
      container.innerHTML = template;
      return container;
}

export function createEditTaskModal() {
    return editTaskModalTemplate();
}