# ROCA.sa Jobsite
This project allows internal and external users to apply to jobs within the ROCA.sa network.

From package.json:
>  "dependencies": {

>    "@ant-design/icons": "^4.0.5",

>    "@emotion/babel-preset-css-prop": "^10.0.27",

>    "@emotion/core": "^10.0.27",

>    "@emotion/styled": "^10.0.27",

>    "@zeit/next-less": "^1.0.1",

>    "algoliasearch": "^4.0.3",

>    "antd": "^4.1.1",

>    "anyfileparser": "^1.1.1",

>    "babel-plugin-import": "^1.7.0",

>    "dotenv": "^8.2.0",

>    "emotion": "^10.0.27",

>    "emotion-server": "^10.0.27",

>    "express": "^4.17.1",

>    "firebase": "^7.13.2",

>    "less": "^3.11.1",

>    "next": "latest",

>    "next-redux-wrapper": "^5.0.0",

>    "null-loader": "^3.0.0",

>    "react": "^16.7.0",

>    "react-dom": "^16.7.0",

>    "react-firebase-file-uploader": "^2.4.3",

>    "react-instantsearch-dom": "^6.3.0",

>    "react-redux": "^7.2.0",

>    "redux": "^4.0.5"

>  }

The Pages folder contains a list of each page component's lifecycles while running.
The Components folder contains stylized components to use during render.
The Scripts folder contains useful scripts for indexing data from Firebase for clientside searching, as well as scripts for interacting with Firebase as a user or admin/employer.
The Public folder just contains the system-wide logo.

### Issues:
There are some files that remain that might be unnecessary, as well as unnecessary code. The system's development was terminated while
things were still be implemented; some functionality is broken. Namely:

f) filter applicants

g) prioritize some applications

h) communicate with applicants

i) keep the application process organized for the search committee

j) share messages

k) generate reports

Otherwise, the project was also configured under evolving conditions. Some packages have been imported and are as yet unused, but they should not affect present functionality of the source code.

# To run the code:
#### 1. Install yarn v1.22.4 (https://classic.yarnpkg.com/en/docs/install#windows-stable)
#### 2. Download code from Github.
#### 3. Open CMD
#### 4. cd to project folder
#### 5. Download .env file from this link: https://drive.google.com/drive/folders/1K-5Ni-VfMwOZjHo4527zN8hGUP005HJ9?usp=sharing
#### 6. Copy the .env file to the project folder
#### 5. in the CMD window, enter "yarn install"
#### 6. When it finishes, enter "yarn start"
#### 7. Navigate to localhost:3000 in a browser
