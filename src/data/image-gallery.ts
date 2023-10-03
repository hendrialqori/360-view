type Image = {
  url: string;
  name: string;
  created_at: string | number;
  size: number
}

export const imageGallery: Image[] = [
  {
    url: '/images/4.jpeg',
    name: 'Shinta VR 1',
    created_at: Date.now(),
    size: 4 // in mega byte
  },
  {
    url: '/images/5.jpeg',
    name: 'Shinta VR 2',
    created_at: Date.now(),
    size: 5 // in mega byte
  }

  // {
  //   url: '/images/3.jpg',
  //   name: 'panorama-3',
  //   created_at: Date.now(),
  //   size: 6 // in mega byte
  // },
  // {
  //   url: '/images/1.jpg',
  //   name: 'panorama-1',
  //   created_at: Date.now(),
  //   size: 4 // in mega byte
  // }
]