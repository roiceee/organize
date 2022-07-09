export default function createTaskCard(task) {
    const div = document.createElement("div");
    div.classList.add("card", "mx-auto", "mx-sm-0", "shadow", "gx-0", 'task-card', "col");
    div.setAttribute("data-task-number", `${task.index}`);
    div.style.width = "18rem";
    div.innerHTML = 
                    `<div class="card-body bg-secondary position-relative ${task.checked ? 'done' : ""}" id="task-title-${task.index}">
                    <div class="row">
                      <h5 class="card-title mb-0 col" >${task.title}</h5>
                      <div class="edit-div position-absolute my-3 translate-middle"><svg class="edit-button" id="edit-${task.index}" data-bs-toggle="modal" data-bs-target="#edit-task-modal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                      </div>
                    </div>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item" id="task-date">${task.date}</li>
                    </ul>
                    <div class="p-1 d-flex justify-content-between align-items-center gap-4">
                    <div class="form-check mx-3">
                    <input class="form-check-input" type="checkbox" value="" id="checkbox-${task.index}" ${task.checked == true ? 'checked' : ""}>
                    <label class="form-check-label" for="flexCheckDefault">
                   Done
                    </label>
                    </div>
                        <button type="button" data-delete="${task.index}" id="delete-button-${task.index}" class="delete-button float-end p-1 col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" id="delete-icon" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>`
    
    return div;
}
