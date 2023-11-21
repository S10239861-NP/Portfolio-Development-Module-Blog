// language=html
export const content = `<style>
    /* GOOGLE FONTS*/
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

    html {
        height: 100%;
    }

    body {
        font-family: "Poppins";
        background-color: rgb(42, 42, 42);
        color: white;
        height: 100%;
        margin: 0px;
    }

    button {
        font-family: "Poppins";
    }

    h1, h2, h3, h4, h5, h6, ul, ol, p {
        margin: 0px;
    }

    .main-content-container {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        height: 100vh;
    }

    @keyframes main-header-glow-animation {
        0%, 33% {
            text-shadow: 0 0 0px #fff;
        }
        33%, 66% {
            text-shadow: 0 0 7px #fff;
        }
        66%, 100% {
            text-shadow: 0 0 0px #fff;
        }
    }

    .main-header {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: main-header-glow-animation 6s ease-in infinite;
    }

    .navbar-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 0px 4px;
        background-color: rgb(54, 54, 54);
    }

    .navbar-container > button {
        background-color: rgb(54, 54, 54);
        color: white;
        border-style: solid;
        border-width: 0px;
        width: 100%;
        height: 100%;
        padding: 20px;
        justify-content: stretch;
        align-items: stretch;
        font-size: 14px;
        transition: all 0.4s;
    }

    .navbar-container > button:hover {
        background-color: rgb(62, 62, 62);
        font-size: 16px;
    }

    .footer-container {
        margin-top: auto;
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        background-color: rgb(54, 54, 54);
        padding: 16px;
        justify-content: space-between;
    }

    .footer-item {
        margin-top: auto;
        margin-bottom: auto;
    }

    .footer-nav-container {
        display: flex;
        flex-direction: row;
        column-gap: 16px;
    }

    .footer-nav-container > a {
        font-size: 16px;
        transition: all 0.5s;
    }

    .footer-nav-container > a:hover {
        font-size: 18px;
    }
</style>

<div id="mainContentContainer" class="main-content-container">
    <h1 class="main-header">Naveed's Portfolio Development (PFD) Blog</h1>

    <div id="navBarContainer" class="navbar-container">
        
    </div>

    <slot>
        
    </slot>

    <div class="footer-container">
        <div class="footer-item" style="display: flex; flex-direction: row; column-gap: 16px;">
            <img width="64px" height="64px" src="./favicon_io/android-chrome-512x512.png"/>

            <h3 class="footer-item">Naveed's Portfolio Development (PFD) Blog</h3>
        </div>

        <div id="footerNavContainer" class="footer-item footer-nav-container">
            
        </div>
    </div>
</div>`;