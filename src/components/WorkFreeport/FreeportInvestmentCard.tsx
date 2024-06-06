import StepDot from '@/components/WorkFreeport/InvestmentCardStepDot'

const FreeportInvestmentCard = () => {
  return (
    <div className="freeport-purchase-section rounded-lg p-6 bg-white w-[324px]">
      <aside className="text-black flex flex-col gap-y-4 cursor-default font-roboto h-[auto]">
        <div className="px-3">
          <hr className="step-line relative border-b top-[16px] mx-4" />
          <div className="flex justify-between flex-row mb-2 relative">
            {Array.from(Array(5).keys()).map((step) => {
              return <StepDot key={step} disabled={step !== 0} />
            })}
          </div>
        </div>
        <article className="w-full flex flex-col gap-y-6">
          <header className="pb-3 text-center">
            <h3 className="fp-purchase-line font-semibold text-theme-lg">
              Your investment
            </h3>
            <p className="fp-purchase-line pt-3 text-[14px]">
              How many shares do you want to purchase?
            </p>
          </header>
          <div className="flex flex-col gap-y-2">
            <div className="fp-purchase-line flex flex-row items-center justify-between text-theme-sm">
              <p className="font-semibold">Double Mickey</p>
              <p className="font-semibold">50 shares</p>
            </div>
            <div className="fp-purchase-line flex flex-row items-center justify-between text-theme-xs">
              <p>$78.18 per share</p>
              <p className="font-semibold">$3,909.00</p>
            </div>
            <div className="fp-purchase-line flex flex-row items-center justify-between text-theme-xs">
              <p>10,000 shares total</p>
              <div className="font-semibold bg-[rgb(21,112,239)] text-white text-[11px] px-2 py-[3px] rounded">
                Update Quantity
              </div>
            </div>
          </div>
          <hr className="fp-purchase-line " />
          <div className="fp-purchase-line flex flex-row items-center justify-between text-theme-xs">
            <p className="text-theme-sm">Subtotal</p>
            <p className="font-semibold text-theme-sm">$3,909.00</p>
          </div>
        </article>
        <button className="fp-purchase-line text-left text-theme-sm bg-[rgb(21,112,239)] text-white px-3 py-2 rounded-md">
          Continue
        </button>
      </aside>
    </div>
  )
}

export default FreeportInvestmentCard
