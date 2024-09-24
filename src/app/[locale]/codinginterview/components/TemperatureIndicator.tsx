const TemperatureIndicator = ({ temp }: { temp: number }) => {
  return (
    <article className="flex flex-col items-center justify-center bg-[rgba(0,0,255,0.4)] rounded-xl">
      <figure className="text-center pt-6 text-theme-heading-md">{`${temp}º`}</figure>
      <label className="mt-1 pb-6 text-theme-xs text-center w-full">
        resulting temperature
      </label>
    </article>
  )
}

export default TemperatureIndicator
