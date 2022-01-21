import common from './common'
import makeImage from './image'
import makeButton from './button'

import imageUrl from './images/icon.jpeg'
import './index.css'
import './footer.css'

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

import moment from 'moment'
import 'moment/locale/zh-cn'

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

console.log(common)

document.body.appendChild(image)
document.body.appendChild(button)

console.log('locale', moment.locale())
console.log('date', moment().format('ll'))
