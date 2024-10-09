import type { StoryObj } from '@storybook/react'

import { ReactNode } from 'react'

import * as FilledOutlinedPairsIconsSet from '@/assets/icons/components/filled-outlined-pairs'
import * as OtherIconsSet from '@/assets/icons/components/other'
import { GithubLogo } from '@/assets/icons/components/other'
import * as OutlinedIconsSet from '@/assets/icons/components/outlined'

const meta = {
  title: 'Iconography',
}

export default meta
type Story = StoryObj<typeof meta>

const IconsGallery = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className={'xl:max-w-screen-lg max-w-screen-md mx-auto'}>
      <h1 className={'border-b border-dark-100 pb-3'}>{title}</h1>
      <div className={'flex flex-wrap justify-around'}>{children}</div>
    </div>
  )
}

type SvgIconType = typeof GithubLogo

const IconItem = ({ icon: Icon, name }: { icon: SvgIconType; name: string }) => {
  return (
    <div className={'xl:basis-3/12 basis-3/6'}>
      <div className={'flex items-center p-3'}>
        <div
          className={
            'flex w-10 h-10 justify-center items-center border border-dark-100 rounded mr-2'
          }
        >
          <Icon className={'flex size-5'} />
        </div>
        <div className={'text-light-900 text-sm'}>{name}</div>
      </div>
    </div>
  )
}

export const FilledOutlinedPairs: Story = {
  render: () => {
    return (
      <IconsGallery title={'Filled Outlined Pairs'}>
        {Object.entries(FilledOutlinedPairsIconsSet).map(([name, Icon]) => (
          <IconItem icon={Icon} key={name} name={name} />
        ))}
      </IconsGallery>
    )
  },
}

export const OutlinedIcons: Story = {
  render: () => {
    return (
      <IconsGallery title={'Outlined Icons'}>
        {Object.entries(OutlinedIconsSet).map(([name, Icon]) => (
          <IconItem icon={Icon} key={name} name={name} />
        ))}
      </IconsGallery>
    )
  },
}

export const OtherIcons: Story = {
  render: () => {
    return (
      <IconsGallery title={'Other Icons'}>
        {Object.entries(OtherIconsSet).map(([name, Icon]) => (
          <IconItem icon={Icon} key={name} name={name} />
        ))}
      </IconsGallery>
    )
  },
}
