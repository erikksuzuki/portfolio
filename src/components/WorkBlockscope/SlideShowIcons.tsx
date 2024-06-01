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

const SlideShowIcons = () => {
  return (
    <div className="overflow-hidden w-full h-[500px] flex justify-center items-center">
      <div className="icon-grid grid grid-cols-4 gap-8 absolute top-[50%] mt-[-104px]">
        <div className="icon-img">
          <Image
            src={IconBlockscopeAPI.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeBlockBreakdown.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeContractUsage.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeInvestigator.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeLabels.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeMemos.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopePipelines.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeSecurityMonitor.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeTracer.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeTransactionDecoder.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeWalletProfiler.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
        <div className="icon-img">
          <Image
            src={IconBlockscopeWatchtower.src}
            width={48}
            height={48}
            alt="BlockScopeIcon"
          />
        </div>
      </div>
    </div>
  )
}

export default SlideShowIcons
