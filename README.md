# Organize
### Keep your projects intact

Organize organizes your To Do List as a project structure - your projects are organized by tasks which helps in keeping in track of your pending projects.


#### Project Structure
This project utilizes two forms of data storage: Your browser's localStorage (when not signed in), and Firebase Cloud Storage (recommended).

##### Using ```localStorage```
For you to be able to manage your projects in different devices, you are advised to sign-in. However, not everyone does this. Instead, your projects would be saved in your browser's ```localStorage```. This would save your projects everytime you open the web app on your browser. However, this means that the projects would only be saved to the browser you used to save the projects.

##### Using ```Firebase Cloud Storage```(recommended)
You can utilize this by signing in using the Firebase Authentication. You are required to enter your google account (which is handled by Firebase's Authentication). By signing in, you have the convenience of viewing, managing, and adding projects on every browser just by signing in to the same account.