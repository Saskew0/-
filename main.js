const questions = [
	{
		question: "Кто считается королём рок-н-ролла?",
		answers: ["Элвис Пресли", " Майкл Джексон", "Фредди Меркьюр", "Джон Леннон"],
		correct: 1,
	},
	{
		question: "Как называется музыкальный ключ, который обычно используется для записи партии правой руки на фортепиано?",
		answers: [
			"Басовый ключ",
			"Скрипичный ключ",
			"Альтовый ключ",
			"Теноровый ключ",
		],
		correct: 2,
	},
	{
		question: "Какая группа записала альбом The Dark Side of the Moon",
		answers: [
			"Queen",
			"Pink Floyd",
			"The Beatles",
			"Led Zeppelin",
		],
		correct: 2,
	},
	{
		question: "Сколько полутонов в октаве в классической западной музыке?",
		answers: ["6", "8", "10", "12"],
		correct: 4,
	},
];

// находим элементы 
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

//переменные игры
let score = 0; // количество правильных ответов
let questionIndex = 0; // вопрос текущий

submitBtn.onclick = checkAnswer;
clearpage();
showQuestion();



function clearpage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = ''
}

function showQuestion(){

    // вопрос

	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;

    //варианты ответа
	let answerNumber = 1;
    for (	answerText of questions[questionIndex]['answers']){ 

		const questionTemplate = 
		`<li>
				<label>
					<input value=%number% type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate


		                        .replace('%answer%', answerText)
		                        .replace('%number%', answerNumber)


		listContainer.innerHTML += answerHTML;
		answerNumber++;

    } 

}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

    // находим радио кнопку

    if (!checkedRadio){
		submitBtn.blur();
        return


	} 

	// узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)

	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	}
	console.log('score = ', score)

	if (questionIndex !== questions.length - 1){
    questionIndex++;
	clearpage();
	showQuestion();
	}

	else {

		clearpage();
		showResults();
	}
    



}


function showResults (){
	console.log('showres');
	console.log(score);
    const resultsTemplate = `
            <h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>`;


	let title, message;

	//Варианты заголовков и текста

	if(score == questions.length){
		title = 'Поздравляем';
		message = 'Вы ответили верно на все вопросы!';

	} else if ((score * 100) / questions.length >= 50) {

	    title = 'Неплохой результат!';
		message = 'Вы дали более половины правильных ответов';

	} else {

	    title = 'Стоит постараться';
		message = 'Пока у вас меньше половины правильных ответов';

    }


    //результат
    let result = `${score} из ${questions.length}`;


    //финальный ответ,подставляем в данный шаблон
	const finalMessage = resultsTemplate
	                        .replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result)
    
	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново'
	submitBtn.onclick = ()=>{history.go()};		
}