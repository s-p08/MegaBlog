import { Loader2 } from 'lucide-react'

function SpinLoader({message}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p>{message}</p>
    </div>
  )
}

export default SpinLoader