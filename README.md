# Job-App

Job App is a MERN stack application that allows users to search for jobs, apply for positions, and manage their job applications. Recruiters can post job listings, manage applications, and interact with potential candidates.

## Features

- **Job Search**: Users can search and filter job listings based on various criteria such as location, industry, and job type.
- **Application Management**: Users can apply for jobs, track application status, and update their application information.
- **Recruiter Dashboard**: Recruiters can post job listings, review applications, and communicate with candidates.
- **Token Management**: Manages authentication tokens using cookies for persistent user sessions.
- **Error Handling**: Provides informative error messages for invalid verification codes, expired links, and other authentication issues.
- **User Management**: Allows users to update their email and password, and handles account recovery.
- **User Authentication**: Secure user authentication and authorization using JWT.

## Tech Stack

- **Frontend**: Vite React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js
- MongoDB

---

### Installation

1. **Clone the repository**

    ``` bash
    git clone https://github.com/vishalyadav0987/Job-App.git
    cd Job App
    ```

2. **Install backend dependencies**:
    ``` bash
    cd ..
    npm install
    ```
3. **Install frontend dependencies**:
    ```bash
    cd frontend
    npm install
    ```
4. **Start the development servers**:
    - Backend server:
      ```bash
      cd ../backend
      npm start
      ```
    - Frontend server:
      ```bash
      cd ../frontend
      npm run dev
      ```
---

## Set up environment variables

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- JWT_COOKIE_EXPIRE=JWT_COOKIE_EXPIRE
- CLOUDINARY_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET


## Aplication online

- **Job-App**: <a href="https://job-app-e7r7.onrender.com" _blank >Click here Live Application.</a>



## Deployment
This application is deployed on Render. To deploy your own version:

1. Create a new web service on Render and connect your GitHub repository.
2. Add the necessary environment variables in the Render dashboard.
3. Deploy the application.

## Acknowledgements
- MongoDB
- Express.js
- React
- Node.js
- Render
- Cloudinary

## Contact
If you have any questions or suggestions, feel free to open an issue or contact me at viahalyadav0987@gmail.com.
