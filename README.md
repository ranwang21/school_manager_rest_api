# School Manager REST API

This REST API allows creating, reading, updating, and deleting courses / users with user Authentication / Authorization.
This REST API is constructed for the [Full Stack School Manager APP](https://github.com/ranwang21/full_stack_react_express_app) (under construction). But you can make request to this API as well since the API allows CORS.
This REST API is constructed for the [Full Stack School Manager APP](https://github.com/ranwang21/full_stack_react_express_app) (currently under construction). But you can make request to this API as well since the API allows CORS.

To edit or delete a course at `/course/:id`, you need provide user credentials.

You can create a user account at POST `/users` with below infomation in json format:

- firstName (required)
- lastName (required)
- password (required)

You can also create a course when logged in, provide server with below information in json format:

- firstName (required)
- lastName (required)
- password (required)
- estimatedTime (optional)
- materialsNeeded (optional)

You can update or delete a course at PUT / DELETE `/courses/:id`. But you can only do so with the course(s) that you created.

## Getting Started

To get up and running with this project, run the following commands from the root of the folder that contains this README file.

First, install the project's dependencies using `npm`.

```
npm install

```

Second, run database seed.

```
npm run seed
```

Finally, start the API
```
npm start
```
