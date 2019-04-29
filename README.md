# TIE-23526 Web Architectures - Group project work repository
This repository is made for the *Web Architectures* curse from Tampere University of Technology (TUNI).
More docmumentation is allowed in the *pdf* file in this root directory. System Architecture, used technologies, and learning during the project is included in the pdf intelf.

## Project Plan

### Group Information

**Group Name:** Reino de España <br>
**Gitlab URL:** https://course-gitlab.tut.fi/webarch-2018/webarch-group-022/ <br>

**Group Members:**

**Asier Alacaide** - Student no. 282679 - asier.alcaidemartinez@tuni.fi <br>
**Felix Bernal** - Student no. 282957 - felix.bernalsierra@tuni.fi <br>
**Raditya Ayu Wirastari** - Student no. 287352 - raditya.wirastari@tuni.fi <br>


# Instructions to use the WebApplication
The following instructions are needed to build the web application. Before 
running the webapp, Docker is required to be installed in the local computer. 
After that, all we need to do is run the following commands:

## Building the docker containers
### Running backend and frontend with Docker
Once we are in the root directory of the git repository, we just need to run:

Docker compose build to create the Docker images and all configs:

    docker-compose build

Docker compose containers runnings:

    docker-compose up

All web components will be working after it. If we want to stop them:

    docker-compose down

### Running the backend with Docker
If we just want to run the backend components, then we ne to into the *backend* directory,
and run the following commands:

    docker-compose build

    docker-compose up
    
Again, to delete the containers built before, ater stoping the servers we need to run:

    docker-compose down
    
### Running the frontend with Docker
If we just need to run the frontend components, the following command are needed
to execute to build the frontend Docker containers:

    docker build -t frontend .
    
To build the Docker container, and:

    docker run -it -p 80:3000 frontend
    
To run the container itself.

## How to use "Make Me A Sandwich"
Once the backend and frontend backend containers are running, then we have to 
access to the app by using the Docker IP address. After that, we will access to
the app itself. 
<br />
<br />
The *Make me a Sandwich* webApp consist of basic sandwich order selection and queueing.
The user selects a specific sandwich in a predefined list made before with the backend API.
<br />
<br />
To create an order, the user has to click into the *Make order* button to visualize 
a list of the different available sandwiches. After click on one of those, the 
order is automatically generated, and it will be shown in the *OrderList* secction. 
<br />
<br />
The order created will now be shown with its current status, and it will be updated 
one the order is procesed by the Server B. The status will change from *inqueue* to 
*ready*.

