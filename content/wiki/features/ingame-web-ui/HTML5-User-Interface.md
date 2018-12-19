Branches | Issues | Main developers
-------- | ------ | ---
[cef](/inexorgame/code/tree/cef), [cef+entities](/inexorgame/code/tree/cef+entities), [cef+ipc+entities](/inexorgame/code/tree/cef+ipc+entities), [cef+ipc+entities+bezier](/inexorgame/code/tree/cef+ipc+entities+bezier), [rebased-cef+entities](/inexorgame/code/tree/rebased-cef+entities), [additional bug fix branches](/inexorgame/code/branches/all?utf8=%E2%9C%93&query=cef), [karo+fohlen+hanack/fix_cef](/inexorgame/code/tree/karo+fohlen+hanack/fix_cef) |  [#50](/inexorgame/code/issues/50), [#292](/inexorgame/code/issues/292) [Label: cef](/inexorgame/code/labels/cef) | [@aschaeffer](/aschaeffer), [@koraa](/koraa), [@a-teammate](/a-teammate), [@IAmNotHanni](/IAmNotHanni), [@Fohlen](/Fohlen)

### Goals

* User interface in standard HTML5 / JavaScript
* Rendering of HTML5 over a transparent 2D-Overlay (multiple layers)
* Forward SDL2 input events (mouse and keyboard) to the HTML5 browser
* Remove cube2's user interface build with cubescript
* Provide a single page application build with standard technologies and frameworks
* Use the model view controller pattern for implementing menus
* Use a framework for implementing a single page application
* Use a framework for implementing a responsive user interface
* Implementation of menus and HUDs
* Communicate with the Inexor application server (NodeJS) which is exposing the property tree as REST webservice
* Server only: Provide a web user interface for administration

[![Early demonstration of Inexor with HTML5 user interface](http://img.youtube.com/vi/eFMS_bXPDr8/0.jpg)](http://www.youtube.com/watch?v=eFMS_bXPDr8)


### Used Technologies

#### Chromium Embedded Framework / HTML5 Rendering Engine

* With the "Chromium Embedded Framework" (CEF) we can embed the browser engine "Chromium" which is the open source project Google Chrome is built on
* The HTML5 technology is widely used and very suitable for Inexor and brings much more flexibility
* No need for a custom implementation of an user interface technology

##### CEF Resources

* https://bitbucket.org/chromiumembedded/cef
* http://coherent-labs.com/blog/what-developers-should-consider-when-using-chromium-embedded-framework-cef-in-their-games/
* http://blog.erikd.org/2013/01/14/chromium-embedded-framework-3-bare-bones/
* https://bitbucket.org/chromiumembedded/cef/wiki/GeneralUsage
* http://magpcss.org/ceforum/apidocs/index.html

#### AngularJS

* Model View Controller Pattern
* Two Way Data Binding (template and controller can modify objects)
* Dependency Injection (automatically wires dependencies at runtime)
* Single Page Application (a single page with inter page navigation)
* Templates, Directives, Expressions, Scopes, Filters, Modules
* A wide palette of angular modules (plugins) is available

##### Resources

* https://angularjs.org/
* https://docs.angularjs.org/
* http://ngmodules.org/
* http://www.encodedna.com/angularjs/tutorial/my-favorite-angularjs-features.htm
* http://code.tutsplus.com/tutorials/5-awesome-angularjs-features--net-25651

#### Bootstrap

* Responsive 

##### Bootstrap Resources

* http://getbootstrap.com/
* https://bootstrapbay.com/blog/reasons-to-use-bootstrap/

#### Bower & RequireJS

* Dependency Management for JavaScript Modules

### REST

* The REST user interface is the bridge between Inexor's HTML/JS user interface and Inexor's node.js application server
* We need some sort of two-way-data binding for the property tree

### Menus

We have two types of user interfaces: HUDs and menus

#### HUDS

* Mouse hidden
* May accept key input (console HUD)
* May not accept key input (score board HUD, game HUD)
* Doesn't accept mouse input / Mouse hidden
* Examples: console, score board, game states/ammo/flags, ...

#### Menus

* Mouse visible
* Accepts key input
* Accepts mouse input
* Examples: Main Menu, Multiplayer, Bot Match, Options, Texture Browser, ...

### Further development

* We will still need to do a lot of refactoring
* Implement the data exchange of the property tree:
 * Inexor HTML5 user interface --REST-->
  * Inexor node.js app server --protobuf-->
   * Inexor core game client
 * Inexor core game client --protobuf-->
  * Inexor node.js app server --REST-->
   * Inexor HTML5 user interface
* The console HUD needs easylogging to be merged into master



## Proposal and thoughts by MartinMuzatko/Misan

Regarding Webtechnologies, I'd love to propose a few more options for Styling, Templating and interactive components.

### Build System

In order to use CSS Preprocessors and to transpile typescript or coffeescript to javascript, a build system is required. Preferably webpack or gulp.

### CSS - Styles

Using Sass or Less to build our own components. 
We have to declare our own styleguide for colors, typohraphy and components and how to use each in which context.

Nearly all js components offered by bootstrap are not interesting for our project. Just the CSS components such as buttons or badges would be interesting. This is because the platform we use fundamentally requires other components than bootstrap has to offer. A list of components that we'd need is listed here: https://github.com/inexorgame/ui-prototype#components

The atlassian UI offers way more different components to see what we could need: https://docs.atlassian.com/aui/latest/docs/auiselect2.html

So it is to evaluate what we need and how to develop these components to fit our theme, which has yet to be decided, see Issue [#304](https://github.com/inexorgame/code/issues/304)
 
Secondly, the grid system doesn't suit our needs either. Which is why I'd go with something more sophisticated as Flexbox. [Angular Material](https://material.angularjs.org/latest/layout/alignment) does a great job to implement this layout grid as a framework. Since they do not offer a standalone version of the grid anymore, I decided to provide it on my own: https://github.com/MartinMuzatko/flexproperties/.

### Javascript - Reusable components

Angularjs (1.x) is **not** suited for the task. Yes, it implements the model view controller pattern, but in a way that reusable components are almost unfeasible to implement. Or even nested components. Google does not continue their support for 1.x since Angular2 is going to replace 1.x entirely.

I would propose to use VueJS, as we already do for our Website project.
