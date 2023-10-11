import type { DbResult, DbResultOk } from '$lib/database.types.js'
import { isBlocklisted } from '$lib/server/isBlocklisted'
import { createChatCompletion } from '$lib/server/openai.js'
import { supabase } from '$lib/supabaseClient'

export const load = async ({ params, setHeaders }) => {
	const { name = 'World' } = params

	if (isBlocklisted(name)) {
		throw new Error('We don’t think that’s your name, we think you’re being naughty 😡')
	}

	if (name.length > 16) {
		throw new Error('Sorry but that name is too long')
	}

	setHeaders({
		'Cache-Control': `s-maxage=${60 * 5}, stale-while-revalidate=${60 * 60 * 24}`
	})

	const meta = { title: `Hello there, ${name} 👋` }

	try {
		const query = supabase.from('greeting').select('body, name').ilike('name', `%${name}%`)
		var response: DbResult<typeof query> = await query
	} catch (error) {
		throw Error('Failed to fetch data from db :(', { cause: error })
	}

	const data = response.data?.at(0)

	const dbGreeting = data?.body
	const dbName = data?.name

	if (dbGreeting && dbName?.length === name.length) {
		return {
			meta,
			dbGreeting,
			streamed: { aiGreeting: null }
		}
	}

	const aiGreetingPromise: Promise<string> = createChatCompletion(name).then(async (aiGreeting) => {
		const { error } = await supabase.from('greeting').insert({ name: name, body: aiGreeting })

		if (error) {
			throw new Error('Failed to cache greeting')
		}

		return aiGreeting
	})

	return {
		meta,
		dbGreeting: null,
		streamed: { aiGreeting: aiGreetingPromise }
	}
}
