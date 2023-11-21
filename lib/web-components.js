import { content as blogPostCardHtml} from "../lib/blog-post-card-html.js"

import { content as sidebarHtml } from "../lib/side-bar-html.js"

import { content as blogShellHtml } from "../lib/blog-shell-html.js"

function getParentCustomElement(element)
{
    let parentCustomElement = element;

    while (parentCustomElement.host == "" || parentCustomElement.host == undefined)
    {
        parentCustomElement = parentCustomElement.parentNode;
    }

    return parentCustomElement.host;
}

function getStylePropertyOfElement(element, propertyName)
{
    let stylePropertyValue = element.style[propertyName];

    if (stylePropertyValue == "")
    {
        stylePropertyValue = getComputedStyle(element)[propertyName];
    }

    return stylePropertyValue;
}

class BlogPostCard extends HTMLElement
{
    static observedAttributes = ["header"];

    /**
     * @type {ShadowRoot}
     */
    #shadow = null;

    #titleHeader = null;

    constructor()
    {
        super();
    }

    get header()
    {
        return this.#titleHeader.innerText;
    }

    set header(value)
    {
        this.#titleHeader.innerText = value;
    }

    init()
    {
        try
        {
            this.#shadow = this.attachShadow(
                {
                    mode: "open"
                }
            );
    
            this.#shadow.innerHTML = blogPostCardHtml;

            this.#titleHeader = this.#shadow.getElementById("header");
        }
        catch (exception)
        {
            // NOTE: Add a logging statement here in case of any errors or during a debugging process.
        }
    }

    connectedCallback()
    {
        this.init();
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();

        switch (attribName)
        {
            case "header":
            {
                this.header = newValue;

                break;
            }
            default:
            {
                break;
            }
        }
    }
}

class Sidebar extends HTMLElement
{
    static observedAttributes = ["sidebar-width", "sidebar-height", "horizontal-shrink-speed", "horizontal-expand-speed"];

    #shadow = null;

    #toggleButton = null;

    #mainContainer = null;

    #currentHorizontalAnimationIntervalID = -1;

    #originalSidebarLeftPadding = 0;

    #originalSidebarWidth = 0;

    #originalSidebarRightPadding = 0;

    horizontalShrinkSpeed = 1;

    horizontalExpandSpeed = 1;

    constructor()
    {
        super();
    }

