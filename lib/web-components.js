import { content as blogPostCardHtml} from "../lib/blog-post-card-html.js"

class BlogPostCard extends HTMLElement
{
    static observedAttributes = ["header"];

    #initialized = false;

    /**
     * @type {ShadowRoot}
     */
    #shadow = null;

    #titleHeader = null;

    constructor()
    {
        super();
    }

    init()
    {
        if (this.#initialized == false)
        {
            this.#shadow = this.attachShadow(
                {
                    mode: "open"
                }
            );
    
            this.#shadow.innerHTML = blogPostCardHtml;

            this.#titleHeader = this.#shadow.getElementById("header");

            this.#initialized = true;
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
                this.#titleHeader.innerText = newValue;

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
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        let shadow = this.attachShadow(
            {
                mode: "open"
            }
        );

        shadow.innerHTML = `
        <div>

        </div>
        `;
    }
}

customElements.define("blog-post-card", BlogPostCard);

customElements.define("side-bar", Sidebar);
