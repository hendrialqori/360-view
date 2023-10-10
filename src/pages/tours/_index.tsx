import React from 'react'
import { Layout } from "@/components/layout/_index";
import { useGetTours } from "@/api/services/tour";
import { Filtering } from "./component/filtering";
import { TableData } from "./component/table-data";
import { useDebounce } from "@/hooks/use-debounce";
import { Pagination } from './component/pagination';
import BarLoader from 'react-spinners/BarLoader'
import { cn } from '@/utils/clsx';

export default function Tours() {

  const { data: tours, status: toursStatus, refetch: tourRefetch } = useGetTours()

  const [search, setSearch] = React.useState('')

  const searchDebounce = useDebounce(search, 1000)

  const [row, setRow] = React.useState(10)

  const [rowInfo, setRowInfo] = React.useState({
    start: 0,
    end: 0,
    length: 0,
  })

  const [page, setPage] = React.useState(1)

  const toursFiltered = React.useMemo(() => {
    return tours?.data?.filter(
      (tour) => tour.name.toLowerCase()
        .includes(searchDebounce.toLowerCase())
    )
  }, [searchDebounce, tours?.data])

  const toursMemoize = React.useMemo(() => {
    let startIndex: number;
    let lastIndex: number;

    if (searchDebounce.length) {
      startIndex = (page - 1) * row
      lastIndex = startIndex + row

      setRowInfo({
        start: !toursFiltered?.length ? 0 : startIndex + 1,
        end: lastIndex > (toursFiltered?.length ?? 0)
          ? (toursFiltered?.length ?? 0) : lastIndex,
        length: (toursFiltered?.length ?? 0)
      })
    } else {
      startIndex = (page - 1) * row
      lastIndex = startIndex + row
      setRowInfo({
        start: startIndex + 1,
        end:
          lastIndex > (tours?.data.length ?? 0)
            ? tours?.data.length ?? 0
            : lastIndex,
        length: tours?.data.length ?? 0,
      })
    }

    return toursFiltered?.slice(startIndex, lastIndex)

  }, [searchDebounce.length, toursFiltered, page, row, tours?.data.length])

  const handleChangeRow = React.useCallback((newRow: number) => {
    setRow(newRow)
    setPage(1)
  }, [])

  const handleChangeSearch =
    React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
      setPage(1)
    }, [])


  return (
    <Layout>
      <div className="mx-5 my-4">
        {toursStatus === 'loading' // => when loading
          ? (
            <div className='h-[calc(100vh_-_100px)] flex justify-center items-center'>
              <div className='w-max mx-auto p-2' aria-label='groups-loader'>
                <BarLoader color='blue' width={200} height={3} />
                <p className='text-sm md:text-base mt-2 text-gray-500 text-center'>Mengambil data tour ...</p>
              </div>
            </div>

          )
          : null}

        {toursStatus === 'success' ?
          toursMemoize?.length === 0 ?
            (
              <div className='py-10'>
                <p className='text-center text-lg font-light'>Tidak ada data</p>
              </div>
            )
            :
            (
              // => when success
              <>
                <Filtering
                  row={row}
                  onChangeRow={handleChangeRow}
                  onChangeSearch={handleChangeSearch}
                />
                <TableData
                  data={toursMemoize ?? []}
                />
                <Pagination
                  page={page}
                  row={row}
                  rowInfo={rowInfo}
                  onSetPage={setPage}
                  data={searchDebounce ? toursFiltered : tours?.data}
                />

              </>
            ) : null}

        {
          toursStatus === 'error' // => when error
            ? (
              <div className='h-[calc(100vh_-_100px)] flex justify-center items-center'>
                <div className='w-max mx-auto my-4 flex flex-col items-center justify-center gap-3'>
                  <p className='text-sm md:text-base mt-2 text-gray-500'>Gagal mengambil data tour</p>
                  <button
                    className={cn(
                      "transition px-5 md:px-7 py-[.30rem] md:py-[.35rem] text-base border md:border-2 border-[#1F3DBD] bg-white rounded-md text-[#1F3DBD]",
                      'text-sm md:text-base'
                    )}
                    type="button"
                    onClick={() => tourRefetch()}
                  >
                    Muat ulang
                  </button>
                </div>
              </div>

            )
            : null
        }
      </div>
    </Layout>
  )
}