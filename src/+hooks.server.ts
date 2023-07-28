import type { Handle } from "@sveltejs/kit"

// const FIVE_MINUTES_IN_SECONDS = 60 * 5

export const handle: Handle = async ({event, resolve}) => {
  
  // event.setHeaders({
  //   'Cache-Control': `max-age=${FIVE_MINUTES_IN_SECONDS}`
  // })

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
  })
}