import { createChatCompletion } from '$lib/server/openai.js'
import { supabase } from "$lib/supabaseClient"


export const load = async ({params, setHeaders}) => {
  const {name = 'World'} = params

  const {data, error} = await supabase.from('greeting').select('body').ilike('name', `%${name}%`)
  let greeting = data?.at(0)?.body

  if (!greeting?.length) {
    // console.log('inside_if')
    greeting = await createChatCompletion(name)
    const {error} = await supabase.from('greeting').insert({name: name, body: greeting})

    if (error) {
      throw new Error('Failed to cache greeting')
    }
  }
  
  const meta = {title: `Hello there, ${name} 👋`}

  setHeaders({
    'cache-control': `max-age=${5 * 60}`
  })

  return {
    meta,     
    greeting
  }
}