import React from 'react'
import * as Recoil from 'recoil'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useSearchParams } from 'react-router-dom';
import { scene } from '@/store/scene';
import { useDeleteHotspot, useUpdateHotspot } from '@/api/services/hostspot';
import { successToaster } from '@/components/toaster/success-toaster';
import { errorToaster } from '@/components/toaster/error-toaster';

type Props = {
  hotspotInfoId: string | null;
  text: string
  coordinateX: number;
  coordinateY: number;
  onClose: () => void
}

export const ModalInfo = ({ hotspotInfoId, text, coordinateX, coordinateY, onClose }: Props) => {

  const [query] = useSearchParams()

  const { mutate: updateHostpot } = useUpdateHotspot()

  const [sceneAtom, setSceneAtom] = Recoil.useRecoilState(scene)

  const [information, setInformation] = React.useState(text)

  React.useEffect(() => {
    setInformation(text)
  }, [text])

  const hostspotText = React.useMemo(() => {
    const temp = sceneAtom.find((scene) => scene.id === query.get('sceneId'))

    const hostpot = temp?.hotSpots.find((hp) => hp.id === hotspotInfoId)

    return hostpot?.text

  }, [hotspotInfoId, query, sceneAtom])


  const handleDelete = () => {
    const ask = confirm('Yakin menghapus ?')

    if (ask) {
      setSceneAtom(prev => {
        return prev.map((scene => ({
          ...scene,
          hotSpots: scene.hotSpots.filter((hp) => hp.id !== hotspotInfoId)
        })))
      })
      onClose()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInfoText(e.target.value)

    setSceneAtom(prev => {
      return prev.map((scene => ({
        ...scene,
        hotSpots: scene.hotSpots.map((hp) =>
          hp.id === hotspotInfoId ? {
            ...hp,
            text: e.target.value
          } : hp
        )
      })))
    })
  }

  const handleUpdateHotspot = () => {

    const formData = new FormData()
    formData.append('text', information)
    formData.append('_method', 'PUT')

    updateHostpot({
      hostpot_id: Number(hotspotInfoId),
      payload: formData
    },
      {
        onSuccess: () => {
          successToaster({ message: 'Berhasil update hotspot' })
          onClose()
        },
        onError: () => {
          errorToaster({ message: 'Gagal update hotspot' })
          onClose()
        }
      }
    )
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        zIndex: '1000',
        left: coordinateX + 30,
        top: coordinateY + 10
      }}
      className="bg-white/90 rounded-md p-3"
    >
      <div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="information-text" className='font-medium'>Information text</label>
          <input
            id='information-text'
            type="text"
            className='rounded-md'
            value={information}
            onChange={(e) => setInformation(e.target.value)}
          />
        </div>
        <div className='mt-2 flex justify-end gap-x-3'>
          <button
            type='button'
            onClick={handleUpdateHotspot}
          >
            Save
          </button>
          <button
            type='button'
            className='w-max'
            onClick={handleDelete}
          >
            <BsFillTrash3Fill className="text-xl" />
          </button>
        </div>

      </div>
    </div>
  )
}