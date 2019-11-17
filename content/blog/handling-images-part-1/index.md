---
title: "Handling Images with React/Redux - Part 1"
date: "2019-10-28"
description: "These posts are about the hardships I faced when figuring out how to upload an image from my website, sending it to my API and then storing it in my database."
type: "blog"
---

These posts are about the hardships I faced when figuring out how to upload an image from my website, sending it to my API and then storing it in my database.

<br/>

As well as documenting where I went wrong, I'll also show you how you can achieve this using React/Redux and Flask-Restful/Postgres.

<br/>

**A few things to note before we start:**
* This post is specifically covering the client side. There will be a part 2 regarding particular issues I dealt with when configuring the payload. 
Following that there will be post(s?) concerning the server side. 
* I'm using React/Redux on the front-end, with Flask-Restful/Postgres on the back-end.
* This will most likely become out-dated very quickly due to the rapid development of the frameworks. (Especially React/Redux) 
* While writing this I'm using: `react v16.4.1`, `react-redux v5.0.5`, `Flask v0.12.2`, `Flask-RESTful v0.3.6` and `postgres v9.6`.

<br/>

**Getting to grips with react-dropzone:**

<br/>

I'm allowing the user to choose an image using the library 'react-dropzone'. When something as simple as this exists, it seems futile not to take advantage of it. 

<br/>

All you have to do is import in `Dropzone` and use the component just like any other component as shown below: 
```html
<Dropzone
    multiple={false}
    accept="image/*"
    onDrop={this.onImageDrop.bind(this)}>
    <p>Drop an image or click to upload</p>
</Dropzone>
```
It has arguments such as: 
* `multiple` which indicates if it should accept multiple images.
* `accept` for what type of images are allowed. (For example maybe you only want PNGs I'm using `image/*` so that all formats are accepted.)
* `onDrop` is similar to 'onSubmit' in that it's triggered when the user selects an image. The function `onImageDrop()` is then called. 
We bind the function to make sure the context will stay the same no matter where we call the function. 
Without binding it, we can't access properties, state and component methods such as `setState` within the function.


<br/>


The first problem encountered with react-dropzone was working out how to pass the image file to the parent component.
Here is the code I was using for the function `onImageDrop()`:
```js
onImageDrop(files) {
    console.log(files);
    this.props.handleImageChange(files);
}
```
<br/>

After looking at the `console.log()` statement I realised that the argument `files` was just an array of *FILES*, not just the single image file the user selects... 

<br/>

For some reason I assumed since I didn't allow multiple images, that it would simply just send the image on it's own, not in an array. 

<br/>

The fix was super simple, just pass `files[0]` instead of `files` as the argument since the image will always be the first element in the array.

<br/>

**Working out how to pass props and state.**

<br/>

Since I'm using React, I'm trying to split my UI into components where possible for a reusable, independent and modular workflow. 

<br/>

Because of this, I put the form part of my post creation page into its own component. 
This means that I can use said form component for both editing and inserting posts.

<br/>

However this made my life hard, at least initially. 
I couldn't figure out how to pass the image file to the parent component in the same way I had been doing with the other form inputs. 

<br/>

On reflection, the structure in which I was trying to do things was completely idiotic. 

<br/>

Let me explain, this is the process of how a blog post is submitted:

1. Form data has somehow changed. (For example, I have changed the 'title' form element.)
2. The parent method `onChange()` is called from whatever element has been changed. (In our case it's `title`.)
3. This method updates the `state`. The `state` stores each form-inputs current state within the parent component. (So here state.title has been updated)
4. The state values are then fed back into the form component as the current values. (I will explain why this is required below.)
5. Finally, when the form is complete and the user wants to submit it, we use the forms current input values and pass it back to the parent, which then actually submits the form.

<br/>

Just think about how illogical this actually is. 

I'm sending the form data to the parent, then sending it back to the child, which is then passed back to the parent for actually submitting the data.

<br/>

Now... the `state` has to be fed back into the form as current values for one main reason, and that's editing a post. 

<br/> 

If I want to edit an existing post, I want the current data to be automatically loaded into the form values. 

<br/>

And since I would essentially be copy/pasting the same code, I keep the same form for both editing and creating a new post.

<br/>

But passing the data from the child component back to the parent component when it already has the required data was really dumb, and I can't explain why I did this at all.

<br/>

**The solution:**

<br/>

First things first, let's update the state in virtually the same way we would with the other form elements:

```js
//Parent component
handleImageChange(image){
    this.setState({
        image: image,
    })
}
```

<br/>

The only difference between this and the other form element functions is that the image file is directly passed in, 
whereas for the other form elements all you have to do is pass in the `evt` object.

From there, you can then set the state of that form element as `evt.target.value`.

<br/>

Once we know that the state is being correctly set, we need to relay it back into the child form component like so:

```js
//Parent component
<PostForm valueTitle={this.state.title}
    valueCategory={this.state.category} 
    valueBody={this.state.body}
    valueExcerpt={this.state.excerpt}
    valueImage={this.state.image}
    handleTitleChange={this.handleTitleChange} 
    handleBodyChange={this.handleBodyChange} 
    handleImageChange={this.handleImageChange}
    handleCategoryChange={this.handleCategoryChange} 
    handleExcerptChange={this.handleExcerptChange}
    submitPost={this.submitPost.bind(this)} 
/>
```
<br/>

As well as passing the state down to the child component, we also link our `onChange` functions for each individual form input. 

<br/>

This allows us to call these functions within the child component, for example: 

`this.props.handleTitleChange()` can be called within the `PostForm` component since we linked the parent function in this way: `handleTitleChange={this.handleTitleChange}` . 

<br/>

We also have to link the `submitPost` function so that we can call it once the form is submitted from the child component.

<br/>

When the user hits the submit button, we need to call the parent method like so:

```js
//Child component
<form className="contact-form" onSubmit={e => {
    e.preventDefault();
    //Call method from parent component to handle submit
    this.props.submitPost();
    //reset form.
    e.target.reset();
}}>
```
`e.preventDefault()` here might be unneccesary, but it's used to prevent the default action of the form event.

<br/>

And finally, we pass the state data to the redux action being performed, in my case `addPost`:

```js
//Parent component
submitPost(){
    this.props.addPost(this.state).then((post) => {
        postSuccess = true;        
    })
    .catch(err => console.log("Promise err: ", err));
}
```

* Here we are using JavaScript promises as it's a simple way to execute, compose and manage asynchronous operations.
* `addPost` is a function that we want to call to utilize redux actions we will create. I'm not going to explain redux here as I'm still learning it myself.

<br/>

Let's map the redux action to the props. (We create this action in part 2.)

This means we can call `this.props.addPost` as above:

```js
const mapDispatchToProps =(dispatch) => {
    return {
      addPost: post => dispatch(postActions.createPost(post))
    }
};
```

* `addPost` takes one argument, namely `post` which will contain all the form input data.
* `mapDispatchToProps` is the conventional way to map actions to props.

<br/>

From this point we have successfully passed the image data from the form component, to it's parent component and is now sent to the action creator where the HTTP request will be sent.

Find out in part 2 how to create a redux-based action creator, and then correctly configure the HTTP request payload.