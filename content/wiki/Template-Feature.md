Branches | Issues | Main developers
-------- | ------ | ---
[ogro/conquer_world](/inexorgame/code/tree/ogro/conqueror_world), [inky/killing_spree](/inexorgame/code/tree/inky/killing_spree) | [#6](/inexorgame/code/issues/6), [#7](/inexorgame/code/issues/7) | [@inexorgame](/inexorgame)

## Motivation
The goal is to provide for everyone a unified template how to write a wiki article about a feature. Another goal is to get people to actually use it.

## Template _or: **What is is about?**_  
A template is according to [Wikipedia](https://en.wikipedia.org/wiki/Template) _a pre-developed page layout used to make new pages with a similar design, pattern, or style and a predefined letter which retains its primary intent when individually customised with variable data or text_.  

This template in specific will help to create consistence in our wiki.

## Implementation
Every feature page should contain at the beginning the **table, which includes the feature branches, the issues** (or pull requests if there is no issue at all) **and the main developers** of this specific feature. If you have several branches, issues or developers then separate them with commas and a space. There is _always_ just one line/table row.

* **Branches:** always display the full and original names and link to all related and relevant branches. If your feature is completely merged into master, just write `master` without any link. Branches for small and relative quick realized bug fixes are irrelevant.
* **Issues (or pull requests):** Write before the number a `#` to keep it consistent on GitHub. Mention all relevant issues. Issues for bug fixing are irrelevant. If your feature is so big that it has an own issue label, mention it as well, e.g. `[Label: cef](/inexorgame/code/labels/cef)`
* **Main Developers:** Use the GitHub nicknames, link to the profile, write a `@` before the name to keep it consistent on GitHub.

The second part of every feature article should be the **motivation** behind it. Why are we implementing that? What is the purpose? What are the goals?

After the motivation you should explain the details what you are talking about. Explain less known words. **Explain what your feature can or will be able to do**.

Last but not least, if it's appropriated explain in the last part of your article **how we are going to implement it** and give **technical details**.

After you have written your article add it to the feature overview on the wiki homepage.


