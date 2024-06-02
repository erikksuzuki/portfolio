import IconBxCalendarEvent from '@/assets/icons/BxCalendarEvent'
import IconBxsCheckCircle from '@/assets/icons/BxsCheckCircle'
import IconBxsWalletAlt from '@/assets/icons/BxsWalletAlt'
import IconClockCircle from '@/assets/icons/ClockCircle'
import IconShieldCheckOutline from '@/assets/icons/ShieldCheckOutline'

const GeminiAccountCard = () => {
  return (
    <div className="w-[300px] shadow-md bg-white font-open-sans rounded-md p-4 text-black relative">
      <IconShieldCheckOutline className="w-[22px] h-[22px] absolute top-[16px] right-[16px] text-[#dd9900]" />
      <h1 className="font-bold mb-1">Individual Account</h1>
      <div className="grid grid-cols-2 mb-3">
        <div className="datafield">
          <label className="opacity-[0.7] text-theme-xs font-medium">
            Account Name:
          </label>
          <p className="text-theme-sm  flex gap-1 items-center">
            <IconBxsWalletAlt className="w-[18px] h-[18px] opacity-[0.4]" />
            Individual Acc..
          </p>
        </div>
        <div className="datafield">
          <label className="opacity-[0.7] text-theme-xs font-medium">
            Date Created:
          </label>
          <p className="text-theme-sm  flex gap-1 items-center">
            <IconBxCalendarEvent className="w-[18px] h-[18px] opacity-[0.4]" />
            Jul 15, 2022
          </p>
        </div>
      </div>
      <ul>
        <li className="font-[500] text-theme-xs flex gap-x-1 items-center">
          <IconBxsCheckCircle className="w-[16px] h-[16px] text-[#00cc00]" />
          Docusign Process Started
        </li>
        <li className="font-[500] text-theme-xs flex gap-x-1 items-center">
          <IconClockCircle className="w-[16px] h-[16px] text-[#dd9900]" />
          Client Information Verified
        </li>
      </ul>
    </div>
  )
}

export default GeminiAccountCard
