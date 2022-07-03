const ProjectHolder = (() => {
    let projects = [];
    const addProject = function(project) {
        projects.push(project);
    }
    const deleteProject = function(index) {
        projects.splice(index,1);
    }
    return {
        addProject,
        deleteProject
    }
})();


export default ProjectHolder;