function validateRequiredInput(formElement: React.RefObject<HTMLInputElement>, errorTextElementID: string): boolean {
    const element : HTMLInputElement | null = formElement.current;
    const errorTextElement: HTMLDivElement | null = document.querySelector(`#${errorTextElementID}`);

    if (element!.value.trim() === "") {
        element!.classList.add("invalid");
        errorTextElement!.textContent = "This field is required.";
        return false;
    }

    return true;
}

function removeErrorFields(formElement: React.RefObject<HTMLInputElement>, errorTextElementID: string) {
    const element : HTMLInputElement | null = formElement.current;
    const errorTextElement: HTMLDivElement | null = document.querySelector(`#${errorTextElementID}`);
    if (element!.classList.contains("invalid")) {
        element!.classList.remove("invalid");
    }
    errorTextElement!.textContent = "";
}


export {validateRequiredInput, removeErrorFields}