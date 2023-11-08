// language=html
export const content = `<style>
    .main-container {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        row-gap: 10px;
        background-color: #21649c;
        color: white;
        min-height: 100%;
        width: auto;
    }

    .toggle-button {
        font-family: 'Century Gothic';
        display: flex;
        background-color: #2e83c9;
        color: white;
        position: absolute;
        left: 0px;
        top: 0px;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 0px 0px 6px 0px;
        flex-shrink: 0;
    }
</style>

<div id="mainContainer" class="main-container">
    <a id="toggleButton" class="toggle-button">
        <svg class="toggle-button-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.248 16.002c.966 0 1.75.784 1.75 1.75v2.498A1.75 1.75 0 0 1 6.248 22H3.75A1.75 1.75 0 0 1 2 20.25v-2.498c0-.966.784-1.75 1.75-1.75h2.498ZM9.748 18h11.505a.75.75 0 0 1 .102 1.493l-.102.007H9.748a.75.75 0 0 1-.102-1.493L9.748 18h11.505H9.748Zm-3.5-8.999c.966 0 1.75.784 1.75 1.75v2.498a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 13.249V10.75c0-.966.784-1.75 1.75-1.75h2.498ZM9.748 11h11.505a.75.75 0 0 1 .102 1.493l-.102.007H9.748a.75.75 0 0 1-.102-1.493L9.748 11h11.505H9.748Zm-3.5-9c.966 0 1.75.784 1.75 1.75v2.498a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 6.248V3.75C2 2.784 2.784 2 3.75 2h2.498Zm3.5 2h11.505a.75.75 0 0 1 .102 1.493l-.102.007H9.748a.75.75 0 0 1-.102-1.493L9.748 4h11.505H9.748Z" fill="white"/>
        </svg>
    </a>

    <slot></slot>
</div>`;