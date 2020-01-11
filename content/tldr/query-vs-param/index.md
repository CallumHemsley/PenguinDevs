---
title: "req.query vs req.params"
date: "2020-01-11"
description: "Learn what the difference is between req.query and req.params for node, and when to use a query string vs when to use parameter variables."
type: "tldr"
---

![example of query string and param](/queryParamExample.png "example of query string and param")

Let's say our frontend is trying to get details for a specific user from our backend express app. How do we get the userId parameter from the url?

Assuming that the frontend is doing a GET request, there are two main ways to do this:

### request.params

If the frontend has defined the route in this way:

`https://localhost:3000/users/:userId`

Which is equivalent to:

`https://localhost:3000/users/12345`

Then you will want to use *request.params*

*request.params* is an object containing all the parameters **in the path portion** of the url. If you print *request.params*, you will see:

```js
{
    userId: 12345
}
```

### request.query

If the frontend has instead defined the route like this:

`https://localhost:3000/users?userId=12345`

Then this is an example of a [query component](https://tools.ietf.org/html/rfc3986#section-3.4). It's also called a *query string*

In this case you will want to use *request.query*

*request.query* contains the URL query parameters (aka the parameters **after the `?` in the url**) If you print *request.query*, you will see:

```js
{
    userId: 12345
}
```

### When to use them

If you're in control of the frontend, and are not sure whether to put your values in the query string or the parameter, what should you do?

According to [the restful api design best practices:](https://phauer.com/2015/restful-api-design-best-practices/)

- In most cases, you can use *parameter variables* for **identifying resources** such as fetching a user as shown above e.g:
  - do `GET /employees/12345`
- Use the *query string* for optional/complex parameters like **filtering**, for example:
  - instead of `GET /externalEmployees`, do `GET /employees?state=external`
  - If you want to fetch **multiple** users, do `GET /users?userId=12345,56789`

### Combining query strings and param variables

Finally, It's also worth nothing that you can **combine** both *query strings* and *parameter variables*. Here is an example:

Given the route: `app.get('/users/:userId')` 

and the url: `https://localhost:3000/users/12345?name=penguin&age=15` 

*req.query* would be:

```jsx
{
    name: 'penguin',
    age: '15'
}
```

*req.params* would be:

```jsx
{
    userId: '12345'
}
```

### Further Reading

- [Stackoverflow question regarding req.query vs req.params](https://stackoverflow.com/questions/14417592/node-js-difference-between-req-query-and-req-params)
- [Query strings on wikipedia](https://en.wikipedia.org/wiki/Query_string)
- [RESTful API design guidelines](https://hackernoon.com/restful-api-designing-guidelines-the-best-practices-60e1d954e7c9)

Let me know if you have an questions in the comments, and as always, **sign up to the emailing list** if you want to see more posts!
