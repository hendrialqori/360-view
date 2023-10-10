import React from 'react'
import { cn } from '@/utils/clsx'

type Props = {
  data: unknown[] | undefined
  row: number
  page: number
  rowInfo: {
    start: number
    end: number
    length: number
  }
  onSetPage: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: React.FC<Props> = ({
  data,
  row,
  page,
  rowInfo,
  onSetPage,
}) => {

  const totalPage = React.useMemo(() => {
    const arr = [...Array(Math.ceil((data?.length ?? 1)/ row))].map((_, i) => {
      return i + 1
    })

    return arr
  }, [data?.length, row])

  const maxCountPageAppearce =
    Math.ceil((data?.length  ?? 1) / row) > 5 ? 5 : Math.ceil((data?.length  ?? 1) / row)

  const pages = [...Array(maxCountPageAppearce)].map((_, i) => {
    return i + Math.max(page - Math.floor(maxCountPageAppearce / 2), 1)
  })

  const moveToTargetPage = (page: number) => () =>  onSetPage(page)

  const prevPage = () =>  onSetPage((prev) => Math.max(1, prev - 1))

  const nextPage = () =>  onSetPage((prev) => Math.min(prev + 1, totalPage.length))

  const renderPageNumbers = pages.map((pageNumber) => {
    if (pageNumber <= totalPage.length) {
      return (
        <button
          key={pageNumber}
          className={cn(
            'font-normal tracking-wide rounded-md w-10 text-sm md:text-base',
            page === pageNumber
              ? 'text-white border bg-blue-500 h-[2.1rem]'
              : 'text-blue-500 border border-blue-500 h-9'
          )}
          onClick={moveToTargetPage(pageNumber)}
        >
          {pageNumber}
        </button>
      )
    }
  })

  return (
    <div className='flex flex-col md:flex-row items-center justify-between gap-y-4 mt-8 md:mt-4'>
      <div aria-label="information">
        <p className="text-sm md:text-base">
          Menampilkan {rowInfo?.start} sampai {rowInfo?.end} dari{' '}
          {rowInfo?.length} masukan
        </p>
      </div>
      <div
        className="flex items-center gap-3 tracking-wide text-sm md:text-base"
        aria-label="pagination-button"
      >
        <button
          onClick={prevPage}
          className={cn(
            'text-gray-500 bg-gray-100 py-2 px-4 rounded-lg',
            page === 1 && 'cursor-not-allowed'
          )}
        >
          Sebelumnya
        </button>
        {renderPageNumbers}
        <button
          onClick={nextPage}
          className={cn(
            'text-gray-500 bg-gray-100 py-2 px-4 rounded-lg',
            page === totalPage.length && 'cursor-not-allowed'
          )}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  )
}
