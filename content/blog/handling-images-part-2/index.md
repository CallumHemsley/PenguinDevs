---
title: "Handling Images with React/Redux - Part 2"
date: '2019-10-30'
description: "These posts are about the hardships I faced when figuring out how to upload an image from my website, sending it to my API and then storing it in my database."
type: "blog"
---

These posts are about the hardships I faced when figuring out how to upload an image from my website, sending it to my API and then storing it in my database.

<br/>

As well as documenting where I went wrong, I'll also show you how you can achieve this using React/Redux and Flask-Restful/Postgres.

<br/>

**A few things to note before we start:**
* This post is specifically covering how to create a correct payload for your HTTP request if you want to include image files, or files in general for that matter.
Following this there will be posts concerning the server side using Flask. 
* I'm using React/Redux on the front-end, with Flask-Restful/Postgres on the back-end.
* This will most likely become out-dated very quickly due to the rapid development of the frameworks. (Especially React/Redux) 
* While writing this I'm using: `react v16.4.1`, `react-redux v5.0.5`, `Flask v0.12.2`, `Flask-RESTful v0.3.6` and `postgres v9.6`.

<br/>

**Configuring the payload correctly**

<br/>

Prior to trying to implement Image uploading, I had been using `application/x-www-form-urlencoded` payloads which is the default type of encoding for HTML forms. 

<br/>

This is perfect when you only have text-based form elements, as its more or less the same as a query string on the end of the URL.

<br/>

So being ignorant me, I simply tried to keep this method of encoding and just added the image as an additional argument, like so:

```js
export const createPost = (post) => {
  var date = moment().format('MMMM Do, YYYY');
  return (dispatch) => {
      return Axios({
          method: 'post',
          url: apiUrl,
          data: {
              //id: post.id,
              title: post.title,
              category: post.category,
              image: post.image,
              excerpt: post.excerpt,
              body: post.body,
              date: String(date)
          }
      })
          .then(response => {
              //dispatch async action.
              dispatch(createPostSuccess(response.data))
          })
          .catch(error => {
              throw(error);
          });
  };
};
```
* This is within my `postActions` file, which is where my actions are coded for redux. 
If you don't know much about redux or actions, I suggest you start 
**[here](https://redux.js.org/basics/actions "Redux Actions")**
* I'm using the `Axios` package here to create promise based HTTP requests.
* I'm also using the `moment` package to get the current date and store it in the correct format.
* Since it's the default type of encoding, all we have to do is pass Axios our type of HTTP request (Here it's `POST`), our `url` for the API that your sending the request to, and the data you want to send in the request.
* When our HTTP request is sent, the data is simply put within the url as arguments like so:
`http://localhost/users/posts/1?id=1&title=WORK&body=hehe12312312&category=animal&excerpt=February 9th`
* Once the payload has been sent, the async action `createPostSuccess` is dispatched, with the response data as a parameter.

<br/>

Here's the async action, very simple:

```js
export const createPostSuccess = (post) => {
    return {
        type: 'CREATE_POST_SUCCESS',
        post
    }
};
```

* This is mainly for testing and the user won't notice this at all, it just confirms if the post was created.

<br/>

What I discovered after testing this, is that the image data was not sent, only the basename of the image file. 

After some research it was clear I had to change the encoding (I didn't even know HTTP requests could have different types of encoding before this!).

<br/>

The correct encoding for image uploading is `multipart/form-data`, here's how I changed my code to adapt for this:

```js
export const createPost = (post) => {
    var date = moment().format('MMMM Do, YYYY');
    const fd = new FormData();
    fd.append('title', post.title);
    fd.append('category', post.category);
    fd.append('excerpt', post.excerpt);
    fd.append('body', post.body);
    fd.append('date', String(date));
    fd.append('image', post.image);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return (dispatch) => {
        return Axios.post(
            apiUrl, fd, config
        )
            .then(response => {
                //dispatch async action.
                dispatch(createPostSuccess(response.data))
            })
            .catch(error => {
                throw(error);
            });
    };
};
```

* The first big difference is that we have to create a `FormData` object, as this basically compiles the form data in a correct format for `'multipart/form-data'` use.
* Also we create a `config` constant, which just tells Axios that the data is encoded using `'multipart/form-data'`.
* Finally we call `Axios.post` giving it 3 arguments, the url of the api we are requesting to, the data, and the header configuration.
* The async action `createPostSuccess` is the same as before.

That's it for the front end side of things. After reading this and the previous post, we should now we able to select and image on our page, pass it through props and create a HTTP request to our given API. What's left is configuring our backend.