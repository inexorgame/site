### Git

We divided the Project in [**only-code**](https://github.com/inexorgame/inexor-core) (the game itself) and [**only-data**](https://github.com/inexorgame/data) (game content like maps). 
Why? Because checkouts and commits are much faster without binary blobs.

Avoid committing binaries into the **code** repository, so the repository stays lightweight.

### Adding new features

Presteps:  
* Always helpful: [Speak with the other Inexor people](Contact) about your feature idea.

* Take some time to document a roadmap for yourself. Which features would you like to work on or help implementing them? 
  * Pick up an issue. We have **_[good first bug](https://github.com/inexorgame/inexor-core/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)_** (meaning small Inexor related preknowledge is required) issues to help you getting started:
    * [difficulty beginner](https://github.com/inexorgame/code/issues?q=label%3A%22good+first+bug%22+label%3Adiff%3Abeginner+is%3Aopen); Task which doesn't require you to have any previous experiences with the used language/the used technologies.
    * [difficulty intermediate](https://github.com/inexorgame/code/issues?q=label%3A%22good+first+bug%22+label%3Adiff%3Aintermediate+is%3Aopen); You already made first touch with the used language and are ready for more.
    * [difficulty advanced](https://github.com/inexorgame/code/issues?q=label%3A%22good+first+bug%22+label%3Adiff%3Aadvanced+is%3Aopen); Trickier tasks which also requires you to have some experience with the language and in approaching tasks.
  * You have a new idea for which we don't have an existing issue? (**Use the search first!**)
    * [Create a new issue](https://github.com/inexorgame/code/issues/new)
    * Positive feedback from an Inexor team member will verify you the feature fits into the big picture


***

_If you don't understand the following steps, this [Git-Tutorial](http://pcottle.github.io/learnGitBranching/) could help._
* [Fork the repository](https://help.github.com/articles/fork-a-repo/) and [clone your fork](https://help.github.com/articles/cloning-a-repository/)

1. Create a new branch
 * master-branch has to stay functional
 * naming usually `<yournick>/<newfeature>` so e.g. `donald_trump/great_wall`

2. Develop the feature in your branch
 * Checkout your branch
 * Develop your feature
 * Respect our [Coding Standards](#Coding-Standards) (don't worry if you don't understand every detail, reviewing your work we will notify you about passages adaptions are needed)
 * At every logical step, commit your work to git
    * Commit often (but logically)
       * Your feature has to be merged into other branches as easy as possible
       * Big commits often make problems then
       * Use meaningful (!!!) commit messages, with your feature prepending your message e.g. "[physics] add gravity modifiers `<new line> <empty line>` More detailed description"
 * Push your work to the remote repository on GitHub

3. [Create a Pull Request](https://help.github.com/articles/using-pull-requests/)
 * You don't need to be completely finished with your work, you can create Pull Requests to get early feedback, just  note it then.
 * You might get requests to change several things about your implementation.


### Experiments welcome

Experiments are allowed and encouraged. But: Don't be upset if your idea is getting outvoted by the other Inexor people. If a feature is not a core functionality or controversial, better develop it as a plugin.

# Coding Standards
**Develop modular, clean and document your work.**

* Document your functions and its parameters
* Test your functions in a file called <your_tested_filename>_test.cpp

And generally speaking it is advised to produce
* No spaghetti code
* No code duplication
* No overengineering
* Refactor your work

## Codestyle

The Codestyle will be enforced by a common standard.
The standard is chosen based on the particular language, if the language does not have a standard (e.g. C++), one will be chosen.
