****🧠 Quiz Application****

**A full-stack **Quiz Application** built using **Spring Boot (Backend)** and **React JS (Frontend)**.  
This application supports **Admin & User roles**, topic-based quizzes, score tracking, and a clean modern UI.**
---

**🚀 Features**

**👤 User**

- User Registration & Login
- View available quiz topics
- Attempt quizzes based on topic
- Instant score calculation
- View personal quiz history (My Scores)
- Logout functionality

**🛠 Admin**

- Admin Login
- Add / Delete quiz topics
- Add / Update / Delete questions
- View questions by topic
- View user scores topic-wise (Leaderboard-style)
- Logout functionality
---

** 🏗 Tech Stack**

### Backend
- Java 23
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- REST APIs

### Frontend
- React JS (Vite)
- Axios
- React Router DOM
- CSS (Custom styling, responsive UI)

---

**⚙️ Backend Setup (Spring Boot)**

### Prerequisites
- Java 17+
- Maven
- MySQL

### Steps
cd Backend
mvn spring-boot:run

### Backend runs on:
http://localhost:8081

---


**⚙️ Frontend Setup (React)**

### Prerequisites

- Node.js (v18+ recommended)

- npm

### Steps

- cd Frontend

- npm install

- npm run dev

### Frontend runs on:

http://localhost:5173

---

**🛢 Database Configuration**

Database properties are managed using Spring Profiles.

application.properties → dummy / common config
application-local.properties → actual MySQL credentials (ignored by Git)

### Example:

spring.datasource.url=jdbc:mysql://localhost:3306/quiz_db
spring.datasource.username=your_username
spring.datasource.password=your_password

---

**🔐 Authentication Notes**

No JWT used (simple session-like logic)
Role-based access handled manually (ADMIN / USER)
Admins can manage topics & questions
Users can only attempt quizzes and view their scores

---

**📊 Scoring Logic**

Each quiz is topic-based

Score is calculated instantly after submission

---

**Tools:**

- Git
  
- GitHub
  
- Eclipse / VS Code

---

**📌 Future Enhancements**

- JWT / OAuth security

- Timer-based quizzes

- Question difficulty levels

- Pagination & search

- Deployment (AWS / Render / Vercel)

---


**👨‍💻 Author**

Siva Manikandan M,

Java Full Stack Developer

---


**⭐ Support**

If you like this project, give it a ⭐ on GitHub!

