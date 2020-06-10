# Covid-19-Dashboard

## Goal
<p>The goal of this project is to provide user with the latest updates for COVID-19 regarding the total cases, total deaths and recoveries worldwide with some graphs and maps for USA and INDIA.</p>

## Technologies/Libraries used
1. React
2. Bootstrap
3. d3-scale
4. Recharts
5. Leaflet (To create the world map)

<p> if you wish to see a demo of the application <a href="http://54.82.132.170:5000/"> click here</a> to see a demo </p><br>

## Steps to Run the code

1. Clone or download the zip file of the project.
2. Open the project in your favourite code editor.
3. Open a terminal in your code editor.
4. Run the following command to install all the node modules.
    ```js
    npm i
    ```
5. Once all the node modules are installed run the following commands to run the application.
    ```js
    npm start
    ```
6. It should bring up the application on http://localhost:3000 as shown below.
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/c19/homepage.png)<br>

## Screenshots

### 1. Country Wise Data
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/covid19/countrywisedata.png)<br>

### 2. World Map
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/covid19/worldmap.png)<br>

### 3. Graph using Rechart
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/covid19/graphs.png)<br>

### 4. USA Map
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/covid19/usamap.png)<br>

### 5. INDIA Map
![LOCALHOST SCREENSHOT](https://github.com/rahulh25/screenshots/blob/master/covid19/indiamap.png)<br>

## API's Used

|     #      | API URL   | PURPOSE |
|------------|-----------|---------|
|1|https://corona.lmao.ninja/v2/all| Gets the total counts for global data|
|2|https://corona.lmao.ninja/v2/countries| Gets the countrywise data|
|3|https://api.covid19india.org/data.json| Data for India along with states |
|4|https://covidtracking.com/api/states| Data for USA along with states|

## References

1. <a href="https://www.freecodecamp.org/news/how-to-create-a-coronavirus-covid-19-dashboard-map-app-in-react-with-gatsby-and-leaflet/"> Create Covid 19 World MAP </a><br>

2. <a href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest"> COVID 19 world data source </a><br>

3. <a href="https://covidtracking.com/api"> USA state data </a><br>

4. <a href="https://api.covid19india.org/"> India data source </a><br>

## Creating docker image.

1. Run the following command to build your docker image
    ```js
    docker build -f Dockerfile -t <username>/<imagename>:<version> .
    ``` 
2. You can also use my docker image for running it anywhere.
    <i>rahulh25/covid19-dashboard:5.0</i>

## Deploying docker image to AWS EC2

<p>Refer the following link to get the files to deploy the dopcker image directly to AWS EC2 using Terraform</p><br>
<a href="https://github.com/rahulh25/terraformforAWS">Click Here</a>