const inquirer = require('inquirer');
const fs = require('fs')

module.exports = {
    askProfileCredentials: () => {
        const questions = [
        {
            name: 'firstname',
            type: 'input',
            message: 'Enter your Firstname: ',
            validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your Firstname: ';
            }
            }
        },
        {
            name: 'lastname',
            type: 'input',
            message: 'Enter your Lastname: ',
            validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your Lastname: ';
            }
            }
        },
        {
            name: 'birthmonth',
            type: 'input',
            message: 'Enter the Month you were born in: ',
            validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Enter the Month you were born in: ';
            }
            }
        },
        {
            name: 'birthdate',
            type: 'input',
            message: 'Enter the Date you were born on: ',
            validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Enter the Date you were born on: ';
            }
            }
        },
        {
            name: 'birthyear',
            type: 'input',
            message: 'Enter the Year you were born in: ',
            validate: function( value ) {
            if (value.length) {
                return true;
            } else {
                return 'Please Enter the Year you were born in: ';
            }
            }
        },
        {
            name: 'zipcode',
            type: 'input',
            message: 'Enter your Zipcode: ',
            validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Enter your Zipcode: ';
            }
            }
        },
        {
            name: 'email',
            type: 'input',
            message: 'Enter your Email: ',
            validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your Email: ';
            }
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your Password: ',
            validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your Password: ';
            }
            }
        },
        {
            name: 'telephone',
            type: 'input',
            message: 'Enter your Telephone number:  ',
            validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your Telephone number:  ';
            }
            }
        },
        ];
        return inquirer.prompt(questions);
    },
};