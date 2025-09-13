export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gtmId = config.public.gtmId

  if (!gtmId || typeof window === 'undefined') {
    return
  }

  // Initialize GTM dataLayer
  window.dataLayer = window.dataLayer || []

  // GTM script function
  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  // Set up GTM
  gtag('js', new Date())
  gtag('config', gtmId)

  // Load GTM script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
  
  // Add GTM initialization to script
  const initScript = document.createElement('script')
  initScript.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `

  // Insert scripts
  document.head.appendChild(initScript)

  // Add noscript iframe for non-JS users
  const noscript = document.createElement('noscript')
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
  document.body.insertBefore(noscript, document.body.firstChild)

  // Provide global gtag function
  window.gtag = gtag

  console.log(`GTM initialized with ID: ${gtmId}`)
})

// TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
