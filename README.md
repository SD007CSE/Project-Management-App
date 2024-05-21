# Project Management App

Welcome to the Project Management App repository! This application is designed to streamline the management and tracking of projects within an organization, providing tailored access and functionalities for Admins, Employees, and Users.

## Key Features

1. **Authentication and Authorization**:
   - **Admins**: Full access including login, registration, and administrative controls.
   - **Employees**: Login and access to project details relevant to their roles.
   - **Users**: Basic access to the home page and project information.

2. **Project Management for Admins**:
   - Add and delete projects.
   - Assign projects to employees.
   - Comprehensive project control and oversight.

3. **Project Access for Employees**:
   - View projects assigned to them.
   - Access detailed project information and updates.

4. **User Access**:
   - View the home page.
   - Access project information available to all users, ensuring transparency and engagement.

## Tech Stack
- **Frontend**: Next.js, React.js, CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: Firebase
- **Password Hashing**: bcrypt
- **Programming Language**: JavaScript

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/SD007CSE/Project-Management-App.git]
   cd project-management-app
2. **Add the .env file**:

- <img width="1123" alt="Screenshot 2024-05-19 at 4 58 36 PM" src="https://github.com/SD007CSE/Project-Management-App/assets/88923088/65eb43f0-f878-4540-8617-2546023e46ae">


3. **Add the configuration file for Firebase for Database access**:
- Add user and projects as collection.
   - <img width="1170" alt="Screenshot 2024-05-19 at 5 10 36 PM" src="https://github.com/SD007CSE/Project-Management-App/assets/88923088/ea2a09d0-0448-4005-9056-67969a1a1dd4">
   - <img width="1164" alt="Screenshot 2024-05-19 at 5 11 08 PM" src="https://github.com/SD007CSE/Project-Management-App/assets/88923088/dffb2768-c106-461a-8e84-55d4fa59faf2">

4. **Run on you local device**:
   ```bash
   npm run dev
