---
title: "Handling image uploads in React"
date: "2019-11-17"
description: "Learn quickly how to handle image uploads with React by allowing users to select images via drag'n'drop, then send those images to the backend."
type: "tldr"
---

While you could implement this all yourself, it's much easier to use **react-dropzone**.

In this example I'll be using **create-react-app** to demo, with react version **16.12**.

So first, let's install **react-dropzone**: `npm install --save react-dropzone`

(I'm using react-dropzone version **10.2.0**)

### Using react-dropzone

Now to coding. We can use the `Dropzone` component as a wrapper like so inside App.js:

```jsx{9-10}
import React from 'react';
import Dropzone from 'react-dropzone';

function App() {  
  return (
    <div>
      <header>
        <Dropzone 
          onDropAccepted={(acceptedFile) => onImageDrop(acceptedFile)}
          onDropRejected={() => console.log("NOT ACCEPTED")}
          multiple={false}
          accept="image/*"
        >
          {({getRootProps, getInputProps}) => (
            <section 
              style={dropzoneStyle}
            >
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
- `dropzoneStyle` is a css variable, which can be found in the [source](https://github.com/CallumHemsley/tldr-examples/tree/master/handling-images).
- As highlighted, `onDropAccepted` and `onDropRejected` are called when a valid image is uploaded, or an invalid file is uploaded respectively. If it's a valid image file, `onImageDrop()` is called which we will define below.

As you can see below, it is logged in the console when the file is invalid:
![The rejected result](/notAccepted.png "The rejected result")

### Getting the Image file

Next, let's start coding the `onImageDrop` function.

```jsx{4}
function App() {
  function onImageDrop(acceptedFiles) {
    console.log("ACCEPTED")
    const imageFile = acceptedFiles[0]; //We only accept one file.
    console.log(imageFile);

    ... //more below
  }
```

All we have to do here is get the **first** file within `acceptedFiles`, since we're only accepting one file at a time. 

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
const url = "localhost:3001/images";

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

Well that about wraps this post up, let's take a look at the result.

![The end result](/dragndropAccepted.png "The end result")


The full source code of this tl;dr can be found [here](https://github.com/CallumHemsley/tldr-examples/tree/master/handling-images).

**If you have any questions, or improvements etc, please comment below.**