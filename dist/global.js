

function setTheme(theme) {
    const previousStylesheet = document.getElementById("theme_stylesheet")
    if (previousStylesheet) previousStylesheet.remove()

    const tagElement = document.createElement("link")
    tagElement.id = "theme_stylesheet"
    tagElement.setAttribute("rel", "stylesheet")
    tagElement.setAttribute("href", `theme_${theme}.css`)
    document.head.appendChild(tagElement)
}