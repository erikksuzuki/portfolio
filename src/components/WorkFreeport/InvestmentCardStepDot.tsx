import clsx from 'clsx'

const StepDot = ({ disabled }: { disabled?: boolean }) => {
  return (
    <i
      className={clsx(
        'step-dot rounded-full w-7 h-7 justify-center items-center flex',
        { 'bg-[#E2F1FF]': !disabled },
        { 'bg-[#FFFFFF]': disabled }
      )}
    >
      <span
        className={clsx(
          'rounded-full w-5 h-5 border-[1.5px] justify-center items-center flex',
          { 'border-[rgb(21,112,239)]': !disabled },
          { 'border-[rgb(200,200,200)]': disabled }
        )}
      >
        <span
          className={clsx(
            'rounded-full w-[6px] h-[6px] justify-center items-center flex',
            { 'bg-[rgb(21,112,239)]': !disabled },
            { 'bg-[rgb(200,200,200)]': disabled }
          )}
        />
      </span>
    </i>
  )
}

export default StepDot
