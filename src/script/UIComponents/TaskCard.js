export default function createTaskCard(task) {
    const div = document.createElement("div");
    div.classList.add("card", "mx-auto", "mx-sm-0", "shadow", "gx-0", 'task-card', "col");
    div.setAttribute("data-task-number", `${task.index}`);
    div.style.width = "18rem";
    div.innerHTML = 
                    `<div class="card-body bg-secondary">
                      <h5 class="card-title mb-0" id="task-title">${task.title}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item" id="task-date">${task.date}</li>
                    </ul>
                    <div class="p-1 d-flex justify-content-end align-items-center gap-4">
                        <button type="button" data-delete="${task.index}" id="delete-button-${task.index}" class="delete-button float-end p-1 col-2">
                            <svg xmlns="http://www.w3.org/2000/svg" id="delete-icon" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>`
    
    return div;
}