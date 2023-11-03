import { DrawerOption } from '@/@types'
import {
  MdDashboard,
  MdApartment,
  MdMapsUgc,
  MdManageAccounts,
  MdApps,
  MdSafetyDivider,
  MdSubject,
  MdSell,
  MdGroup,
  MdContacts,
  MdQuestionAnswer,
  MdOndemandVideo,
  MdWrapText,
  MdCategory,
  MdLan,
} from 'react-icons/md'

export function adminOptions(moduleTitle: string): DrawerOption[] {
  const options: DrawerOption[] = [
    {
      href: `/customer-service/${moduleTitle}/dashboard`,
      icon: MdDashboard,
      label: 'Dashboard',
    },
    {
      href: `/customer-service/${moduleTitle}/clients`,
      icon: MdApartment,
      label: 'Clientes',
    },
    {
      href: `/customer-service/${moduleTitle}/modules`,
      icon: MdMapsUgc,
      label: 'Módulos S.A.C',
    },
    {
      href: `/customer-service/${moduleTitle}/managers`,
      icon: MdManageAccounts,
      label: 'Administradores',
    },
    {
      href: `/customer-service/${moduleTitle}/groupings`,
      icon: MdApps,
      label: 'Agrupamentos',
    },
    {
      href: `/customer-service/${moduleTitle}/sectors`,
      icon: MdSafetyDivider,
      label: 'Setores',
    },
    {
      href: `/customer-service/${moduleTitle}/subjects`,
      icon: MdSubject,
      label: 'Assuntos',
    },
    {
      href: `/customer-service/${moduleTitle}/categories`,
      icon: MdSell,
      label: 'Categorias',
    },
    {
      href: `/customer-service/${moduleTitle}/users`,
      icon: MdGroup,
      label: 'Perfis',
    },
    {
      href: `/customer-service/${moduleTitle}/externalusers`,
      icon: MdContacts,
      label: 'Cidadãos',
    },
    {
      href: `/customer-service/${moduleTitle}/questions`,
      icon: MdQuestionAnswer,
      label: 'Pesquisa de Satisfação',
    },
    {
      href: `/customer-service/${moduleTitle}/slides`,
      icon: MdOndemandVideo,
      label: 'Slides',
    },
    {
      href: `/customer-service/${moduleTitle}/default-replies`,
      icon: MdWrapText,
      label: 'Respostas Pré Definidas',
    },
    {
      href: `/customer-service/${moduleTitle}/icons`,
      icon: MdCategory,
      label: 'Ícones',
    },
    {
      href: `/customer-service/${moduleTitle}/workfields`,
      icon: MdLan,
      label: 'Ramos de atividades',
    },
  ]

  return options
}
