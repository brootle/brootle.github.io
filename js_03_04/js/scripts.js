var testPage = {
    addTittle: function(tittle){
        var pageTittle = document.createElement('h1');
        pageTittle.innerHTML = tittle;
        document.body.insertBefore(pageTittle, document.body.firstChild);
    },
    addQuestions: function (questionsText, numberOfQuesions, numberOfOptions, answerOption) {
        // create ordered list
        var orderedList = document.createElement('ol');
        document.body.insertBefore(orderedList, document.body.lastChild);
        // add items to ordered list
        for(var i = 1; i < numberOfQuesions + 1; i++)
        {
            // create ordered list item
            // add ordered list item to the list
            var orderedListItem = document.createElement('li');
            orderedListItem.innerHTML = questionsText + ' #' + i;
            orderedList.appendChild(orderedListItem);

            // add answer options
            for(var j = 1; j < numberOfOptions + 1; j++)
            {
                var newParagraph = document.createElement('p');

                var checkboxOption = document.createElement('input');
                checkboxOption.type = 'checkbox';
                checkboxOption.id = 'checkbox_' + i + j;

                newParagraph.appendChild(checkboxOption);

                var newLabel = document.createElement('label');
                newLabel.innerHTML = answerOption + ' #' + j;
                newLabel.htmlFor = checkboxOption.id;

                newParagraph.appendChild(newLabel);
                

                orderedListItem.appendChild(newParagraph);
            }
        }
    },
    addButton: function (buttonText) {
        var newButton = document.createElement('button');
        newButton.type = 'button';
        newButton.innerHTML = buttonText;
        document.body.insertBefore(newButton, document.body.lastChild);
    }
}

testPage.addTittle('Exam on programming');

testPage.addQuestions('Question', 3, 3, 'Answer variant');

testPage.addButton('Check my result');


