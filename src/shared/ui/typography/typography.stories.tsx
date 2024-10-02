import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './index'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'UI/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'h3',
  },
}

export const Regular_text_16: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'regular_text_16',
  },
}

export const Bold_text_16: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'bold_text_16',
  },
}

export const Regular_text_14: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'regular_text_14',
  },
}

export const Medium_text_14: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'medium_text_14',
  },
}

export const Bold_text_14: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'bold_text_14',
  },
}

export const Small_text: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'small_text',
  },
}

export const Semi_bold_small_text: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    variant: 'semi_bold_small_text',
  },
}

export const Regular_link: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    href: 'google.com',
    variant: 'regular_link',
  },
}

export const Small_link: Story = {
  args: {
    children: (
      <>
        Carosserie Test Zürich
        <br /> Stauffacherstrasse 31
        <br /> 8004 Zürich, ZH, CH
      </>
    ),
    href: 'google.com',
    variant: 'small_link',
  },
}
