function createEditProjectModal() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="edit-project-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Edit Project</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
                <form id="project-form">
                    <div class="mb-3">
                        <input type="text" maxlength="40" class="form-control" id="edit-project" aria-describedby="Input Title" placeholder="Project Name">
                    </div>
                    <button type="button" id="edit-project-button" class="btn btn-success float-end" data-bs-dismiss="modal">Update</button>
                  </form>
            </div>
          </div>
        </div>
      </div>`
      container.innerHTML = template;
      return container;
}

export {createEditProjectModal};