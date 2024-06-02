import { CodeBlock, nord } from 'react-code-blocks'
import IconBxsWalletAlt from '@/assets/icons/common/BxsWalletAlt'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import CurlIcon from '@/assets/icons/blockscope-icons/curl-svgrepo.svg'
import JavaScriptIcon from '@/assets/icons/blockscope-icons/javascript-svgrepo.svg'
import PythonIcon from '@/assets/icons/blockscope-icons/python-svgrepo.svg'
import Image from 'next/image'

const SlideShowCodeBlock = () => {
  return (
    <div className="overflow-hidden w-full h-[500px] flex flex-col justify-center items-center absolute top-0 left-0">
      <div
        className="code-section"
        style={{ translate: '0px 100px 0px', height: '800px' }}
      >
        <div className="flex flex-row gap-3 mb-3 justify-start items-start w-[343px]">
          <div className="code-lang-option bg-[#eee] border border-[transparent] rounded-lg shadow-lg text-black w-20 flex justify-center items-center flex-col py-3 px-4 text-theme-xs">
            <Image
              src={CurlIcon.src}
              alt="CurlIcon"
              width={20}
              height={20}
              className="mb-1"
            />
            Curl
          </div>
          <div className="code-lang-option bg-[#eee] border border-[#ffcc00] rounded-lg shadow-lg text-black w-20 flex justify-center items-center flex-col py-3 px-4 text-theme-xs">
            <Image
              src={JavaScriptIcon.src}
              alt="JavaScriptIcon"
              width={20}
              height={20}
              className="mb-1"
            />
            JavaScript
          </div>
          <div className="code-lang-option bg-[#eee] border border-[transparent] rounded-lg shadow-lg text-black w-20 flex justify-center items-center flex-col py-3 px-4 text-theme-xs">
            <Image
              src={PythonIcon.src}
              alt="PythonIcon"
              width={20}
              height={20}
              className="mb-1"
            />
            Python
          </div>
        </div>

        <div className="code-url bg-[#eee] rounded-lg w-[343px] block shadow-lg text-black py-4 px-4 text-theme-xs mb-3">
          <code>URL | https://api.blockscope.co/apiaddress</code>
        </div>
        <div className="code-block bg-[#333] rounded-lg w-[343px] block shadow-lg">
          <h2 className="px-4 text-[11px] pt-4 pb-2 uppercase">AXIOS</h2>
          <hr className="m-0 border-1 border-[#222]" />
          <hr className="m-0 border-1 border-[#444]" />
          <h2 className="px-4 text-[11px] pt-4 uppercase">Installation</h2>
          <div className="py-2 pl-6 pr-3 uppercase text-theme-xs">
            <div className="flex justify-between">
              <code>
                <span style={{ color: '#eee' }}>$ </span>
                <span style={{ color: '#12ca93' }}>
                  NPM INSTALL AXIOS --SAVE
                </span>
              </code>
              <div
                className="fs--1 px-2 text-right text-600 cursor-pointer"
                style={{ width: '24px' }}
              >
                <IconBxsWalletAlt />
              </div>
            </div>
          </div>
          <hr className="m-0 border-1 border-[#222]" />
          <hr className="m-0 border-1 border-[#444]" />
          <h2 className="px-4 text-[11px] pt-4 uppercase">Request</h2>
          <SimpleBar
            style={{
              maxHeight: '500px',
              maxWidth: '343px',
            }}
            autoHide
          >
            <code
              className="block code-block-wrapper text-theme-xs w-[640px]"
              style={{ marginLeft: '-0.3rem' }}
            >
              <CodeBlock
                text={`import axios from 'axios'

const options = {
method: 'POST',
url: 'https://api.blockscope.co/dev-api/v2/decode/transaction',
headers: {
accept: 'application/json',
'content-type': 'application/json',
'X-API-KEY': 'YOUR-API-KEY'
data: {
  transaction: '0xb5c8bd9430b6cc87a0e2fe110ece6bf527fa4f170a4bc8c',
  chain: 'ethereum'
}`}
                language={'javascript'}
                showLineNumbers={true}
                theme={nord}
              />
            </code>
          </SimpleBar>
        </div>
      </div>
    </div>
  )
}

export default SlideShowCodeBlock
