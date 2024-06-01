const BitriaAccountHeader = () => {
  return (
    <div className="w-[300px] shadow-md bg-[#262536] font-open-sans rounded-md px-4 py-5 text-white relative">
      <div className="flex items-end justify-between">
        <h2 className="opacity-55 text-theme-sm">Currently viewing:</h2>
        <div className="opacity-[0.7] py-1 px-2 rounded-sm uppercase text-[11px] border border-white">
          Edit
        </div>
      </div>
      <h1 className="font-semibold text-theme-lg mb-1">John Investor</h1>
      <p className="font-light text-theme-sm mb-6">
        Client since December 25, 2020
      </p>
      <div className="opacity-[0.7] rounded-sm uppercase text-[11px] text-center w-full py-1 border">
        Send login invitation
      </div>
    </div>
  )
}

export default BitriaAccountHeader
