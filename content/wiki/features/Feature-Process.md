# Feature Process

Features can start out as a little idea or suggestion, and then as more and more parts become more concrete, they move forward on the status axis.

The status type describes a maturity level, which you can decide as an author.
You can also distinguish an issue from a feature. Usually a feature can span multiple repos, multiple parts or services of a system. Issues are usually more specific, have a smaller scope and are to the point.

## Status Types

* <StatusBubble type="idea" inverted /> This can be as minimal as a suggestion, but does not necessarily need to describe all touching parts. E.g.: I want a way of managing my clan. Ideas do not have to be realistic in the first instance.
* <StatusBubble type="concept" inverted /> Conceptualizes which parts of the system need to be touched. E.g. This is what the UI should have, this is what the underlying servers need to do. It is a more complete form of the idea, but not concrete enough for a specification. Usually after an idea got appeal from more than one developer, that created it, it makes sense to move it to the stage of a concept.
* <StatusBubble type="specification" inverted /> Full specifications are as complete as possible documentations for implementors. This way we can agree upon what and how to implement the feature.
* <StatusBubble type="implemented" inverted /> This is now part of the game. It can always be extended, but for little improvements, GitHub issues should be used. In the end, feature documentations help with the overall direction.

You can start out by creating a pull request - we created a template for you.

<router-link to="Template-Feature.html" class="button my-4">Add new feature ➕</router-link>