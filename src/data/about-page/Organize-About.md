# About 

## What is Organize?
Organize is a task manager app designed for simple and straightforward management of projects and tasks. 

## App Guide

### Logged-in User vs Local User
![[Pasted image 20221010234130.png]]
As of now, Organize users can choose to log in their Google Account, or use the app as a Local User. This section would explain these two methods.

#### Logged-in User (Recommended)
Using Firebase's Authentication SDK, you can log in your Google account when using Organize. This would enable you to access and manage your tasks and projects in any device by logging in your Google account.

#### Local User
If you don't want to log in your Google account, you can still use Organize as a local user. However, you can access your tasks and projects only on this browser. Only one local user per browser is allowed.

Note: You cannot sync your local data once you've decided to sign-up later on. This is because the local user's data should persist only on the local browser.

### How to use this app?

#### General Structure
In Organize, your data is basically a list of projects. 

![[Pasted image 20221010235137.png]]

Projects are then divided into tasks. Theoretically, you can have as much tasks as you want inside a project.

![[Pasted image 20221010235158.png]]

#### Projects
Projects serve as a folder for your tasks. You can put description to your project.

##### Add a project
Add a project using the "Add Project" button. Clicking this would launch a modal asking for the project details.

Add project Modal
![[Pasted image 20221011152847.png]]

##### Open project
You can open your project by clicking on its card.

![[Pasted image 20221011155419.png]]

Access project information using the "Project Info" span. Clicking this would launch a modal containing the project information, and the some options to edit the project. 

![[Pasted image 20221011024534.png]]



#### Tasks
Tasks are the main items of this app. You can include task details such as description, deadline and priority.

##### Add a task
You can access your tasks by clicking on a project. Add a task using the "Add Task" button. Clicking this would launch a modal asking for the task details.

Add task modal.
![[Pasted image 20221011152911.png]]

##### View Task Details
You can view a task's details by clicking on its card. 

![[Pasted image 20221011153421.png]]
![[Pasted image 20221011153500.png]]

##### Task Deadline and Status
You may (or may not) add deadlines to your tasks. A "Due" mark would be put on tasks that should be done for the day, and tasks that are overdue.

However, marking a task as "Done" would remove the "Due" mark.

![[Pasted image 20221011140755.png]]

##### Task Priority
You can add priority to your tasks. This would help you distinguish more important tasks.

![[Pasted image 20221011141633.png]]

#### Task Calendar
Organize's task calendar is a convenient way to view tasks that are due on a specific day. When you add a task deadline, it can viewed through the task calendar. 

A task due on Oct 12, 2022.
![[Pasted image 20221011154202.png]]

The task calendar highlights Oct 12 with red. This indicates that there is a task due on Oct 12. Additionally, the date encased in purple border indicates the current day of the month.
![[Pasted image 20221011154214.png]]

Clicking on the Oct 12 cell would show the tasks for the day, alongside its priority color.
![[Pasted image 20221011154733.png]]

Clicking on a task calendar item would redirect you to the project in which the task belongs.