// Change input status above post type
// select radio inputs
const imageRadio = document.querySelector("#image")
const storyRadio = document.querySelector("#story")
const textRadio = document.querySelector("#text")
const fileInputSection = document.querySelector("#fileInputSection")

// select inputs
const titleInput = document.querySelector("#title")
const contentInput = document.querySelector("#content")
const tagsInput = document.querySelector("#tags")

// set placeholders
const titleInputPlaceholder = "Weekend Party"
const contentInputPlaceholder = "We are so happy!"
const tagsInputPlaceholder = "Car, cat, house etc. (optional)"
const disabledInputPlaceholder = "Disabled..."

titleInput.placeholder = titleInputPlaceholder
contentInput.placeholder = contentInputPlaceholder
tagsInput.placeholder = tagsInputPlaceholder

// change input statuses
imageRadio.onclick = (e) => {
    titleInput.disabled = false
    titleInput.value = ""
    titleInput.placeholder = titleInputPlaceholder

    contentInput.disabled = false
    contentInput.value = ""
    contentInput.placeholder = contentInputPlaceholder

    // tagsInput.disabled = false
    // tagsInput.value = ""
    // tagsInput.placeholder = tagsInputPlaceholder

    tagsInput.disabled = true
    tagsInput.value = ""
    tagsInput.placeholder = disabledInputPlaceholder

    fileInputSection.classList.remove("hidden")
}
storyRadio.onclick = (e) => {
    titleInput.disabled = true
    titleInput.value = ""
    titleInput.placeholder = disabledInputPlaceholder

    contentInput.disabled = true
    contentInput.value = ""
    contentInput.placeholder = disabledInputPlaceholder

    tagsInput.disabled = true
    tagsInput.value = ""
    tagsInput.placeholder = disabledInputPlaceholder

    fileInputSection.classList.remove("hidden")
}
textRadio.onclick = (e) => {
    titleInput.disabled = false
    titleInput.value = ""
    titleInput.placeholder = titleInputPlaceholder

    contentInput.disabled = false
    contentInput.value = ""
    contentInput.placeholder = contentInputPlaceholder

    // tagsInput.disabled = false
    // tagsInput.value = ""
    // tagsInput.placeholder = tagsInputPlaceholder

    tagsInput.disabled = true
    tagsInput.value = ""
    tagsInput.placeholder = disabledInputPlaceholder

    fileInputSection.classList.add("hidden")
}