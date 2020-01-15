export class Question {
    static create(question) {
        return fetch('https://js-auth-app-19856.firebaseio.com/questions.json',
            {
                method: 'POST',
                body: JSON.stringify(question),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class="error">Token is not exist</p>`)
        }
        return fetch(`https://js-auth-app-19856.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static renderList() {
        const allQuestions = getQuestionsFromStorage()

        const html = allQuestions.length
            ? allQuestions.map(toCard).join('')
            : `<div class="mui--text-headline">There are no questions</div>`

        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>No questions</p>`
    }

}

function addToLocalStorage(question) {
    const allQuestions = getQuestionsFromStorage()
    allQuestions.push(question)
    localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getQuestionsFromStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `<div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>
     ${question.text}
    </div>
    <br>`
}
