// Dark Mode
function darkMode() {
    //// Dark Mode
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    const checkbox = document.querySelector('.switch__checkbox')
    const btn = document.querySelector('.switch__checkbox')

    if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.body.classList.add('dark')
        checkbox.checked = true
    } else {
        document.body.classList.remove('dark')
        checkbox.checked = false
    }

    btn.addEventListener('click', () => {
        document.querySelector('body').classList.toggle('dark')

        if (document.querySelector('body').classList.contains('dark')) {
            localStorage.theme = 'dark'
            checkbox.checked = true
        } else {
            localStorage.theme = 'light'
            checkbox.checked = false
        }
    })
}
darkMode()
