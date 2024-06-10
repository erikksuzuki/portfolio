/**
 * @desc The 'useResponsive()' hook is used to get the current
 *       screen breakpoint based on the TailwindCSS config.
 *
 * @usage
 *    import { useResponsive } from "@/hooks/useResponsive";
 *
 *    const { isAboveSm, isBelowSm, sm } = useResponsive("sm");
 *    console.log({ isAboveSm, isBelowSm, sm });
 *
 *    const { isAboveMd } = useResponsive("md");
 *    const { isAboveLg } = useResponsive("lg");
 *    const { isAbove2Xl } = useResponsive("2xl");
 *    console.log({ isAboveMd, isAboveLg, isAbove2Xl });
 *
 * @see https://stackoverflow.com/a/76630444/6543935
 * @requirements npm install react-responsive
 */
import { useMediaQuery } from 'react-responsive'
import resolveConfig from 'tailwindcss/resolveConfig'
import { Config } from 'tailwindcss/types/config'

const tailwindConfig = require('../../tailwind.config')

const fullConfig = resolveConfig(tailwindConfig as unknown as Config)

const breakpoints = fullConfig?.theme?.screens || {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
}

export function useResponsive<K extends string>(breakpointKey: K) {
  const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints]
  const bool = useMediaQuery({
    query: `(max-width: ${breakpointValue})`,
  })
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1)

  type KeyAbove = `isAbove${Capitalize<K>}`
  type KeyBelow = `isBelow${Capitalize<K>}`

  return {
    [breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
    [`isAbove${capitalizedKey}`]: !bool,
    [`isBelow${capitalizedKey}`]: bool,
  } as Record<K, number> & Record<KeyAbove | KeyBelow, boolean>
}
