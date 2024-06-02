'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'
import { useLayoutEffect, useEffect, useRef } from 'react'

import 'simplebar-react/dist/simplebar.min.css'

const asciiText = `%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%############
%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%%%%##############
%%%%%%%%%%%%%%%%%&%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&#&&&&&&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%##################
%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%(*%%%&#/ ,%&&%&&&&&&&&&&&%%%%%%%%%%%%%%%###%###############
%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%*             *,&&%%%%%#%%%%%%%%%%%%%#####################
%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%#%*/*,                  .,.,//%%#%%%%%%%####################((
%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&&&&&&&&&&%@@&%..                  ,., ..   ..,%%%##%%%%##############((#(((((
%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&&&&&&&&&&&&%&&&@(*,   . . .      . ./#((. ,        ,(/%%%%%%########((##(((((((((((
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&%&&&&&&&&&&&&&&&&*/. .. ,.  .    ..,/ .  .               .#,%######(,      ((((((((((((
####%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&&&&&&%(,,  ./, ... . /, ,.                         ......#..%..@.. ((((((((((((
#########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&%&%%,.*  /  . .,/..,  ...  .,. ...,.              . /@  .         ((((((//////
####################%%%%%%%%%%%%%%&%#*       .  .,           .      ....,,,,,,.....                       . (///////////
##########%%#/,.         ,//*,.../... ,../,.,.               , ..  ..,,,,,,****,,,,..                **.. , ,///////////
%  ..*/..*/&,  .....    ,    ... ... *#,.    . .          .. ,,...*,,,,*/(###/****,,....                ,.   ///////////
               .  @@,.. , . ,..* ..  .,*,,,*            ,(,/*/,#(*******/((////(////,,,..              .  .  ///////////
             ..,........,,,,,,,,,,,,,,*,,,*, ,         .*,. ....,**///****,..   ..., ...,,      .       . .  ///////////
   .       .***,,,,,,,,,,,,,,,,,,,,,(**,,/%&*//   *   ..,,,,,.,,***/////*,,,,,,*****,,,,***    .*,/ .( ....* ///*///////
.    .     ,,,,,,,,*,&,,,,,,,,,,,,,,%(/%*,,,,,*% ,#(//*//*/*******////**,,****,,...,*,*****/       (. ..  .,      ,*///*
        ...,,,,,,.,***,,,,,,,,,,,,,,,,,*,,,,****.#%///*,...    .***//(**,,,,.*    ,   .,***/           .,,,.      ,*/***
     (*.,*.,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,**,*.%%//*******,.,,**/(&#//*,,,,,,..,,,,,,******.,,.. ((((...,*      .*/***
    ,/...*.,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,//%*%%#%%#///****//((#%&&%//******,***********//.,**, ,(((....*      .**/*/
    . .. ,....,,,,,,,,,,,,,,,.@@@&,,,,,,,,,,,/#//#%%%%%%%#%%%%#(((%&@&&%(*,***//////*******// ,***#((((. ..*,      ,*///
    ///***....,,,,,,,,,,,,,,,,,,,,,(/,*,.*#*#&%#*#%%%%%%%%%%%(//*%%%%%###((,,*/(((#(///****//,,.,##(((((((#%/      ,////
    ,***,.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,&(*#((#%%%%##(/**(#(//***,,****,**(((///******/,**.. .@#((.   *      .*///
    ,****.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*%%%((#%##((/**/%%*..,*,,,,.. .*///(((//******/,**.  /(**/&&#@.      .*///
..,,***,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,#%%#(##(((/*(%%%%#*,*,,,,,,,,,,(/(((///****//.((. .......,,**(.     .*///
.,,***,,..,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,****,,//##(((/####%&%(/**,.,,,****,,,.,******/*////,///******//(,     .*///
,,,,,,,,,.,,,,,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,*****(#((#(*.,,......              ,*******./***/***********//     .,/((
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,,,,**********/*//**/(((*,*,*(((#**,,,**,,****,,,,**,******,,,,,,,,,,**/      ./((
,,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*,**#%%%%#(/*,,,,,*******/*,,,,,,*******,,,,,,,,,,,,,*.    ../((
..,,,.............................,,,,,,,,,,,,,,,,,,,,,,,***/(#%%%%%%%(////**//***,,,,,.,,** .     ,,....,,,,,*   ...*((
..........,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,/*.  //***(#%%%%&%%%%%#////**,.....,,,,,          .,,...,,,  ....*(#
.......,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*********,*%,,      ***.,***(((((/(/*,,.... ....,,**,.             .  ./.  ....,(#
.....,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,*********(****//*.     ,****.  .....          ..,,,****,.                  ..,,//((##
,,,,,,,,,,,,,,,,,,,,,,,,,**************///**/***/*,**     .****/***,.......,,,,,,,,******,,                   .,*//*****
////(/***,,,,,.....                ./,*/*////////,,**,      */////***/******,***********,,.                    .**,/,,**
                              ,//(,////////*//((/,,****/,    */////*******,,*,***********,                     ..,*/*///
               ..          (/,*((///(//(///**/(/*,*/////(/. . **////****,**************,,                  ... ..,,**///
##%%%#%%%%%%##%#####%#%%#/(///* (#(/((((////////,**//((///*.   ,*/*/*********,********,.                   ,,******////*
######%%###((###(###%%((((((/(((**(///////////(/.*/////(///,.    .///****,,*********,..                 . ..*///(//(((/ 
                   ##(//(/(///*//*/(((/////*///(.*/*/((((/(/*.     .**************,,,                  ,,..,,////((/(/*.
                 %#(((((//////(//**/(/#((/**//(/,,/*/*////**,*..    .,,************,                  ..*,,***//((((((./
               #((##((///*(////((//*////**(//*#/*,**,,***,((**. .     ,.,,,,*,,,,                    .,,***/*(/(/((#(# /
.......       #(..((///(/(*/(/***/**///,/*////(***,***,,**///..  .                           .       ****//*//*//(((//,*
.. ......   .(((((/*//((*.,(///***/**/*,*//(/,(*,*,//,,*,*//**    .                                 .,/*/*(///(//(///.,*
........   .#(#((/(/////*//(.*/**, .,*,.**/*,.*.***,****,,///*...  .                                .*/****//(((//((/.**
......  ...%##(((((#(((/(////*(**.   ,.. //, /*.,*/ *,****/(/*, ,.  .                             ..,*//*/*////(#(/(/,*/
..   .....#(((((//(((((/(#///*/*//*      ,*  (, ./* ,*,,**/(***.,...                          .   .,,***/*****//#(///*,*
`

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

const AsciiPortrait = () => {
  // gsap.registerPlugin(TextPlugin)
  // useIsomorphicLayoutEffect(() => {
  //   const pin = gsap.to('.asciiportrait', {
  //     text: {
  //       value: asciiText,
  //     },
  //     duration: 60,
  //     ease: 'none',
  //   })
  //   return () => {
  //     pin.kill()
  //   }
  // }, [])

  return (
    <code className="text-[4.5px] text-[#00cc00] flex justify-center items-center">
      <pre className="asciiportrait w-[334px] leading-[7px] font-fira-code text-center">
        {asciiText}
      </pre>
    </code>
  )
}

export default AsciiPortrait
