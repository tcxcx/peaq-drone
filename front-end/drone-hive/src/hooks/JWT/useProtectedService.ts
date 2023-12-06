import { useCallback, useState } from "react"
import { toast } from "sonner"

export const useProtectedService = () => {
  const [randomText, setRandomText] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = useCallback(
    async (jwtToken?: string) => {
      setLoading(true)
      try {
        const res = await fetch("../api/protected", {
          headers: {
            Authorisation: `Bearer ${jwtToken}`,
          },
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setRandomText(data.randomText)
      } catch (e: any) {
        setRandomText(null)
        toast.error('Failed to generate random text')
      } finally {
        setLoading(false)
      }
    },
    [ toast]
  )

  return { generate, randomText, loading }
}