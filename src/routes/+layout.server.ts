import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = async ({ locals, url }) => {
  // const ogIamgeUrl = `${url.origin}/api/og`

  return {
    defaultMeta: {
      title: 'Hello there 👋',
      description: 'Welcome to an app which uses both generative and artificial AI to greet you. The app is based on a tutorial by Johnny Magrippis.'
      // image: {
      //   url: ogIamgeUrl,
      //   alt: 'Hello there, World! 👋'
      // }
    }
  }
}