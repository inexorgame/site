# How should i format my Git commit message?

Try to follow the template from

* https://github.com/conventional-changelog/validate-commit-msg

or

* https://gist.github.com/stephenparish/9941e89d80e2bc58a153

and you're good to go.

We **require** a scope (e.g. "UI" or "network"), though (in contrast to validate-commit-msg, which has it set to `optional`)


# Merging

#### Merging Pull Requests without merge message

    git checkout master
    git pull origin master
    git checkout <<featurebranch>>
    git rebase master
    git checkout master
    git merge <<featurebranch>>


