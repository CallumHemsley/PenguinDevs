---
title: "Handling images in React"
date: "2019-11-17"
description: "Learn quickly how to handle images with React by allowing users to select images, then send those images to the backend."
type: "tldr"
---

While you could implement this all yourself, it's much easier to use **react-dropzone**.
(Note - You must have a React version above *>= 16.8*)

In this example I'll be using **create-react-app** to demo, with react version **16.12**.

So first, let's install **react-dropzone**: `npm install --save react-dropzone`

(I'm using react-dropzone version **10.2.0**)

### Using react-dropzone

Now to coding. We can use the `Dropzone` component as a wrapper like so inside App.js:

```jsx{10}
import React from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

function App() {  
  return (
    <div className="App">
      <header className="App-header">
        <Dropzone 
          onDrop={acceptedFiles => onImageDrop(acceptedFiles)}
          multiple={false}
          accept="image/*"
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()} >
                  <input {...getInputProps()} />
                  <p>Drop an image or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>
      </header>
    </div>
  );
}
```
<br>

- Set `multiple` to true inside the `Dropzone` wrapper if you want users to be able to select multiple images.
- Currently, only images are accepted. If you want any file to be accepted, remove the `accept` property from `Dropzone`.
- As highlighted, `onDrop` is the function that will be called when an image is given.

### Getting the Image file

Next, let's start coding the `onDrop` function.

```jsx{3}
function App() {
  function onImageDrop(acceptedFiles) {
    const imageFile = acceptedFiles[0]; //We only accept one file.
    console.log(imageFile);

    ... //more below
  }
```

All we have to do here is get the **first** file within acceptedFiles, since we're only accepting one file at a time. 

*(pro tip - Check out the console log to see what the File Object looks like.)*

At this point I would usually be feeding in a redux action creator to make the POST request to the backend. For the sake of simplicity, let's make the request from the same function.

### Sending the POST request

To make the request, I'm using the `axios` library, so let's install that by typing `npm install --save axios` in the terminal.
(I'm using version `0.19`)

Next, let's add the request code inside the `onImageDrop()` function:

```jsx
//Add field value pairs to a FormData Obj
const fd = new FormData();
fd.append('image', imageFile);
fd.append('name', "Callum");

//Make the request form-data so files are OK
const config = {
  headers: {
    'content-type' : 'multipart/form-data'
  }
};

//Define your backend url
const url = "localhost:3001/HELLO";

... //more below
```

So the first thing I did was create a `FormData` object. This makes it clear and easy to set key/value pairs for fields and their respective data.

In this example I added `name` as an extra field to show that it's possible to send multiple fields with varying data types.

Next I created a `config` constant for the axios config.
This is to ensure the header is of content type `multipart/form-data`. This will ensure that File types are accepted as part of the HTTP request **as well as** other types.

*(note - you must replace the url constant with the url of your backend)*

Now, that we have prepared, we can finally make the request:

```jsx
//Make the post
return Axios.post(
  url, fd, config
)
  .then(response => {
    console.log(response);
    //SUCCESS. posted to backend.
  })
  .catch(error => {
    console.log(error);
    //ERROR, something went wrong.
  })
```

Here we do `Axios.post(url, fd, config)` to make the request. This returns a **Promise**.

That means we can use `.then()` which basically means, wait for the asynchronous request to finish, **THEN** if there is a response (no errors) execute the code within.

However, if for example, an internal server error occurs (HTTP code 500), then we console log the error while we are still in development mode. 

*(In production it's better to `Throw` the error, to ensure you can find where the error originated.)*

Well that about wraps this post up.

The full source code of this tl;dr can be found [here](https://github.com/CallumHemsley/tldr-examples/tree/master/handling-images).

**If you have any questions, or improvements etc, please comment below.**