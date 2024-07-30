import { cn } from '@/util/style'

interface ProgressBarProps {
  progress: Number
}

function ProgressBar({ progress: p }: ProgressBarProps) {
  return (
    <>
      <div
        className={cn(
          'h-0',
          'border-t-2',
          'border-orange-700',
          'transtion-[width]'
        )}
        style={{ width: `${p}%` }}
      />
    </>
  )
}

export default ProgressBar
