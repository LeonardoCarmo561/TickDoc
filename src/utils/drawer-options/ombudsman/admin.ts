import { DrawerOption } from '@/@types'
import {
  MdApartment,
  MdApps,
  MdCategory,
  MdContacts,
  MdDashboard,
  MdGavel,
  MdGroup,
  MdLan,
  MdLocationCity,
  MdManageAccounts,
  MdOndemandVideo,
  MdPinDrop,
  MdQuestionAnswer,
  MdSafetyDivider,
  MdSell,
  MdSubject,
  MdWrapText,
} from 'react-icons/md'

export function adminOptions(moduleTitle: string): DrawerOption[] {
  const options: DrawerOption[] = [
    {
      href: `/ombudsman/${moduleTitle}/dashboard`,
      icon: MdDashboard,
      label: 'Dashboard',
    },
    {
      href: `/ombudsman/${moduleTitle}/clients`,
      icon: MdApartment,
      label: 'Clientes',
    },
    {
      href: `/ombudsman/${moduleTitle}/managers`,
      icon: MdManageAccounts,
      label: 'Administradores',
    },
    {
      href: `/ombudsman/${moduleTitle}/icons`,
      icon: MdCategory,
      label: 'Ícones',
    },
    {
      href: `/ombudsman/${moduleTitle}/groupings`,
      icon: MdApps,
      label: 'Agrupamentos',
    },
    {
      href: `/ombudsman/${moduleTitle}/sectors`,
      icon: MdSafetyDivider,
      label: 'Setores',
    },
    {
      href: `/ombudsman/${moduleTitle}/subjects`,
      icon: MdSubject,
      label: 'Assuntos',
    },
    {
      href: `/ombudsman/${moduleTitle}/typologies`,
      icon: MdSell,
      label: 'Tipologias',
    },
    {
      href: `/ombudsman/${moduleTitle}/internalusers`,
      icon: MdGroup,
      label: 'Usuários Internos',
    },
    {
      href: `/ombudsman/${moduleTitle}/externalusers`,
      icon: MdContacts,
      label: 'Cidadãos',
    },
    {
      href: `/ombudsman/${moduleTitle}/questions`,
      icon: MdQuestionAnswer,
      label: 'Pesquisa de Satisfação',
    },
    {
      href: `/ombudsman/${moduleTitle}/states`,
      icon: MdPinDrop,
      label: 'Estados',
    },
    {
      href: `/ombudsman/${moduleTitle}/Cities`,
      icon: MdLocationCity,
      label: 'Cidades',
    },
    {
      href: `/ombudsman/${moduleTitle}/workfields`,
      icon: MdLan,
      label: 'Ramos de atividades',
    },
    {
      href: `/ombudsman/${moduleTitle}/slides`,
      icon: MdOndemandVideo,
      label: 'Slides',
    },
    {
      href: `/ombudsman/${moduleTitle}/legilsations`,
      icon: MdGavel,
      label: 'Legislações',
    },
    {
      href: `/ombudsman/${moduleTitle}/default-replies`,
      icon: MdWrapText,
      label: 'Respostas Pré Definidas',
    },
  ]

  return options
}
