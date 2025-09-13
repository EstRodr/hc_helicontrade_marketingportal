export default defineNuxtRouteMiddleware((to) => {
  // Only run on client-side
  if (process.server) return

  // Track page views with GTM
  nextTick(() => {
    const { trackPageView } = useGTM()
    
    if (to.path) {
      trackPageView(to.path, to.meta?.title as string || undefined)
    }
  })
})
