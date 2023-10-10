import Barloader from 'react-spinners/BarLoader'

export const SuspenseLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Barloader color='blue' height={3} width={200}/>
    </div>
  )
}