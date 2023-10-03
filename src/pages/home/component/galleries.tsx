import React from 'react'
import { imageGallery } from '@/data/image-gallery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { type Image } from '@/types/image';
import { cn } from '@/utils/clsx';

type Props = {
  onClickImage: (data: Image) => void
}


export const Galleries = React.memo(({ onClickImage }: Props) => {
  return (
    <div className={cn(
      'mx-auto w-10/12 mt-10',
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2',
      'justify-items-center'
    )}>
      {imageGallery.map((image, i) => (
        <div key={i} className='overflow-hidden cursor-pointer' onClick={() => onClickImage(image)}>
          <LazyLoadImage
            src={image.url}
            alt='image-view'
            className='object-fill h-[350px] aspect-square'
            effect='blur'
          />
        </div>
      ))}
    </div>
  )
})