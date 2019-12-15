---
title: "Normalizing your redux store"
date: "2019-12-13"
description: "Learn how to normalize your redux state, and why you should do that in the first place, with examples."
type: "tldr"
---

![Redux dev tools](/redux-dev-tools.png "Redux dev tools")

## Why normalize the redux state

I think this is best explained with an example.

Let's say you want to display users of the website in a table. Your first thought might be to store the users as an array of objects, which might look something like this:

```jsx
state = {
  users : [
    {
      userId: 1,
      name: "Callum",
      email: "someEmail@gmail.com"
    },
    ...
  ],
  isFetching: false, //To show loading screen when fetching data..
  lastUpdated: 1439478405434, //To determine when it should re-fetch..
}
```

This is also most likely what the data you are fetching from your API looks like.

Whilst this would work in most cases, let's imagine you want to edit a specific user.

Firstly, you would loop through the array of users until you find the correct ID. This wouldn't be a problem with a small list of users, but as your web application scales, you could run into performance issues.

Futhermore, what about if you have nested data?

For example each user could have a comments list, with each comment object containing an id and a message.

This would result in the previous example looking like:

```jsx
state = {
  users : [
    {
      userId: 1,
      name: "Callum",
      email: "someEmail@gmail.com"
      comments: [
        {
          id: 12,
          message: "a comment",
        },
        {
          id: 15,
          message: "another comment",
        },
        ...
      ]
    },
    ...
  ],
  isFetching: false, //To show loading screen when fetching data..
  lastUpdated: 1439478405434, //To determine when it should re-fetch..
}
```

As you can see, things are starting to get complicated. What if two users, *for some odd reason* had the same comment?

Data could easily get repeated here.

As the [redux docs](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) state, this is a concern for multiple reasons:

- We might have to update the same piece of data in several locations.
- Trying to update a deeply nested data structure can be a horrible experience.
  - Imagine first looping through to find the correct user, then looping through to find the right comment, etc..
- The redux store is immutable, meaning that every time we make a change to this nested data structure, all ancestors in the state would also have to be updated.
  - This would make UI components re-render unnecessarily.

## The solution

More often than not, we structure the stores of our redux application in the same way that we receive the data from the API. However, it doesn't have to be this way.

Therefore redux suggests we learn from our past mistakes (Databases), and store the data in a **normalized** form.

Normalization refers to transforming the schema of a database to remove duplicate data. The biggest advantage of this is having a *single point of truth*, meaning there is only one place in the database that contains the true value of some piece of information.

#### Normalizing the redux store

Instead of storing data as an array of objects, we store the data as an object, **indexed by a unique id**.

*But Callum.. if we just store users as an Object, we would have to call `Object.values()` to turn it into an array when rendering rows, which would be cumbersome.*

I agree it would be cumbersome, but there's a solution to that as well:

In addition to storing each user as an object, we store an **array of unique user ids, to indicate ordering.**

Here's the normalized version of the previous example:

```jsx{8}
state = {
  users : {
    byId: {
      1 : {
        userId: 1,
        name: "Callum",
        email: "someEmail@gmail.com"
        comments: [12, 15] //Arr of comments associated to this user
      },
      ...
    },
    allIds: [1], //Arr of unique IDs to indicate order.
  },
  comments: {
    byId: {
      12: {
        id: 12,
        comment: "a comment",
      },
      15: {
        id: 15,
        comment: "another comment",
      }
    },
    allIds: [12, 15]
  }
  isFetching: false,
  lastUpdated: 1439478405434,
}
```

With this normalized state, you can find users by id in *O(1)*, as well as still getting all the advantages of an array based state.

Furthermore, comments and users are separated, with no deep nesting. They are linked via an array of comment ids per user, as highlighted (a foreign key if you will).

Instead of updating a comment in multiple places now, we can simply update it within the comments section of the state. This means that the users slice of state doesn't mutate. Therefore only the UI directly related to the comments state will update.

We also don't need to dig through the user state to find comments, we can directly go to the comments state now.

To render the rows, you don't need to do `Object.values()` or anything like that.

simply loop through the id array, then find the user by id like so:

```js
for (const userId of users.allIds) {
  const user = users.byId[userId];
  //Do something with user...
}
```

## Normalization isn't perfect

Like everything, it does have it's trade offs.

Firstly, it can take a lot of time to set up. But I personally think there's two valid responses to this problem. One is [normalizr](https://github.com/paularmstrong/normalizr), which lets you automate this process. Secondly, I would like to say that although it requires a bigger investment in time initially, it does result in and easier development process in the long term, especially when requirements change and state needs to be modified.

Another issue I've read about is that it can create a hard to debug layer between your API and code, especially concerning data-related bugs. I have to admit, this hasn't personally happened to me, but I can see this happening.

Also at some point, we're going to have to *de-normalize* the data to show it, so how do we go about doing that correctly?

The answer is selectors, which I will be explaining and showing in my next tl;dr post.

## Conclusion

Well, that just about wraps up this short *tl;dr* on normalizing redux state.

Here's some links for extended reading:

- [Redux documentation on normalizing state shape](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape)
- [Automating normalization via normalizr](https://blog.brainsandbeards.com/advanced-redux-patterns-normalisation-6b9a5aa46e1f)

Let me know what you think in the comments, and as always, sign up to the emailing list if you want to see more posts!
