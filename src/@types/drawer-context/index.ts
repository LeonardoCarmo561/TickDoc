export interface DrawerOption {
  href: string
  icon: () => JSX.Element
  label: string
}

export interface DrawerContextData {
  isOpen: boolean
  toggleDrawerOpen: () => void
  drawerOptions: DrawerOption[]
  setDrawerOptions: (options: DrawerOption[]) => void
}
