# Instawork Take Home Project

## App Description
A simple team-member management application and consists of 3 pages that allow the user to view, edit, add, and delete team members. Additionally, on the view page, the user can sort team members by their creation date or last name.

## Built With
Django - React - React Router - Material UI

## Getting Started
Prerequisites:   
> Yarn (https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)  

> Python 3 (https://www.python.org/downloads/)  

### Preliminary Steps

1. Open terminal at desired location (Following steps are all executed on terminal)

2. Clone the repo: `git clone https://github.com/ScottJiang2001/Instawork-take-home.git`

### Running the frontend (both Mac and Windows)

1. Switch directories: `cd member_management_frontend`

2. Install dependencies: `yarn install`

3. Run in development: `yarn start`

### Running the backend (Separate steps for Mac and Windows)
  
Installation Steps (Mac):

1. Switch directories: `cd member_management_backend`

2. Install/upgrade pip: `python3 -m pip install --user --upgrade pip`

3. Install virtualenv: `python3 -m pip install --user virtualenv`

4. Create a virtual environment (for dependency installation): `python3 -m venv env`

5. Activate the `env` environment that was created: `source env/bin/activate`

6. Install dependencies: `python3 -m pip install -r requirements.txt`

7. Start the app by running `python3 manage.py runserver`  


Installation Steps (Windows):

1. Switch directories: `cd member_management_backend`

2. Install/upgrade pip: `python -m pip install --upgrade pip`

3. Install virtualenv: `pip install virtualenv`

4. Create a virtual environment (for dependency installation): `python -m venv env`

5. Activate the `env` environment that was created: `.\env\Scripts\activate`

6. Install dependencies: `pip install -r requirements.txt`

7. Start the app by running `python manage.py runserver`
