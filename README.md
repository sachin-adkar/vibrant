# Simple Blogger 

 **Project details**
This project provides REST APIs for CRUD operations on a simple blogging application using node.js, express and mongoDB.
JWT authentication is used in this project, the jwt token will be created during signUp or login, this token will be used to communicate with the server to access all the protected routes. All requests x-www-form-urlencoded. Please find the API documentations here :  https://docs.google.com/document/d/1xMmN_FLQNJGDZOe73RDmGuvKJlRwUnORsALWs0VkcGU/edit?usp=sharing

**Requirements**
 - Node.js (12.17.0)
 - MongoDB (4.2.3)
 - yarn
 
**Steps for local setup**
 Run the below commands in the terminal

     git clone https://github.com/sachin-adkar/vibrant.git
     yarn install
     yarn start
    
**Routes**
 - /v1.0/signUp : For signup
 - /v1.0/login : For login
 - /v1.0/createBlog : To create a new Blog
 - /v1.0/getBlogById : Returns a blog using blogId
 - /v1.0/getBlogs : Returns all the blogs of an user
 - /v1.0/updateBlog : Used for editing the blog
 - /v1.0/softDelete : Sets isActive flag to false (Entry will be present in the databse)
 - /v1.0/delete : Deletes the blog from database
 - /v1.0/addComment : Used for adding the comments to a particular blog
 - v1.0/getComments : Returns all the comments of a blog
 
**Styleguide referred**
 https://github.com/elastic/kibana
