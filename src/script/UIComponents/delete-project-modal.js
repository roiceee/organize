function deleteProjectModal() {
    return deleteProjectModalTemplate();
}

function deleteProjectModalTemplate() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="delete-project-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Delete Project</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
                <p>Do you want to delete the project? It can't be undone.</p>
                <div class="row text-center">
                <div class="col">
                <button type="button" class="btn btn-warning" id="delete-project-button">Delete</button>
                </div>
                <div class="col">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cancel</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>`
      container.innerHTML = template;
      return container;
}


export default deleteProjectModal;