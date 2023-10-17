import React from 'react'
import { Layout } from "@/components/layout/_index"
import { Galleries } from "./component/galleries"
import { type Image } from "@/types/image"
import { ModalShowImage } from './component/modal-show-image'

export default function Home() {

  const [image, setImage] = React.useState<Image | null>(null)

  const [modalImage, setModalImage] = React.useState(false)

  const showModalImage = React.useCallback((data: Image) => {
    setImage(data)
    setModalImage(true)
  }, [])

  const onClose = () => {
    setImage(null)
    setModalImage(false)
  }

  return (
    <>
      <Layout>
        <Galleries onClickImage={showModalImage} />
      </Layout>

      <ModalShowImage
        isShow={modalImage}
        image={image as Image}
        onClose={onClose}
      />
    </>
  )
}