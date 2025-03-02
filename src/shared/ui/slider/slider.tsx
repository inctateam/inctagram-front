import * as SliderPrimitive from '@radix-ui/react-slider'

type Props = {
  setZoom: (zoom: number) => void
  zoom: number
}

export const Slider = ({ setZoom, zoom }: Props) => (
  <SliderPrimitive.Root
    className={'cursor-pointer select-none relative flex items-center w-[100px] h-[20px]'}
    max={150}
    min={50}
    onValueChange={values => setZoom(values[0] / 50)}
    step={1}
    value={[zoom * 50]}
  >
    <SliderPrimitive.Track className={'relative flex-grow h-[2px] bg-light-100 rounded-full'}>
      <SliderPrimitive.Range className={'absolute h-full bg-accent-500 rounded-full'} />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb
      aria-label={'Zoom'}
      className={'block w-[12px] h-[12px] bg-light-100 border-[3px] border-accent-500 rounded-full'}
    />
  </SliderPrimitive.Root>
)
