---
title: "Creating a website for as cheap as possible."
date: "2020-04-13"
description: "I've been working on a new website for a side project I'm starting. Here's how I got that up and running fast and efficiently, for just 10 dollars per year."
type: "blog"
---

![new website](/pic.jpg)

Recently I started working on a new side project, [Chinese Simplified](https://www.chinese-simplified.com). This required me to create a website, and I wanted to do that as easily as possible, with minimum spending. Therefore I thought I would document what I found.

Overall I'm spending **10 dollars per year**   to keep this website running.

*Just 10 dollars*, yes you read correctly, so how did I do it?

## Some Background

Firstly, it should be noted that this website had no complex requirements.

All that was required was two sections:

- A blog section for documenting my experiences learning chinese
- A section where you can buy an ebook I'm putting together.

As a result, similar to this blog, I didn't need a dedicated backend server. Furthermore, the website itself wouldn't have too much interaction, and would mostly be a static website where people can view blog posts.

## Getting a Domain name

I decided to get a `.com` domain rather than a `.xyz` domain like this website, for the reason that non-tech people are likely to feel `.com` is more trustworthy as it's where the majority of websites are.

A lot of these domain companies seem to do domain + server deals, but since I wasn't planning on getting a dedicated server, I needed a company that would do domain only for a good price. I found that [hostinger](https://www.hostinger.co.uk/) in the UK had a relatively good deal, and I managed to snag *chinese-simplified.com* for around 10 dollars a year.

This is the **only money I spent** on upkeep for this website, the rest was using free services.

## Deploying my site

So I wanted something cheap (*aka free*) which could deploy my site with ease.

Luckily, I had already solved this mystery due to this blog!

With [Netlify](netlify.com) you can link to your github project so that every time you push a change, the website is automatically updated, built and deployed.

And did I mention for personal websites it's free? It's brilliant and I've encountered no problems as of yet.

> Tip - Don't push every single small change, batch your commits so you don't reach the 250 pushes a month limit.

## Connecting my domain to netlify

There's likely an easier way to connect your domain name to the netlify internal site ip, but I couldn't figure it out. The 'middle man' I used to solve this was [Cloudflare](cloudflare.com).

It's a little complicated but here's what I did:

- Inside Hostinger, I updated the nameservers to point to Cloudflares nameservers.
- Inside Cloudflare, I updated the DNS records to point to my Netlify internal subdomain.
  - These DNS records are of type CNAME.
  - They point to the `*.netlify.app` domain you can find in Netlify settings.
- Inside Netlify, I set the primary domain to be my Hostinger domain.

Cloudflare is also free and has analytics and other goodies that aren't in the free version of Netlify. This way I'm getting the best of both worlds by combining Netlify and Cloudflare.

## Using Gatsby

Once again, in similar fashion to this website, I used gatsby to develop the website.

Gatsby just fits the use case perfectly, with static pages for easy SEO scores and React JS for an easy development experience.

Furthermore, since I wanted to add blog posts to the site, I simply used Gatsbys blog starter template as a base, which is what I did for this blog!

This keeps thing simple, concise and consistent.

## Using Tailwind

For designing this site, I decided it would be a great idea to try [Tailwind CSS](https://tailwindcss.com/).

Tailwind has revolutionised the way I think about designing web pages. Since I've always used components, I would start with someone elses component, and then try to tweak it to my requirements.

However now with Tailwind, I'm starting from scratch and building up the web page as I go. This allows me to be way more **creative**, and it's extremely **satisfying** to see a web page come to life.

I particularly like how Tailwind encourages you to target mobile by default, and specialise as the screen increases, instead of the other way round. Also it's super easy to change things depending on the ratio, e.g `md` vs `xl`.

It's safe to say I won't be going back to component libraries.

## Conclusion

And that's about it. In total I spent only 10 dollars, which shows you money doesn't have to be a problem for running a website.

I've always liked creating things, and for me development is being creative, but applying creativity in a logical manner. However web development goes a stage further for me in that I can instantly see my changes happening instead of waiting for the application to build etc.

#### Doing Everything Yourself

I think as developers, we sometimes just wanna do everything ourselves. For example for this website, instead of using something like gatsby blogging engine, I wanted to build my own from blogging engine from the ground up.

However you should probably ask yourself the following questions before you start building everything yourself:

- Why you are creating this website in the first place?
  - Is it to learn more about web development specifically?
  - Or is there a different goal ultimately?
- Is there any limitations you have?
  - e.g Is there a time limit?
  
I used gatsby and its blogging engine template so I could **focus on the things that mattered** to me.

## Comments

What do you guys think? Is there a better/cheaper way to create a website with your own domain? Let me know down below.
