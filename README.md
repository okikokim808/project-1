<h1>Spontaneous</h1>
   Spontaneous is a responsive full-stack application that allows users to sign up for an account and generates 
   three random Meetups from a profile completed at sign up. 

<h2>Existing Features</h2>
  <ul>
    <li>Account creation - comprised of a name, e-mail, and password that is validated for accuracy and completion.</li>
    <li>Parameter selection -users can enter their zip code and search for Meetups in a specific location</li>
    <li>Generate and display three random meetups to users based on individually customized profile</li>
    <li>Add a meetup to "Saved" meetup section</li>
    <li>Remove a meetup from "Saved" meetup section</li>
    <li>Allow random selection of existing meetups</li>
  </ul>


<h2>Technologies Used</h2>
<ul>
  <li>HTML/CSS - Front End Design</li>
  <li>Javascript - Scripting Language</li>
  <li>.AJAX - Talk to server</li>
  <li>Mongo - store user data</li>
  <li>Mongoose - model data </li>
  <li>Node - Server</li>
  <li>geoCoding using GoogleMaps API to turn a zip code into longitude and latitude
  <li>API Key signatures to access Meetup's API</li>
</ul>

<h2>API's Used</h2>
<ul>
  <li>Meetup.com</li>
  <li>Google Maps - Geocoding </li>
</ul>

<h2>Planned Features/Opportunites for Improvments</h2>
<ul>
  <li>Replace Cookies with JWT tokens for improved security</li>
  <li>Create comments section that allows usersadd, delete, and edit a comment, and reply to comments of other users 
  for specific Meetup's they've attended</li>
  <li>Embed Comments in User Schema</li>
  <li>Add an "Attended" section for users to track which Meetups they've attended</li>
  <li>Utilize controllers to keep code clean and organized</li>
  <li>Secure Meetup API data with OAuth instead of API Key signatures</li>
  <li>Optimize .ajax calls and routes</li>
  <li>Fix ability for user to log in</li>
  <li>Implement feature for users to edit/update zip code and interest selection</li>
  <li>Include interactive link to meetup</li>
  <li>Remove HTML from AJAX response</li>
   <li>Add error handling for undefined AJAX responses</li>
   <li>Enhance Mobile Responsivness</li>
   <li>Add conditional user meessages for direction and clarification to improve user experience</li>
</ul>

<h2>Authors</h2>
  Andrea Piazza,
  Francisco Sandoval 

<h2>Acknowledgments</h2>
  Special thanks to Justin Castilla and Dalton Hart for assistance with our project!
