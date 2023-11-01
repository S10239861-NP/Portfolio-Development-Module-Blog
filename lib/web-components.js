class BlogPostCard extends HTMLElement
{
    static html = "";

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

        shadow.innerHTML = BlogPostCard.html;

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

async function main()
{
    BlogPostCard.html = await (await fetch("../web-components/blog-post-card/main.html")).text();

    customElements.define("blog-post-card", BlogPostCard);

    customElements.define("side-bar", Sidebar);
}

main();
