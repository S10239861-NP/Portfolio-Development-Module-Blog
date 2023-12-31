// language=html
export const content = `<style>
    h1, h2, h3 {
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
        transition: all 0.4s;
    }

    .week-blog-entry-container:hover {
        background-color: #318ad4;
    }
</style>

<div class="week-blog-entry-container">
    <h2 id="header" class="sidebar-component-title-header"></h2>

    <slot></slot>
</div>`;