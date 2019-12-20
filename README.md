BLOG API

By I. Mahle

A project of The Odin Project: https://www.theodinproject.com/courses/nodejs/lessons/blog-api

Instructions

1. Save all files in a folder
2. Run npm install
3. Run npm start in main folder
4. In a new terminal: Go either to folder front_end_1 or front_end_2
5. Change the port (Mac: export PORT=5000)
6. Run npm start

Discussion
I used the following technologies: frontend: HTML, CSS, Javascript (React), backend: Javascript (Express, Nodejs).

This blog app consists of an API-backend that serves two different frontends for accessing and editing blog posts. One of the frontend sites is for people that want to read and comment on the posts while the other one will be just for the blog author to write, edit and publish the posts. Authentication for the second one is handled by JSON Web Tokens within the PassportJS system. The frontend sites are set up with React. The rich text editor (TinyMCE) is embedded.

Requirements
npm
