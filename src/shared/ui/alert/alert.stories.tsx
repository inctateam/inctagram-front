import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/shared/ui'
import { Alert } from '@/shared/ui/'

const meta = {
  component: Alert,
  tags: ['autodocs'],
  title: 'UI/Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const SuccessAlert: Story = {
  args: {
    message: 'Your settings are saved',
    type: 'success',
  },
  render: args => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <>
        <Button
          onClick={() => {
            setShowAlert(true)
          }}
        >
          Show Alert
        </Button>
        {showAlert && (
          <Alert
            message={args.message}
            onClose={() => {
              setShowAlert(false)
            }}
            type={args.type}
          />
        )}
      </>
    )
  },
}

export const ErrorAlert: Story = {
  args: {
    message: 'Server is not available',
    type: 'error',
  },
  render: args => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <>
        <Button
          onClick={() => {
            setShowAlert(true)
          }}
        >
          Show Alert
        </Button>
        {showAlert && (
          <Alert
            message={args.message}
            onClose={() => {
              setShowAlert(false)
            }}
            type={args.type}
          />
        )}
      </>
    )
  },
}
export const AlertWithPositionCenter: Story = {
  args: {
    message: 'Server is not available',
    position: 'center',
    type: 'error',
  },
  render: args => {
    const [showAlert, setShowAlert] = useState(false)

    return (
      <>
        <Button
          onClick={() => {
            setShowAlert(true)
          }}
        >
          Show Alert
        </Button>
        {showAlert && (
          <Alert
            message={args.message}
            onClose={() => {
              setShowAlert(false)
            }}
            position={args.position}
            type={args.type}
          />
        )}
      </>
    )
  },
}
