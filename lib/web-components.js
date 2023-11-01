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

        shadow.innerHTML = `
<style>
h1, h2, h3, ul, ol, p {
    margin: 0px;
}

.week-blog-entry-container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px;
    border-radius: 6px;
    background-color: #2e83c9;
    color: white;
    border-color: #21649c;
    border-width: 2px;
    margin-bottom: 10px;
}

.week-blog-entry-container:hover {
    background-color: #318ad4;
}
</style>

<div class="week-blog-entry-container">
<h2 class="sidebar-component-title-header"></h2>

<slot></slot>
</div>
        `;

        this.#titleHeader = this.getElementsByClassName("sidebar-component-title-header")[0];
    }
}

customElements.define("blog-post-card", BlogPostCard);
