import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useGetImages } from '@/api/services/image';

import { type Image } from '@/types/image';
import { cn } from '@/utils/clsx';

type Props = {
  onClickImage: (data: Image) => void
}

const ORIGIN = import.meta.env.VITE_ORIGIN;

export const Galleries = React.memo(({ onClickImage }: Props) => {

  const { data: images } = useGetImages()

  return (
    <div className={cn(
      'mx-5 mt-10',
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2',
      'justify-items-center'
    )}>
      {images?.data.map((image, i) => (
        <div
          key={i}
          className='overflow-hidden cursor-pointer border rounded-md'
          onClick={() => onClickImage(image)}
        >
          <LazyLoadImage
            src={ORIGIN + image?.thumbnail_path}
            // src='/images/5.jpeg'
            alt='image-view'
            className='object-fill h-[390px] aspect-square'
            effect='blur'
          />
        </div>
      ))}
    </div>
  )
})