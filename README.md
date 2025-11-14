# AETI Project

AETI is a full-stack project with a **Django backend** and a **React frontend** (client).  
This README provides clear instructions to install, set up, and run the project.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Clone the Repository](#clone-the-repository)
4. [Backend Setup (Django)](#backend-setup-django)
5. [Frontend Setup (React)](#frontend-setup-react)
6. [Environment Variables](#environment-variables)
7. [Running the Project](#running-the-project)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Structure

AETI/
├── AETI_backend/ # Django backend
│ ├── venv/ # Virtual environment (ignored)
│ ├── manage.py
│ ├── requirements.txt
│ └── ...
├── client/ # React frontend
│ ├── node_modules/ # Ignored
│ ├── package.json
│ ├── public/
│ └── src/
├── .gitignore
└── README.md

yaml
Copy code

---

## Prerequisites

- Python 3.10+
- Node.js 16+ and npm/yarn
- Git

---

## Clone the Repository

````bash
git clone <your-repo-url>
cd AETI
Backend Setup (Django)
1. Create a virtual environment
bash
Copy code
cd AETI_backend
python -m venv venv
2. Activate the virtual environment
Windows CMD:

bash
Copy code
venv\Scripts\activate
PowerShell:

bash
Copy code
venv\Scripts\Activate.ps1
Linux / macOS:

bash
Copy code
source venv/bin/activate
3. Install dependencies
bash
Copy code
pip install -r requirements.txt
4. Apply database migrations
bash
Copy code
python manage.py migrate
Frontend Setup (React)
bash
Copy code
cd ../client
npm install
Optional: If you use yarn:

bash
Copy code
yarn
Environment Variables
Create a .env file in each relevant folder.

Backend .env (AETI_backend/.env):
ini
Copy code
SECRET_KEY=your_django_secret
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
Frontend .env (client/.env):
ini
Copy code
REACT_APP_API_URL=http://localhost:8000/
Running the Project
1. Start Django backend
bash
Copy code
cd AETI_backend
venv\Scripts\activate   # Activate venv
python manage.py runserver
Backend will run at: http://localhost:8000

2. Start React frontend
bash
Copy code
cd ../client
npm start
Frontend will run at: http://localhost:3000

Screenshots (Optional)
Add screenshots of your frontend and backend here if available.

Contributing
Fork the repo

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m "Add new feature")

Push to branch (git push origin feature/your-feature)

Open a pull request

License
This project is licensed under the MIT License.

yaml
Copy code

---

# ✅ **Next Steps**

1. Save as `README.md` in your project root.
2. Commit & push:

```bash
git add README.md
git commit -m "Add complete README.md with setup guide"
git push origin testing-frontend
````
