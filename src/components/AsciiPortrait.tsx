'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { useLayoutEffect, useEffect, useRef } from 'react'

import 'simplebar-react/dist/simplebar.min.css'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const AsciiPortrait = () => {
  const portraitLines = [
    `%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%############`,
    `%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%##############`,
    `%%%%%%%%%%%%%%%%%&%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%##################`,
    `%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%(*%%%&#/ ,%&&%&&&&&&&&&&&%%%%%%%%%%%%%%%###%###############`,
    `%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%*             *,&&%%%%%#%%%%%%%%%%%%%#####################`,
    `%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%#%*/*,                  .,.,//%%#%%%%%%%####################((`,
    `%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%@@&%..                  ,., ..   ..,%%%##%%%%##############((#(((((`,
    `%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&%&&&@(*,   . . .      . ./#((. ,        ,(/%%%%%%########((##(((((((((((`,
    `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&%&&&&&&&&&&&&&&&&*/. .. ,.  .    ..,/ .  .               .#,%######(,      ((((((((((((`,
    `####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&%(,,  ./, ... . /, ,.                         ......#..%..@.. ((((((((((((`,
    `#########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&%&%%,.*  /  . .,/..,  ...  .,. ...,.              . /@  .         ((((((//////`,
    `####################%%%%%%%%%%%%%%&%#*       .  .,           .      ....,,,,,,.....                       . (///////////`,
    `##########%%#/,.         ,//*,.../... ,../,.,.               , ..  ..,,,,,,****,,,,..                **.. , ,///////////`,
    `%  ..*/..*/&,  .....    ,    ... ... *#,.    . .          .. ,,...*,,,,*/(###/****,,....                ,.   ///////////`,
    `               .  @@,.. , . ,..* ..  .,*,,,*            ,(,/*/,#(*******/((////(////,,,..              .  .  ///////////`,
    `             ..,........,,,,,,,,,,,,,,*,,,*, ,         .*,. ....,**///****,..   ..., ...,,      .       . .  ///////////`,
    `   .       .***,,,,,,,,,,,,,,,,,,,,,(**,,/%&*//   *   ..,,,,,.,,***/////*,,,,,,*****,,,,***    .*,/ .( ....* ///*///////`,
    `.    .     ,,,,,,,,*,&,,,,,,,,,,,,,,%(/%*,,,,,*% ,#(//*//*/*******////**,,****,,...,*,*****/       (. ..  .,      ,*///*`,
    `        ...,,,,,,.,***,,,,,,,,,,,,,,,,,*,,,,****.#%///*,...    .***//(**,,,,.*    ,   .,***/           .,,,.      ,*/***`,
    `     (*.,*.,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,**,*.%%//*******,.,,**/(&#//*,,,,,,..,,,,,,******.,,.. ((((...,*      .*/***`,
    `    ,/...*.,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,//%*%%#%%#///****//((#%&&%//******,***********//.,**, ,(((....*      .**/*/`,
    `    . .. ,....,,,,,,,,,,,,,,,.@@@&,,,,,,,,,,,/#//#%%%%%%%#%%%%#(((%&@&&%(*,***//////*******// ,***#((((. ..*,      ,*///`,
    `    ///***....,,,,,,,,,,,,,,,,,,,,,(/,*,.*#*#&%#*#%%%%%%%%%%%(//*%%%%%###((,,*/(((#(///****//,,.,##(((((((#%/      ,////`,
    `    ,***,.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,&(*#((#%%%%##(/**(#(//***,,****,**(((///******/,**.. .@#((.   *      .*///`,
    `    ,****.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*%%%((#%##((/**/%%*..,*,,,,.. .*///(((//******/,**.  /(**/&&#@.      .*///`,
    `..,,***,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#%%#(##(((/*(%%%%#*,*,,,,,,,,,,(/(((///****//.((. .......,,**(.     .*///`,
    `.,,***,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,****,,//##(((/####%&%(/**,.,,,****,,,.,******/*////,///******//(,     .*///`,
    `,,,,,,,,,.,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,*****(#((#(*.,,......              ,*******./***/***********//     .,/((`,
    `,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,,,,**********/*//**/(((*,*,*(((#**,,,**,,****,,,,**,******,,,,,,,,,,**/      ./((`,
    `,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,**#%%%%#(/*,,,,,*******/*,,,,,,*******,,,,,,,,,,,,,*.    ../((`,
    `..,,,.............................,,,,,,,,,,,,,,,,,,,,,,,***/(#%%%%%%%(////**//***,,,,,.,,** .     ,,....,,,,,*   ...*((`,
    `..........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,/*.  //***(#%%%%&%%%%%#////**,.....,,,,,          .,,...,,,  ....*(#`,
    `.......,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*********,*%,,      ***.,***(((((/(/*,,.... ....,,**,.             .  ./.  ....,(#`,
    `.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*********(****//*.     ,****.  .....          ..,,,****,.                  ..,,//((##`,
    `,,,,,,,,,,,,,,,,,,,,,,,,,**************///**/***/*,**     .****/***,.......,,,,,,,,******,,                   .,*//*****`,
    `////(/***,,,,,.....                ./,*/*////////,,**,      */////***/******,***********,,.                    .**,/,,**`,
    `                              ,//(,////////*//((/,,****/,    */////*******,,*,***********,                     ..,*/*///`,
    `               ..          (/,*((///(//(///**/(/*,*/////(/. . **////****,**************,,                  ... ..,,**///`,
    `##%%%#%%%%%%##%#####%#%%#/(///* (#(/((((////////,**//((///*.   ,*/*/*********,********,.                   ,,******////*`,
    `######%%###((###(###%%((((((/(((**(///////////(/.*/////(///,.    .///****,,*********,..                 . ..*///(//(((/ `,
    `                   ##(//(/(///*//*/(((/////*///(.*/*/((((/(/*.     .**************,,,                  ,,..,,////((/(/*.`,
    `                 %#(((((//////(//**/(/#((/**//(/,,/*/*////**,*..    .,,************,                  ..*,,***//((((((./`,
    `               #((##((///*(////((//*////**(//*#/*,**,,***,((**. .     ,.,,,,*,,,,                    .,,***/*(/(/((#(# /`,
    `.......       #(..((///(/(*/(/***/**///,/*////(***,***,,**///..  .                           .       ****//*//*//(((//,*`,
    `.. ......   .(((((/*//((*.,(///***/**/*,*//(/,(*,*,//,,*,*//**    .                                 .,/*/*(///(//(///.,*`,
    `........   .#(#((/(/////*//(.*/**, .,*,.**/*,.*.***,****,,///*...  .                                .*/****//(((//((/.**`,
    `......  ...%##(((((#(((/(////*(**.   ,.. //, /*.,*/ *,****/(/*, ,.  .                             ..,*//*/*////(#(/(/,*/`,
    `..   .....#(((((//(((((/(#///*/*//*      ,*  (, ./* ,*,,**/(***.,...                          .   .,,***/*****//#(///*,*`,
  ]

  gsap.registerPlugin(TextPlugin)
  useIsomorphicLayoutEffect(() => {
    const animation = gsap
      .timeline()
      .fromTo(
        '.ascii-line',
        { translateY: '30px' },
        {
          translateY: '-4px',
          stagger: 0.15,
          duration: 0.4,
        }
      )
      .fromTo(
        '.ascii-line',
        { opacity: '0' },
        {
          opacity: '1',
          stagger: 0.15,
          duration: 0.1,
        },
        '<'
      )
  }, [])

  return (
    <div className="text-[#00dd00] w-[334px] flex justify-center items-center relative">
      <div className="asciiportrait font-fira-code text-center absolute rounded-2xl overflow-hidden">
        {portraitLines.map((line, lineIndex) => {
          const characters = line.split('')
          return (
            <div
              key={lineIndex.toString()}
              className="ascii-line leading-[7px] h-[7px] opacity-0"
            >
              {characters.map((char, charIndex) => (
                <span
                  key={lineIndex.toString() + charIndex.toString()}
                  className="text-[4.5px] inline-block h-[7px] w-[2.7px] leading-[7px] ascii-character"
                >
                  {char === ' ' ? '\xa0' : char}
                </span>
              ))}
            </div>
          )
        })}
      </div>
      <div className="text-[#333] font-fira-code text-center rounded-2xl overflow-hidden">
        {portraitLines.map((line, lineIndex) => {
          const characters = line.split('')
          return (
            <div key={lineIndex.toString()} className="leading-[7px] h-[7px]">
              {characters.map((char, charIndex) => (
                <span
                  key={lineIndex.toString() + charIndex.toString()}
                  className="text-[4.5px] inline-block h-[7px] w-[2.7px] leading-[7px]"
                >
                  {char === ' ' ? '\xa0' : char}
                </span>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AsciiPortrait
