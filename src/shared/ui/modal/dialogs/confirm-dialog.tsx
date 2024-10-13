import { Button, Modal, ModalProps } from '@/shared/ui'
import { DialogBody } from '@/shared/ui/modal/dialog-body'
import { DialogHeaderTitle } from '@/shared/ui/modal/dialog-header-title'

export type DialogProps = {
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
  title: string
} & Omit<ModalProps, 'closePosition'>
export const ConfirmDialog = ({
  cancelText = 'No',
  children,
  confirmText = 'Yes',
  onCancel,
  onConfirm,
  ...modalProps
}: DialogProps) => {
  return (
    <Modal {...modalProps}>
      <DialogHeaderTitle>Lorem </DialogHeaderTitle>
      <DialogBody className={'px-6 pt-7 pb-6'}>
        {children}
        <div className={'pt-7 flex justify-end space-x-6'}>
          <Button onClick={onConfirm} variant={'outline'}>
            {confirmText}
          </Button>
          <Button onClick={onCancel} variant={'primary'}>
            {cancelText}
          </Button>
        </div>
      </DialogBody>
    </Modal>
  )
}
