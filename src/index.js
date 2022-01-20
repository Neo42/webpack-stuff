import makeButton from './button'
import './index.css'
import './footer.css'
import imageUrl from './icon.jpeg'
import makeImage from './image'
const getGSAP = () =>
  import(
    /* webpackChunkName:"gsap" */
    'gsap'
  )
const getFooter = () =>
  import(
    /* webpackChunkName:"footer" */
    /* webpackPrefetch: true */
    './footer'
  )

const image = makeImage(imageUrl)
const button = makeButton('Yay! A button!')
button.addEventListener('click', () => {
  getFooter().then(({footer}) => {
    document.body.appendChild(footer)
  })

  getGSAP().then((gsap) => {
    console.log(gsap)
  })
})

document.body.appendChild(image)
document.body.appendChild(button)
