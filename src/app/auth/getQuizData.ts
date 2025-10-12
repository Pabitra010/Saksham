import { supabase } from '../../utils/supabase/client'

export type QuizDataRow = {
  module: number
  question: string
  option_1: string
  option_2: string
  option_3?: string | null
  option_4?: string | null
  answer: string
  id: number
}


/**
 * Fetch quiz rows from Supabase on the client (CSR).
 * Use this in client components where the browser supabase client is available.
 */
export async function getQuizDataClient() {
  try {
    // request with exact count so Supabase may return count metadata for debugging
    const res = await supabase
      .from('quiz-data')
      .select('*', { count: 'exact' })
      .order('id', { ascending: true })

    const { data, error } = res

    if (error) {
      console.error('Supabase (client) error fetching quiz-data:', error)
      throw error
    }

    return (data as QuizDataRow[]) ?? []
  } catch (err) {
    console.error('Unexpected error in getQuizDataClient:', err)
    throw err
  }
}


