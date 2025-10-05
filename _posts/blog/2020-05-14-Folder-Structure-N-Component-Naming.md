---
layout: blog_post_proj_structure
title: Developer's Dilemma - Folder structure and Component naming
category: blog
---

I bet, for many developers or for me at least, there's often a dilemma in the initial phase of a development project.  
That is ...  
> How to set up the folder structure and file naming conventions, a.k.a the project structure?

Project structure plays a critical role in the long-term productivity, maintainability and architectural excellency of any development project.  
Having laid it out myself as well as worked on someone else's setup, I learned it the hard way.  

As ReactJS is my primary FE library of choice, this article will depict a sample ReactJS project and its structure.  
<small>Precaution: Nothing here is written in rocks, the methodology I am describing here is just one of many approaches 😏</small>

### Folder Structure
One of the questions I often face is regarding to how structure files and folders. In this post, I am starting off with a minimum structure, the one created with `create-react-app`.  
The `create-react-app` generates a basic project for us, containing in its root, the files: `.gitignore`, `package.json`, `README.md`, `yarn.lock`  

![initial structure by create-react-app](/img/blog/create-react-app-structure.png)  

It also generates the folders: `public` and `src`. The last one is where we keep our source code.

### Containers and Components
I tried the separation between Containers and Presentation Components in the project’s root folder. I mean, inside src, I had a folder named `components` and another folder named `containers`:
![following the conceptual separation in the project structure](/img/blog/component-container-sep.png)
However, this kind of approach introduced some issues like:
- Subjectives rules  
You don’t have clear rules about what is a Container and what is a Presentational Component. The difference between each other can be subjective and when you are in a team, it will be hard to have all the developers agreeing and judging equally this matter.  

![lol...](/img/blog/subjective.jpg)  

- Lost dynamism of the components  
Even when you decide a component fits in one of the specific types, it’s easy to get it changed along the project lifetime, and forcing you to move it from components to containers folder and vice-versa.
- Components with the same name  
Components should have declarative and unique names in the application, to avoid confusion about the responsibility of each one. However, the above approach opens a breach to having two components with the same name, one being a container and other being a presentational.
- Productivity loss  
You have to constantly navigate between containers and components folders, even when working in a single feature. Because it’s common that a single feature has components of the two types.

For those reasons, I realized that when organizing folders and files, it’s irrelevant to split the components by the concept of presentational vs container.

### Separating and grouping the code
Inside the `components` folder, I would group the files by module/feature.  

For example, for a CRUD of user, the structure would be as the following:  

![scoped for user module](/img/blog/components-user-scope.png)  
When a component is composed by more than one file, I'd put this component and its files in a folder with the same name. Eg: Let’s say you have a `Form.css` containing the `Form.jsx`’s styles. In this case, the structure would be like:  

![scoped for user module (enhanced)](/img/blog/components-user-scope-enhanced.png)

The test files stay with the file that is being tested. In the above case, the test for `Form.jsx` would stay in its same folder and would be named as `Form.spec.jsx`

### UI Components
Beyond separating the components by modules, I'd also include a `UI` folder inside `src/components`, to keep all the generic components in it.  
UI components are components generic enough not to belong to a module and likely to be reused. 
I could go with `Common` instead of `UI`, but the name `UI` represents the difference well with `logic`.  
Examples of these components are: Buttons, Inputs, Checkboxes, Selects, Modals, Data display elements, etc…

### Naming components
The name we give to the components, should be clear and unique in the application, in order to make them easier to find and to avoid possible confusions.  
A component’s name is very handy when we need to debug using tools as `React Dev Tools`, and when run time errors happen in the application. The error always come with the component name where it happened.  
Basically, a component that is located at: `components/User/List.jsx` would be named as `UserList`.  
When the file is inside a folder with same name, we don’t need to repeat the name. That said, `components/User/Form/Form.jsx`, would be named as `UserForm` and not as `UserFormForm`.

- Search for the component definition  
I use `sublime` or `VSCode` as the IDE for the web development, and they support the <abbr title="Fuzzy matching allows you to identify non-exact matches of your target item.">fuzzy search</abbr>.  
Therefore, file name not being identical to the component name doesn't pose any difficulty in search.  
![fuzzy search on sublime](/img/blog/fuzzy-search-sublime.png)  

- DRY on imports  
When I followed this naming convention, I could avoid some lengthy and repeated names in the import path.  
![shorter import path](/img/blog/shorter-import-path.png)

### Screens
Screens, as the name already suggests, would be the screens that we have in the application.  
For `users` scope, we would have a screen for the user list, a screen for creating a user and a screen for editing a user.  
A screen is where I use components to compose a page. Most of the time, the screen would’t contain any logic and would be a functional component.  
```jsx
import React from 'react';
import UserForm from '../../components/User/Form/Form';

const ScreensUserForm = ({ match: { params } }) => (
  <div>
    <h1>
      {`${!params.id ? 'Create' : 'Update'}`} User
    </h1>
    <UserForm id={params.id} />
  </div>
);

export default ScreensUserForm;
```
And the folder structure and component naming within the `screens` folder should follow the same convention as the `components` folder, except that we conveniently add a prefix to descriminate the screen components, i.e. `ScreensUserForm`  
The final structure of this example project would look like:  

![the final project structure](/img/blog/final-proj-structure.png)

<small>Note that `Root.jsx` is the component where routing is defined</small>

### Additional thoughts
Personally, I would put some non-component files in the relevantly named folders directly under `src` folder.  
For example, `utils` for the helper functions, `hooks` for custom hooks, and `services` for API handlers.

### Conclusion
This approach is definitely a __work in progress__ as I'd constantly seek for a better alternative, be it an enhanced version of this one or a completely different one.  
The foremost question is if I really need `Screens` folder, but it seems convenient at the moment.  

<small>To be continued ...</small>