export default function Header() {
  return (
    <header className='z-40'>
      <div className='shadow-sm'>
        <div className='container mx-auto px-6 py-3'>
          <div className='flex items-center justify-between'>
            <div className='hidden w-full text-gray-600 md:flex md:items-center'></div>
            <div className='w-full text-gray-700 md:text-center text-2xl font-semibold'>
              Chat App
            </div>
            <div className='flex items-center justify-end w-full'>
              <button className='text-gray-600 focus:outline-none mx-4 sm:mx-0'></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
