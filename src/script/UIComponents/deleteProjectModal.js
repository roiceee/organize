function deleteProjectModal() {
    const container = document.createElement('div');
    const template = `
    <div class="modal fade" tabindex="-1" id="delete-project-modal">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-light">Delete Project</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black text-center">
                <p>Do you want to delete the project? It can't be undone.</p>
                <div class="row">
                <div class="col d-flex justify-content-end">
                <button type="button" class="btn btn-warning w-50" data-bs-dismiss="modal" id="delete-project-button">Delete</button>
                </div>
                <div class="col d-flex">
                <button type="button" class="btn btn-success w-50" data-bs-dismiss="modal">Cancel</button>
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