    init()
    {
        try
        {
            this.#shadow = this.attachShadow(
                {
                    mode: "open"
                }
            );
    
            this.#shadow.innerHTML = sidebarHtml;

            this.#toggleButton = this.#shadow.getElementById("toggleButton");

            this.#mainContainer = this.#shadow.getElementById("mainContainer");

            this.#toggleButton.addEventListener("mouseup", this.onToggleButtonMouseUp.bind(this));

            window.addEventListener("resize", this.onWindowResize.bind(this));

            this.#mainContainer.style["maxHeight"] = window.innerHeight - 20 + "px";

            this.updateToggleButtonPosition();
        }
        catch (exception)
        {
            // NOTE: Add a logging statement here in case of any errors or during a debugging process.
        }
    }

    onWindowResize(uiEventObj)
    {
        this.updateToggleButtonPosition();
    }

    getSidebarWidth()
    {
        return parseFloat(getStylePropertyOfElement(this.#mainContainer, "width").replace("px", ""));
    }

    getSidebarHeight()
    {
        return parseFloat(getStylePropertyOfElement(this.#mainContainer, "height").replace("px", ""));
    }

    getSidebarLeftPadding()
    {
        return parseFloat(getStylePropertyOfElement(this.#mainContainer, "paddingLeft").replace("px", ""));
    }

    getSidebarRightPadding()
    {
        return parseFloat(getStylePropertyOfElement(this.#mainContainer, "paddingRight").replace("px", ""));
    }

    getSidebarTotalWidth()
    {
        return this.getSidebarLeftPadding() + this.getSidebarWidth() + this.getSidebarRightPadding();
    }

    setSidebarLeftPadding(leftPadding)
    {
        this.#mainContainer.style["paddingLeft"] = leftPadding + "px";

        this.updateToggleButtonPosition();
    }

    setSidebarWidth(width)
    {
        this.#mainContainer.style["width"] = width + "px";

        this.updateToggleButtonPosition();
    }

    setSidebarHeight(height)
    {
        this.#mainContainer.style["height"] = height + "px";
    }

    setSidebarRightPadding(rightPadding)
    {
        this.#mainContainer.style["paddingRight"] = rightPadding + "px";

        this.updateToggleButtonPosition();
    }

    shrinkSidebarTickCallback()
    {
        for (let currentSidebarOptionIndex = 0; currentSidebarOptionIndex < this.children.length; currentSidebarOptionIndex++)
        {
            this.children[currentSidebarOptionIndex].style["visibility"] = "hidden";
        }

        let currentSidebarLeftPadding = this.getSidebarLeftPadding();

        let currentSidebarWidth = this.getSidebarWidth();

        let currentSidebarRightPadding = this.getSidebarRightPadding();

        let newSidebarLeftPadding = currentSidebarLeftPadding - this.horizontalShrinkSpeed;

        if (newSidebarLeftPadding > 0)
        {
            this.setSidebarLeftPadding(newSidebarLeftPadding);

            return;
        }
        else
        {
            this.setSidebarLeftPadding(0);
        }

        let newSidebarWidth = currentSidebarWidth - this.horizontalShrinkSpeed;

        if (newSidebarWidth > 0)
        {
            this.setSidebarWidth(newSidebarWidth);

            return;
        }
        else
        {
            this.setSidebarWidth(0);
        }

        let newSidebarRightPadding = currentSidebarRightPadding - this.horizontalShrinkSpeed;

        if (newSidebarRightPadding > 0)
        {
            this.setSidebarRightPadding(newSidebarRightPadding);

            return;
        }
        else
        {
            this.setSidebarRightPadding(0);
        }

        clearInterval(this.#currentHorizontalAnimationIntervalID);

        this.#currentHorizontalAnimationIntervalID = -1;
    }

    expandSidebarTickCallback()
    {
        let currentSidebarLeftPadding = this.getSidebarLeftPadding();

        let currentSidebarWidth = this.getSidebarWidth();

        let currentSidebarRightPadding = this.getSidebarRightPadding();

        let newSidebarLeftPadding = currentSidebarLeftPadding + this.horizontalExpandSpeed;

        if (newSidebarLeftPadding < this.#originalSidebarLeftPadding)
        {
            this.setSidebarLeftPadding(newSidebarLeftPadding);

            return;
        }
        else
        {
            this.setSidebarLeftPadding(this.#originalSidebarLeftPadding);
        }

        let newSidebarWidth = currentSidebarWidth + this.horizontalExpandSpeed;

        if (newSidebarWidth < this.#originalSidebarWidth)
        {
            this.setSidebarWidth(newSidebarWidth);

            return;
        }
        else
        {
            this.setSidebarWidth(this.#originalSidebarWidth);
        }

        let newSidebarRightPadding = currentSidebarRightPadding + this.horizontalExpandSpeed;

        if (newSidebarRightPadding < this.#originalSidebarRightPadding)
        {
            this.setSidebarRightPadding(newSidebarRightPadding);

            return;
        }
        else
        {
            this.setSidebarRightPadding(this.#originalSidebarRightPadding);
        }

        clearInterval(this.#currentHorizontalAnimationIntervalID);

        this.#currentHorizontalAnimationIntervalID = -1;

        for (let currentSidebarOptionIndex = 0; currentSidebarOptionIndex < this.children.length; currentSidebarOptionIndex++)
        {
            this.children[currentSidebarOptionIndex].style["visibility"] = "visible";
        }
    }

    onToggleButtonMouseUp(eventObj)
    {
        if (this.#currentHorizontalAnimationIntervalID == -1)
        {
            if (this.getSidebarTotalWidth() == 0)
            {
                this.#currentHorizontalAnimationIntervalID = setInterval(
                    this.expandSidebarTickCallback.bind(this),
                    1
                );
            }
            else
            {
                this.#currentHorizontalAnimationIntervalID = setInterval(
                    this.shrinkSidebarTickCallback.bind(this),
                    1
                );
            }
        }
    }

    updateToggleButtonPosition()
    {
        this.#toggleButton.style["left"] = this.#mainContainer.getBoundingClientRect().width + "px";
    }

    connectedCallback()
    {
        this.init();

        /*
        let sidebarMutationObserver = new MutationObserver((mutations) =>
        {
            console.log("Mutation in Sidebar element observed.");

            mutations.forEach((mutation) =>
            {
                console.log(mutation);
            });
        });

        sidebarMutationObserver.observe(this, {
            childList: true,
            attributes: true,
            subtree: true
        });
        */
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();

        switch (attribName)
        {
            case "sidebar-width":
                this.setSidebarWidth(parseFloat(newValue.replace("px", "")));

                this.#originalSidebarLeftPadding = this.getSidebarLeftPadding();

                this.#originalSidebarWidth = this.getSidebarWidth();

                this.#originalSidebarRightPadding = this.getSidebarRightPadding();

                this.updateToggleButtonPosition();
                
                break;
            case "sidebar-height":
                this.setSidebarHeight(parseFloat(newValue.replace("px", "")));

                break;
            case "horizontal-shrink-speed":
                this.horizontalShrinkSpeed = parseFloat(newValue);

                break;
            case "horizontal-expand-speed":
                this.horizontalExpandSpeed = parseFloat(newValue);

                break;
            default:
            {
                break;
            }
        }
    }
}

class SidebarIdleShrinkableState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarShrinkingPaddingRightState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarShrinkingWidthState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarShrinkingPaddingLeftState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarIdleExpandableState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarExpandingPaddingLeftState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarExpandingWidthState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

class SidebarExpandingPaddingRightState
{
    constructor()
    {

    }

    /**
     * Returns true if the state can be exited from, otherwise returns false.
     */
    tick()
    {

    }
}

/*
Sidebar horizontal movement states:
- Idle (Shrinkable).
- Shrinking (Padding Right).
- Shrinking (Width).
- Shrinking (Padding Left).
- Idle (Expandable).
- Expanding (Padding Left).
- Expanding (Width).
- Expanding (Padding Right).
*/

class BlogShell extends HTMLElement
{
    static observedAttributes = [];

    #isInit = false;

    /**
     * @type {ShadowRoot}
     */
    #shadow = null;

    #redirectNameToCallbackMap = {
        "Home": this.onHomeButtonMouseDown,
        "Blog": this.onBlogButtonMouseDown,
        "Contact": this.onContactButtonMouseDown,
        "View the GitHub repository for this blog": this.onViewGitHubRepoButtonMouseDown
    };

    #navBarContainer = null;

    #footerNavContainer = null;

    // Navigation bar buttons
    #homeNavBarButton = null;

    #blogNavBarButton = null;

    #contactNavBarButton = null;

    #viewGitHubRepoNavBarButton = null;

    constructor()
    {
        super();
    }

    onHomeButtonMouseDown()
    {
        window.location.href = "/experimental/index.html";
    }

    onBlogButtonMouseDown()
    {
        window.location.href = "/experimental/blog-page/main.html";
    }

    onContactButtonMouseDown()
    {
        window.location.href = "/experimental/contact-page/main.html";
    }

    onViewGitHubRepoButtonMouseDown()
    {
        window.open("https://github.com/S10239861-NP/Portfolio-Development-Module-Blog", "_blank");
    }

    init()
    {
        if (this.#isInit == true)
        {
            return;
        }

        this.#shadow = this.attachShadow(
            {
                mode: "open"
            }
        );

        this.#shadow.innerHTML = blogShellHtml;

        this.#navBarContainer = this.#shadow.getElementById("navBarContainer");

        this.#footerNavContainer = this.#shadow.getElementById("footerNavContainer");

        for (const redirectName of Object.keys(this.#redirectNameToCallbackMap))
        {
            let navBarButton = document.createElement("button");

            navBarButton.innerText = redirectName;

            navBarButton.addEventListener("mousedown", this.#redirectNameToCallbackMap[redirectName]);

            this.#navBarContainer.appendChild(navBarButton);

            let footerButton = document.createElement("a");

            footerButton.innerText = redirectName;

            footerButton.addEventListener("mousedown", this.#redirectNameToCallbackMap[redirectName]);

            this.#footerNavContainer.appendChild(footerButton);
        }

        this.#isInit = true;
    }

    connectedCallback()
    {
        this.init();
    }

    attributeChangedCallback(attribName, oldValue, newValue)
    {
        this.init();

        switch (attribName)
        {
            default:
            {
                break;
            }
        }
    }
}

customElements.define("blog-post-card", BlogPostCard);

customElements.define("side-bar", Sidebar);

customElements.define("blog-shell", BlogShell);
