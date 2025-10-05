---
layout: blog_post
title: SOLID Principles Checklist (in Python)
category: blog
---

With so many soliloquies of SOLID Principles online, ripe with the same old definitions, theoretical verbosity, and yet, the most basic of examples, I've always found it difficult to digest and keep it all in mind while developing.

So I wanted to create a condensed checklist that is wall hang-worthy.

## SOLID Principles Checklist

- SOLID is a means to an end, not an end in itself
- The end is maintainability.
- SOLID dogmatism should not dirty the code with Needless Complexity

### Single Responsibility Principle

- Each class does one thing and does one thing well
- Each method in a class does one thing and does one thing well
- If a classes' behavior ever changed, it should impact most of its methods
- Aim for short enough methods that can fit on your screen
- Avoid numerous parameters in methods

### Open Closed Principle

When adding a new functionality  
- Base entities aren't modified (closed for modification)
- Other entities extend the base entity (open for extension)
- Use interface, a module in Python, as the base entity
- Opt for composition over inheritance when an interface is not enough

### Liskov Substitution Principle

In class inheritance
- Subclass add to the base class's behavior
- Subclass doesn't replace the base class's behavior
- Parent instance is replaceable with any of child instances w/o side effects

### Interface Segregation Principle

- Base class shouldn't be generalized
- A class shouldn't have any methods it doesn't use
- Multiple interfaces, modules in Python, are better than one

### Dependency Inversion Principle

- A class shouldn't depend on a specific type of class
- Avoid changing the class implementation because of a dependency
- The dependency should be abstracted (generalized)
- Use Dependency Injection
- OCP + LSP = DIP!

#### Further Readings

Following is a famous visualisation of the SOLID principles by a Medium author.  
[The S.O.L.I.D Principles in Pictures by Ugonna Thelma](https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898){:target = "_blank"}

It is common that we go adrift in the profoundness of the principles and concepts, but they could be readily mastered through constant reminders and learning the perspectives of other great minds.  
