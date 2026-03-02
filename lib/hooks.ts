import { useEffect, useState, useCallback } from 'react'
import { createClient } from './supabase'

export function useReflections() {
  const [reflections, setReflections] = useState<Record<string, Record<number, string>>>({})
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('reflections').select('dimension_id, answers')
      if (data) {
        const map: Record<string, Record<number, string>> = {}
        data.forEach(r => { map[r.dimension_id] = r.answers })
        setReflections(map)
      }
      setLoading(false)
    }
    load()
  }, [])

  const saveReflection = useCallback(async (dimId: string, answers: Record<number, string>) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('reflections').upsert({
      user_id: user.id, dimension_id: dimId, answers, updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,dimension_id' })
    setReflections(prev => ({ ...prev, [dimId]: answers }))
  }, [])

  return { reflections, loading, saveReflection }
}

export function useManifesto() {
  const [elements, setElements] = useState(['', '', '', '', ''])
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('manifestos').select('elements').single()
      if (data) setElements(data.elements)
    }
    load()
  }, [])

  const saveManifesto = useCallback(async (els: string[]) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('manifestos').upsert({
      user_id: user.id, elements: els, updated_at: new Date().toISOString()
    }, { onConflict: 'user_id' })
    setElements(els)
  }, [])

  return { elements, saveManifesto }
}

export function useProfile() {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('name').eq('id', user.id).single()
      setProfile({ name: data?.name || user.email?.split('@')[0] || 'Leader', email: user.email || '' })
    }
    load()
  }, [])

  return { profile }
}