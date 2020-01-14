import { Question } from './question';
import { getAuthForm, authWithEmailAndPassword } from './auth'
import { isValid, createModal } from './utils';
import './style.css';


const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');


window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(e) {
    e.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true;

        // Async request to server to save question
        Question.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        });

    }
}

function openModal() {
    createModal('Authorization', getAuthForm())
    document.getElementById('auth-form').addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(e) {
    e.preventDefault()

    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value

    authWithEmailAndPassword(email, password)
}

