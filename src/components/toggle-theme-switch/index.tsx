'use client'
import { BsMoonStars, BsSun } from 'react-icons/bs'

import { useThemeContext } from '@/utils/hooks/use-theme-context'

export function ToggleThemeSwitch() {
  const { themeName, toggleTheme } = useThemeContext()

  return (
    <label className="relative flex bg-zinc-200 dark:bg-zinc-700 cursor-pointer w-[56px] h-6 rounded-3xl items-center focus:ring-1">
      <input
        type="checkbox"
        onChange={toggleTheme}
        className="opacity-0 h-0 w-0"
      />
      <span className="flex justify-center items-center text-black dark:text-white rounded-full bg-blue-500 left-0 dark:translate-x-[26px] dark:bg-blue-950 h-[30px] w-[30px] dark:translat absolute transition-all">
        {themeName === 'dark' ? <BsMoonStars /> : <BsSun />}
      </span>
    </label>
  )
}
