const formBuilder = document.getElementById('form-builder');
const formFiller = document.getElementById('form-filler');
const saveButton = document.getElementById('save-button');
const submitResponseButton = document.getElementById('submit-response-button');

// Store the form data in a variable
let formData = [];

saveButton.addEventListener('click', () => {
  // Store the form data in the formData array
  const questions = formBuilder.querySelectorAll('.question');
  formData = Array.from(questions).map((question) => {
    const questionText = question.querySelector('input[name*="_question"]').value;
    const questionType = question.querySelector('input[type="radio"]:checked')
                        ? 'multiple-choice'
                        : question.querySelector('input[type="checkbox"]')
                        ? 'checkbox'
                        : 'text-input';
    return { questionText, questionType };
  });

  // Hide the form builder and show the form filler
  formBuilder.style.display = 'none';
  formFiller.style.display = 'block';

  // Display the questions for filling in the form filler
  const filledForm = document.getElementById('filled-form');
  filledForm.innerHTML = '';
  formData.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `<label>${question.questionText}</label>`;
    
    if (question.questionType === 'multiple-choice') {
      questionElement.innerHTML += `<input type="radio" name="response${index}" value="Option 1"> Option 1
                                    <input type="radio" name="response${index}" value="Option 2"> Option 2
                                    <input type="radio" name="response${index}" value="Option 3"> Option 3`;
    } else if (question.questionType === 'checkbox') {
      questionElement.innerHTML += `<input type="checkbox" name="response${index}[]" value="Option 1"> Option 1
                                    <input type="checkbox" name="response${index}[]" value="Option 2"> Option 2
                                    <input type="checkbox" name="response${index}[]" value="Option 3"> Option 3`;
    } else {
      questionElement.innerHTML += `<input type="text" name="response${index}" placeholder="Answer">`;
    }
    
    filledForm.appendChild(questionElement);
  });
});

submitResponseButton.addEventListener('click', () => {
  // Collect the responses and save them
  const responses = formData.map((question, index) => {
    if (question.questionType === 'multiple-choice' || question.questionType === 'checkbox') {
      return Array.from(document.getElementsByName(`response${index}`))
        .filter((input) => input.checked)
        .map((input) => input.value);
    } else {
      return document.getElementsByName(`response${index}`)[0].value;
    }
  });

  // For this example, we're just displaying the responses in the console
  console.log('Responses:', responses);

  // You can send the responses to your server for saving in a real-world scenario
});
