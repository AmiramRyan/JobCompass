# JobCompass

JobCompass is a personal project that I developed to solve a problem I encountered while job hunting.
As a developer, I needed a smart and organized way to track my job applications, deadlines, and statuses and after trying several methods, I realized there wasn't a simple and effective tool tailored to my needs, so I decided to create one myself.

JobCompass is a job search and application tracker that helps users to organize, filter, and save job opportunities in one place. The app is built with a React frontend and a Node.js backend.

## Features

- **Job Application Tracking**: Easily track the status of job applications.
- **Job Search**: Quickly filter and find applications based on criteria.
- **Secure Authentication**: Sign up, log in, and access your personalized dashboard.
- **Responsive Design**: Designed to work across all devices, thanks to Bootstrap.

## Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB (or other)

## API Endpoints

| Method | Endpoint              | Description                                         |
|--------|-----------------------|-----------------------------------------------------|
| GET    | `/api/jobs`            | Get a list of all job applications                  |
| GET    | `/api/jobs/:id`        | Get a specific job application by its ID            |
| POST   | `/api/jobs`            | Create a new job application                        |
| PUT    | `/api/jobs/:id`        | Update an existing job application                  |
| DELETE | `/api/jobs/:id`        | Delete a job application                            |
| POST   | `/api/auth/login`      | Log in to the application                           |
| POST   | `/api/auth/signup`     | Register a new user                                 |


### Clone the repository

```bash
git clone https://github.com/AmiramRyan/jobcompass.git
cd jobcompass