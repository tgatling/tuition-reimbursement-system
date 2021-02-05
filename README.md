# Tuition Reimbursement Management System
This tuition reimbursement system will help to manage a company's tuition 
reimbursement program. It allows employees to apply for reimbursement for 
particular events that will aid them in their careers. These events include 
university courses, seminars, certifications preparation classes, certifications, 
and technical training. After submitting a reimbursement form and supporting 
documents, the form is ready for review.   Only users with roles of Supervisor, 
department head, or benefits coordinator can review the form. If the reimbursement 
is approved in all stages, the employee must submit evidence of completion with a 
passing grade or presentation. After this, the reimbursement is granted or denied.


## Technologies Used
* DynamoDB
* Express.js - version 4.16.1
* React - version 17.0.1
* TypeScript - version 4.1.3

## Features
Current Features:
* Application submissions for reimbursement
* Management of application process
* Communication through message system

Future Development:
* Viewing submissions of supporting documentation and presentations
* Notifications for updates in application process

## Getting Started
Cloning the respository:
https://github.com/tgatling/tuition-reimbursement-system.git

Back-end Commands:
* cd projectOne/tuition-reimbursement-system/tuitiontlg
* npm install
* aws configure <-- configure AWS CLI
* npm run setup <-- create tables in DynamoDB
* npm run start <-- run program

Front-end Commands:
* cd projectOne/tuition-reimbursement-system/tuitiontlg-frontend
* npm install
* npm run start

