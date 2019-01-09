# Get Involved

Glad you want to help us out to make this happen! We will be very happy if you join our team.

So first things first. Depending on your talents and interests, there are multiple ways to help out. The project is split in different workstreams to help you choose where you see yourself most fit. Features have to be implemented on a multitude of layers.

In general, if you are a creator, you will be able to help!

## What can you contribute?

* **Content**
  * [Blog posts and wiki articles](https://github.com/inexorgame/site/blob/master/CONTRIBUTING.md)
  * Textures
  * Map, Weapon and Player Models
  * Music and Sounds
  * Graphics and Illustrations
  * [Voice Acting](https://github.com/inexorgame/code/issues/255)
* **Code**
  * C++
  * Go
  * HTML5, CSS3
  * JavaScript
* **Architecture**
  * Concepts & Feature Ideas

**Current High-Level State:**
Mainly it is the architecture that we need to build up in the first place, before we can really incorporate content. But that doesn't mean projects can't work in parallel.

Grab a topic where you like to contribute and get going.

## What you will need

We maintain our code, contents, documentation and pretty much everything else on [GitHub](https://github.com/inexorgame/).

::: tip Too much?
Do you need a little bit of hand-holding and don't know where to start exactly?
[get in touch](./Contact.md) or browse the list of [features](./features/).

We are glad to help you get going to contribute.
:::

<div class="flex flex-wrap break-out-page-width">
    <h2 class="w-full m-4">Work Streams</h2>
    <div v-for="project in projects" class="lg:w-1/2 p-4">
        <div>
            <h3 class="subheading">
                <a :href="project.html_url">
                    {{project.name}}
                </a>
            </h3>
            <p>{{project.body.replace(/\*\*[oO][\w\W\n]*/gm, '')}}</p>
        </div>
    </div>
</div>

## Pads _(Task lists, cooperative writings, archive..)_
 * https://hackmd.io/CYFhFYCYCMGYEYC0A2e9yJAYwKYENE4AOWRPHCABiz2AE5hLIg==?both

<script>
export default {
    data: () => ({
        projects: []
    }),
    async created() {
        let response = await fetch('https://api.github.com/orgs/inexorgame/projects', {
            headers: {
                'Accept': 'application/vnd.github.inertia-preview+json'
            }
        })
        this.projects = await response.json()
    }
}
</script>

The Features Inexor plans to provide are flexibly documented in our [Issue Tracker](https://github.com/inexorgame/inexor-core/issues)

You can find them grouped as [Milestones](https://github.com/inexorgame/inexor-core/milestones)
or [Projects](https://github.com/orgs/inexorgame/projects)

### Why?

We try to summarize some common question which may come up when thinking about these plans in our [FAQ](https://github.com/inexorgame/code/wiki/Frequently-Asked-Questions)

### History

You might be interested in the [Changelog](https://github.com/inexorgame/code/blob/master/changelog.md) [Sauerbraten Features]() (this is where we started) [Ideas for Features](Feature-Ideas)
