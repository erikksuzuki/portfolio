import IconBlockscopeAPI from '@/assets/icons/blockscope-icons/api-services.svg'
import IconBlockscopeBlockBreakdown from '@/assets/icons/blockscope-icons/block-breakdown.svg'
import IconBlockscopeContractUsage from '@/assets/icons/blockscope-icons/contract-usage.svg'
import IconBlockscopeInvestigator from '@/assets/icons/blockscope-icons/investigator.svg'
import IconBlockscopeLabels from '@/assets/icons/blockscope-icons/labels.svg'
import IconBlockscopeMemos from '@/assets/icons/blockscope-icons/memos.svg'
import IconBlockscopePipelines from '@/assets/icons/blockscope-icons/pipelines.svg'
import IconBlockscopeSecurityMonitor from '@/assets/icons/blockscope-icons/security-monitor.svg'
import IconBlockscopeTracer from '@/assets/icons/blockscope-icons/tracer.svg'
import IconBlockscopeTransactionDecoder from '@/assets/icons/blockscope-icons/transaction-decoder.svg'
import IconBlockscopeWalletProfiler from '@/assets/icons/blockscope-icons/wallet-profiler.svg'
import IconBlockscopeWatchtower from '@/assets/icons/blockscope-icons/watchtower.svg'
import Image from 'next/image'

const iconSrcArray = [
  IconBlockscopeAPI.src,
  IconBlockscopeBlockBreakdown.src,
  IconBlockscopeContractUsage.src,
  IconBlockscopeInvestigator.src,
  IconBlockscopeLabels.src,
  IconBlockscopeMemos.src,
  IconBlockscopePipelines.src,
  IconBlockscopeSecurityMonitor.src,
  IconBlockscopeTracer.src,
  IconBlockscopeTransactionDecoder.src,
  IconBlockscopeWalletProfiler.src,
  IconBlockscopeWatchtower.src,
]

const SlideShowIcons = () => {
  return (
    <div className="overflow-hidden w-full h-[500px] flex justify-center items-center">
      <div className="icon-grid grid grid-cols-4 gap-8 absolute top-[50%] mt-[-104px]">
        {iconSrcArray.map((iconSrc: string) => (
          <div key={iconSrc} className="icon-img">
            <Image src={iconSrc} width={48} height={48} alt="BlockScopeIcon" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideShowIcons
