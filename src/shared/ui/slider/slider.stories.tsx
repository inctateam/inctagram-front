import { useState } from 'react'

import { Slider } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Slider> = {
  args: {},
  component: Slider,
  tags: ['autodocs'],
  title: 'UI/Slider',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [zoom, setZoom] = useState(1)

    return <Slider setZoom={setZoom} zoom={zoom} />
  },
}
