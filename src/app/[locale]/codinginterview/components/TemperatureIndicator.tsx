const TemperatureIndicator = ({ temp }: { temp: number }) => {
  return (
    <figure className="text-center py-6 text-theme-heading-md">{`${temp}º`}</figure>
  )
}

export default TemperatureIndicator
