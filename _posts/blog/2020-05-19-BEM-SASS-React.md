---
layout: blog_post
title: BEM and SASS in ReactJS applications
category: blog
---

Unless you are using Styled-components for styling ReactJS components, the choice of class naming convention directly affects the productivity and more.  

There's no argue why we should be using some CSS preprocessors instead of plain CSS.
Read through <a href="https://www.mugo.ca/blog/7-benefits-of-using-SASS-over-conventional-CSS" target="_blank">7 benefits of using SASS over conventional CSS</a> to remind yourself of why.  
SASS provides 2 different syntaxes - SASS and SCSS. I prefer SCSS as it is CSS-compatible, meaning that when you rename your CSS file from `XYZ.css` to `XYZ.scss`, it immediately becomes a valid SCSS file.  

Now, what is BEM?  
BEM, which stands for Block-Element-Modifier, is one of the most well-accepted CSS naming conventions.  
To give you a quick & easy overview of what BEM looks like:

**Block (B)**
```html
<div class="book">...</div>
```
```css
.book {
  color: #EFEFEF;
}
```
**Element (E)**
```html
<div class="book">
  ...
  <span class="book__author"></span>
</div>
```
```css
.book__author {
  color: #004345;
}
```
**Modifier (M)**
```html
<div class="book book--sold">...</div>
```
```css
.book--sold {
  text-decoration: stroke;
}
```
(reference: <a href="http://getbem.com/naming/" target="_blank">BEM — Block Element Modifier</a>)

Besides enabling a global naming rule for your project and the team, BEM provides several other advantages.
- Better HTML/CSS decoupling
- Better CSS performance
- No CSS conflicts
- Ease of code maintenance  
(reference: <a href="https://www.altitudesystems.co.uk/blog/2017/july/to-bem-or-not-to-bem-that-is-the-question" target="_blank">To BEM or not to BEM? That is the question.</a>)

BEM couples well with SCSS syntax. Imagine you write CSS rules for a book element.
```html
<div class="book">
  <span class="book__author">Napoleon Hill</span>
  <span class="book__title">Think and Grow Rich</span>
</div>
<div class="book book--sold">
  <span class="book__author">David Schwartz</span>
  <span class="book__title">The Magic of Thinking Big</span>
</div>
```
```css
.book { background-color: black; }
.book__author { color: white; }
.book__title { font-weight: bold; color: white; }
.book--sold { text-decoration: stroke; }
```
Let's rewrite this rule in SCSS.
```scss
.book {
  background-color: black;
  
  &__author {
    color: white;
  }
  &__title {
    font-weight: bold;
    color: white;
  }
  
  &--sold {
    text-decoration: stroke;
  }
}
```
The nested syntax of SCSS plays a major role in the beauty of BEM blended in SCSS.  

***
---
With the basic knowledge of SCSS and BEM so far, let's explore my self-found best practice for writing component styles using them.  
Let us assume that we are working on a project structure like the following:
```
project
 - src
   - components
     - Book.jsx
     - Book.style.scss
     - Article.jsx
     - Article.style.scss
     - ...
   - containers
     - Archive.container.jsx
     - Archive.style.scss
     - ...
   - styles
   - utils
 - node_modules
 - ...

```
One of the common misconceptions when writing a component style is ignoring the name conflicts.  
Imagine we write styles for Book component and Article component separately.

**Book.jsx**
```jsx
...
import './Book.style.scss';
...
export default ({ author, title }) => (
  <div className="book">
    <span className="author">{author}</span>
    <span className="title">{title}</span>
    ...
  </div>
);
```
**Book.style.scss**
```css
.author { color: white; }
.title { font-weight: bold; color: white; }
```
**Article.jsx**
```jsx
...
import './Article.style.scss';
...
export default ({ author, title }) => (
  <div className="article">
    <span className="author">{author}</span>
    <span className="title">{title}</span>
    ...
  </div>
);
```
**Article.style.scss**
```css
.author { color: blue; }
.title { text-decoration: underline; color: blue; }
```
One could falsely assume that these two styles are kept local to the respective components, but they are not. As and when these two components render on the same page, the unwanted conflicts of CSS rules occur.  
Note the resulting HTML page source:
```html
<body>
  ...
  <div class="book">
    <span class="author">Napoleon Hill</span>
    <span class="title">Think and Grow Rich</span>
  </div>
  ...
  <div class="article">
    <span class="author">joseph tan</span>
    <span class="title">BEM and SCSS in ReactJS applications</span>
  </div>
  ...
</body>
<style>
  ...
  .author { color: white; }
  .title { font-weight: bold; color: white; }
  ...
  .author { color: blue; }
  .title { text-decoration: underline; color: blue; }
  ...
</style>
```
The prettiest solution to the above issue is applying scopes, the unique namespaces, for each component style definitions.

**Book.style.scss**
```scss
.book {
  .author {
    color: white;
  }
  .title {
    font-weight: bold;
    color: white;
  }
}
```
**Article.style.scss**
```scss
.article {
  .author {
    color: blue;
  }
  .title {
    text-decoration: underline;
    color: blue;
  }
}
```
If you chose to use BEM, the namespacing of component styles would come naturally, and you don't need to stress about remembering it every time. Meanwhile, your application benefits from the aforementioned BEM advantages as well.

**Book.style.scss**
```scss
.book {
  &__author {
    color: white;
  }
  &__title {
    font-weight: bold;
    color: white;
  }
}
```
**Article.style.scss**
```scss
.article {
  &__author {
    color: blue;
  }
  &__title {
    text-decoration: underline;
    color: blue;
  }
}
```

**Caution:** Stick to the habit of assigning UNIQUE class names to the root DOM elements of your components. Otherwise, the conflicts of CSS rules will happen.
