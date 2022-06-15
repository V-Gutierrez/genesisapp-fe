import GCLogo from 'assets/images/gc-logo.png'

export const changeIcons = () => {
  const Observer = new MutationObserver(() => {
    document
      .querySelector('.leaflet-marker-pane')
      ?.querySelectorAll('img')
      .forEach((element: HTMLImageElement, index, array) => {
        if (element.getAttribute('title') === null) {
          element.src = GCLogo.src
          element.style.width = '40px'
          element.style.height = '45px'
        }

        if (index === array.length - 1) {
          Observer.disconnect()
        }
      })
  })

  Observer.observe(document, { childList: true, subtree: true })
}
