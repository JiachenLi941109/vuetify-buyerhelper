const title = 'BuyerHelper'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}
