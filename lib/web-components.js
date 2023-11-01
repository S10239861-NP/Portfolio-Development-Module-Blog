import { content as blogPostCardHtml} from "../lib/blog-post-card-html.js"

class BlogPostCard extends HTMLElement
{
    #titleHeader = null;

    constructor()
    {
        super();
    }

    get title()
    {
        return this.#titleHeader.innerText;
    }

    set title(value)
    {
        this.#titleHeader.innerText = value;
    }

    connectedCallback()
    {
        let shadow = this.attachShadow(
            {
                mode: "open"
            }
        );

        shadow.innerHTML = blogPostCardHtml;

        this.#titleHeader = this.getElementsByClassName("sidebar-component-title-header")[0];
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
