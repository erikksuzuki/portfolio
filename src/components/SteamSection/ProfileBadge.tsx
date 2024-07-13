'use client'

import { formatDateOrdinal } from '@/utils/formatDateTime'
import IconExternalPage from '@/assets/icons/common/IconExternalPage'
import { useEffect } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import IconUser from '@/assets/icons/common/IconUser'
import IconClipboardDocument from '@/assets/icons/common/IconClipboardDocument'

const SteamProfileBadge = ({ playerData }: any) => {
  useEffect(() => {
    TimeAgo.setDefaultLocale(en.locale)
    TimeAgo.addLocale(en)
  }, [])

  const timeAgo = new TimeAgo('en-US')
  const lastLogOff = playerData?.data?.lastlogoff
    ? new Date(playerData?.data?.lastlogoff).getTime()
    : new Date()

  return (
    <div>
      <div className="w-full mb-6 pb-3 border-b border-[rgba(255,255,255,0.2)]">
        <div className="flex justify-between items-end w-full mb-3 pb-1 border-b border-[rgba(255,255,255,0.2)]">
          <div className="flex items-center gap-x-2 hover:text-[rgba(0,200,255)]">
            <IconUser className="w-[18px] h-[18px] relative top-[-1px]" />
            <p className="text-theme- capitalize flex items-center cursor-pointer">
              {playerData?.data?.name}{' '}
              <IconExternalPage className="ml-2 w-[18px] h-[18px] inline-block relative top-[-2.5px] opacity-[0.6]" />
            </p>
          </div>
          <div className="text-theme-xs text-[rgba(255,255,255,0.75)]">
            since{' '}
            <span className="text-[rgba(255,255,255,0.85)]">
              {formatDateOrdinal(
                new Date(playerData?.data?.timecreated * 1000).toString(),
                true,
                true
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="pr-4 mr-4 border-r border-[rgba(255,255,255,0.2)]">
              <div>
                <p className="text-theme-xs opacity-[0.85] mb-[2px]">
                  Games Owned
                </p>
                <p className="text-theme-xs opacity-[0.75]">
                  {playerData?.data?.games_owned} games
                </p>
              </div>
            </div>
            <div
              className="flex items-center group cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(playerData?.data?.friend_code)
              }}
            >
              <div className="flex items-center gap-x-4">
                <div>
                  <p className="text-theme-xs opacity-[0.85] mb-[2px]">
                    Invitation Code
                  </p>
                  <p className="text-theme-xs opacity-[0.75]">
                    {playerData?.data?.friend_code}
                  </p>
                </div>
              </div>
              <div className="h-[33px] w-[33px] relative top-[-1] ml-3 border border-[rgba(255,255,255,0.2)] group-hover:bg-[rgba(255,255,255,0.1)] flex items-center justify-center rounded-md">
                <IconClipboardDocument
                  strokeWidth={1.4}
                  className="w-5 h-5 opacity-[0.7]"
                />
              </div>
            </div>
          </div>

          <div className="text-right min-w-[100px]">
            <p className="text-theme-xs opacity-[0.85] mb-[2px]">Last seen </p>
            <div>
              <p className="text-theme-xs opacity-[0.8]">
                {playerData?.data?.personastate === 1 ? (
                  <span>
                    <i
                      style={{ width: '9px', height: '9px' }}
                      className="inline-block rounded-full mr-[6px] bg-[rgb(0,255,0)]"
                    />
                    Online Now
                  </span>
                ) : (
                  timeAgo.format(lastLogOff)
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SteamProfileBadge
