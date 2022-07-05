export default (function localStorageController(){
    const data = window.localStorage.getItem("projects");
    const saveData = function(projects) {
        window.localStorage.setItem("projects", JSON.stringify(projects));
    }
    const getData = function() {
        return data;
    }
    return {
        saveData,
        getData
    }
})();