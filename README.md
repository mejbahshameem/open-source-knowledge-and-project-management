# Instructions for Building and Deploy Open Source Knowledge & Project Management Software

As both our frontend and backend is live, to run our fully functional software please visit:

  

[**http://os-knowledge.000webhostapp.com/**](http://os-knowledge.000webhostapp.com/)

  

The email related services have limitations due to free plan used from sendgrid. So, sometimes you will not receive emails if allocated emails are finished for the time instance.

### **Frontend**

  

You can use http-server.

  

*  1.  **Install Node.js** if you did not do that yet.

  

*  2. In CMD, run the command **npm install http-server -g**

  

*  3. Navigate to the specific path of your file folder (which is ./Frontend here) in CMD and **execute** the command **http-server**

  

*  4. Open a browser and enter **localhost:8080**. Application should run here.

  

*  5. To **run with a different backend hosting url**, please change the **hostUrl variable** in the getHostUrl() function from http://mejbah-oskm-se.herokuapp.com to your own backend hosting url. You can make this change in Frontend/js/dependency.js

  

If you want a specific domain name, simply search for a good webhosting provider and buy a domain name and pay a monthly hosting fee.

Simply upload the files from the Frontend folder to your chosen hosting provider and the frontend will be immediately live.

  

### **Backend**

  

The backend server is up and running at:

**http://mejbah-oskm-se.herokuapp.com**

  

For Backend, we used Node.js with express. The environment variables are not pushed here as it contains API keys which is unsafe to push in public repository.

  

### **Building the APIs**

  

- For Building the APIs, we recommend an **IDE** for convenience, you can use any **IDE** , however, we used the popular Visual Studio Code. You can download it from here:

  

[**https://code.visualstudio.com/**](https://code.visualstudio.com/)

  

- Download and Install Node.js which will automatically come up with npm. The version we used for Node is **12.13.0** and the npm version used is **6.12.0.** The download link of Node.js:

  

[**https://nodejs.org/en/download/**](https://nodejs.org/en/download/)

  

- We used **mongoDB** version **4.2.1** with **Mongoose** version **5.7.12** which is an Object Data Modeling (ODM) for mongoDB. Download mongoDB zip for your OS:

  

[**https://www.mongodb.com/download-center/community**](https://www.mongodb.com/download-center/community)

  

extract the downloaded zip file where all mongo setting .exe can be found where mongod.exe will be used to start the mongoDB database server. Create another folder in your machine alongside this extracted folder to store mongoDB data. The folder name we used is _mongodb-data._ Now start the server using following **command** where the two directories – one which is downloaded and extracted that contains mongod.exe and mongoDB data folder we created will be used. The example **command** for my machine:

  

_C:\mongodb\bin\mongod.exe --dbpath=C:\mongodb-data_

  

- Now everything is set up to run our software. Clone the project from the public github repository **https://github.com/mejbahshameem/open-source-knowledge-and-project-management.git** Open the folder **Backend** with the IDE and use the following two commands:

  
  
  

_npm init &amp;_

  

_npm install_

  

npm install will install all the required dependency which are written in project&#39;s _package.json_ file.

  

- Now the environment variables must be set up. Create a folder named **config** in Backend folder which will have two files named **dev.env** and **test.env** which will contain development and test environment variables. There are total 4 environment variables in our software which must be set to run. They are:

  

**PORT:** Can be same for both dev and test environment. E.g. 3000

  

**SendGrid\_API\_Key:** API Key for sending emails. Canbe same for both environment.

  

**MONGODB\_URL:** Give mongoDB Url. E.g. _mongodb://127.0.0.1:27017/oskpm-api._  **MUST** be different for test &amp; dev envirment.

  

**JWT\_SECRET:** Use a secret code for json web token. Can be same for both environments.

  

This command will set the backend up to be built. One final command to run the backend:

  

_npm run dev_

  

### **Testing the APIs**

  

- In backend, we have written total **73 automated** test cases under **4 test suites** which has a very rich code coverage. The **code coverage** report also can be found in _coverage\lcov-report_ in this directory. From this directory please run **index.html** to see the code coverage report.

  

- If everything is setup as described above, then the test command should test all the test cases and if everything is set up correctly all the 73 test cases for backend should **pass**. Please read the code comments of _src\utility\cronjobs.js_ and _tests\Comment-Utility.test.js_ carefully to test the Cronjobs. The command to run the automated testing:

  

_npm run test_

  

*** Please set up every environment variables for test.env exactly as instructed above specially the **SendGrid_API_Key**. Use your valid API key you get by registering in Sendgrid and paste the key in the env variable SendGrid_API_Key otherwise some test cases will fail.

  

### **Deploy the APIs**

  

- We deployed our APIs in **Heroku** which is a very popular cloud platform for hosting Node.js application. Heroku supports range of other programming languages too. We are using free version currently with limited features which can be extended using a paid plan of heroku.

- For database, we are using **MongoDB Atlas** cloud as it is a best choice for mongoDB as this product comes from the mongoDB organization. We are currently using free version of the atlas which gives us **512** MB of database storage, that can also be extended by choosing a paid plan.

  

- First register in mongoDB Atlas free tier plan (M0) by using the following link:

  

[**https://www.mongodb.com/cloud/atlas/register**](https://www.mongodb.com/cloud/atlas/register)

  

Then choose a free tier server located less distant from you from the available server location lists. Then you will be redirected to your dashboard where you will have your database cluster. **Connect** the cluster using the connect option and then follow these procedures. From setup connection security choose add a different IP address and write (0.0.0.0/0) so that Heroku can connect this database. **Don&#39;t worry about the security with 0.0.0.0/0,** you also must provide your Atlas id and password so that only your Heroku app can connect not everyone! Press **Add IP Address**

  

- Next step is to create a MongoDB database user in Atlas. Note down your username and password we will need it while connecting this database to the Heroku. Click **Create MongoDB User**

  

- Initialize **git** in repository&#39;s Backend directory using the command _git init._ Create a github repository from where you will then send Heroku the updated code to run. Use following commands to add and push your local changes to remote repo.

  

_git remote add origin your\_git\_repository &amp;_

  

_git push origin master_

  

Now all your local source codes should be there in github. Remember we do not push our environment variables( **config folder** ) to a public repository so you will need to configure the environment variables for Heroku later on.

  

- From the **Backend** directory, open the terminal to write the command to create Heroku app. Write the command _heroku create your\_app\_name (**name** must be **unique** across all heroku apps)._ As you are using git and Heroku from same Backend directory Heroku will know which repository contains the code.

  

- Now set the **environment varaibles** we need to run the app. We do not need to set **PORT** as Heroku will automatically assign a port but we need to set the remaining three variables. You can set them up by a single command separated by space or by one command for each. The command to set these environment variables:

  

_heroku config:set JWT\_SECRET=yoursecretcode_

  

_heroku config:set SendGrid\_API\_Key=yourAPIkeyforemailserver_

  

For setting up third variable which is **MONGODB\_URL** go to your MongoDB atlas dashboard again and from that cluster select _overview._ From overview select _connect_ and from that pop up window _select connect your application_ from three given options. _Select Short SRV connection string_ and copy the SRV address you get. You need to edit this SRV address string, **replace <PASSWORD>** of the string with your actual database password. Now copy this SRV connection string where your db password persists and paste this whole string with double quote(Windows, Mac single quote) in the following command:

  

_heroku config:set MONGODB\_URL=&quot;pasteSRVstring&quot;_

  
  
  

- Everything is set now. One final command to make your application LIVE:

  

_git push heroku master_

  

When the build is successful you will get your app Url which will contain app name you provided with _heroku create_ command.

  

The application is now hosted in Heroku. You can now use the Url to test the APIs or to connect the APIs with the frontend by following the guidelines written on the top of this readme file.