---
title: "Moving to Gatsby"
date: "2019-11-12"
description: "Why I retired my own, ground-up website."
---

Do I regret creating my own blogging-engine and site from the ground up? 

Not at all.

I spent countless hours on something that isn't used. 

So what did I gain in return? 

I gained **experience**. Doing everything myself taught me so much, from front-end to back-end, I had to cover it all myself. I learnt generalised basics such as how HTTP requests actually work, how to create a REST API and how to integrate a database. I learnt the React library basics, as well as managing state using redux.

I spent days on issues such as figuring out how to upload an image from the front-end, send it to the backend and finally store it as a blob in the database (what was I thinking?).

Yes, it was honestly miserable at times. But I persevered and built my own blogging engine, where I could write blog posts from my website using markdown, with the ability to add images.

The code is a total mess, but I'm still proud of it. Why? Because it proved to me that although it's not always easy (and quite often miserable), the journey of tackling something challenging combined with a successful outcome is extremely satisfying.

Okay flaunting out of the way, so why am I retiring my website?

The biggest issue with what I currently had was SEO. Because I was simply using a vanilla react app, content wouldn't load straight away, which meant that google and other search engines crawlers would give it a bad score.

But Callum, Server Side Rendering (SSR) fixes this? Why not simply convert your Single Page Application (SPA) to do server side rendering??

Well, I did consider it. At my current internship, I recently converted a SPA to do SSR. But it wasn't easy, at all. Shoutout to (that guy who did the SSR medium article), as with his legacy code I managed to make it work. There is currently no strong consensus on the right way to do SSR. While I know it's possible for my application to easily become SSR, I had recently read about an alternative solution. 

Gatsby.

Essentially, Gatsby is a React-based static site generator. This means that from your react code, Gatsby produces static files, resulting in incredibly fast load speeds. Since this website is merely a collection of pages, it made sense to use a static site generator.

Oh, and here's a great quote from this Wikipedia on
[salted duck eggs](http://en.wikipedia.org/wiki/Salted_duck_egg).

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

![Chinese Salty Egg](./salty_egg.jpg)
