import tocbot from 'tocbot'

export function setupTocbot() {
  tocbot.init({
    tocSelector: '.tableOfContents',
    contentSelector: '.postContentByToc',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    collapseDepth: 0,
    isCollapsedClass: 'is-collapsed',
    collapsibleClass: 'is-collapsible',
  })
}
