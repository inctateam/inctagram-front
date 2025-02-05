import { ImageCarousel } from '@/shared/ui/carousel/image-carousel'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ImageCarousel> = {
  component: ImageCarousel,
  tags: ['autodocs'],
  title: 'UI/Carousel/ImageCarousel',
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div className={'w-full max-w-[500px]'}>
        <ImageCarousel
          images={[
            'https://i.pinimg.com/736x/82/15/f7/8215f7e50dd92c543f83932029fa0342.jpg',
            'https://i.pinimg.com/736x/55/1a/07/551a07dbeba44df28953f4d036b5587b.jpg',
            'https://i.pinimg.com/736x/14/23/94/142394fc0bca30ba9902dcd42fedec4a.jpg',
            'https://i.pinimg.com/736x/3d/eb/72/3deb728f1e0894f46c7a9432ea30d6da.jpg',
            'https://i.pinimg.com/736x/67/ba/f8/67baf8494f2ea679e24c4e3bf8969e1b.jpg',
          ]}
        />
      </div>
    )
  },
}
