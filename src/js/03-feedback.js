import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form  textarea'),
};

refs.form.addEventListener('input', throttle(storageFormData, 500));
refs.form.addEventListener('submit', onFormSubmit);

reloadPage();

function storageFormData(e) {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log(savedData);

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
}

function reloadPage() {
      const savedValues = localStorage.getItem(STORAGE_KEY);

    if (savedValues) {
        formData = JSON.parse(savedValues);
        console.log(formData);
        refs.input.value = formData.email;
        refs.textarea.value = formData.message;
    }
}
