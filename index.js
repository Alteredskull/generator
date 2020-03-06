const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

inquirer
 .prompt([
    {
        type: "input",
        name: "username",
        message: "Gimmie your GitHub username!",
    },
    {
        type: "input",
        name: "title",
        message: "I want your project title!",
    },
    {
        type: "input",
        name: "description",
        message: "Provide a project description and give it your best shot!:",
    },
    {
        type: "input",
        name: "installation",
        message: "Provide instructions on how to install the application in latin >:) :",
    },
    {
        type: "input",
        name: "usage",
        message: "What's this even used for?",
    },
    {
        type: "list",
        name: "license",
        message: "Which license will be used, young lad?",
        choices: [
            'Apache',
            'MIT',
            'GNU',
            'ISC'
        ]
    },
    {
        type: "input",
        name: "contributor",
        message: "Who actually helped you?",
    },
    {
        type: "input",
        name: "test",
        message: "List each and every step for testing!",
    },
        {type: "input",
        name: "questions",
        message: "One too many questions?",
    },
])

.then (function(answer) {
    const queryUrl = `https://api.github.com/users/${answer.username}`
    axios.get(queryUrl).then(function(res){

        console.log(res);

    const readMe =`![license badge](https://img.shields.io/badge/license-${encodeURI(answer.projectLicense)}-blueviolet?style=flat-square&logo=appveyor)
    ![forthebadge](https://forthebadge.com/images/badges/designed-in-etch-a-sketch.svg)
# ${answer.title}
# ${answer.description}
## Table of Contents
\n* [Installation](#Installation)
\n* [Usage](#Usage)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Testing](#Testing)
\n* [Questions](#Questions)

## Installation
# ${answer.installation}
        
## Usage
# ${answer.usage}
        
## License
# ${answer.license}
     
## Contributors
# ${answer.contributor}

## Testing
# ${answer.test}

## Questions
# ${answer.question}

## Please submit your questions to:
# ![${res.data.html_url}](${res.data.avatar_url})
        `
    
    fs.writeFile("README.md", readMe, function(){
    });
    console.log("You actually did it! Enjoy your new README.md file!");
    })
});