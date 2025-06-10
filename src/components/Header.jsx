import logo from '../assets/images/logo.png'

export function Header () {

  return (
    <>
      <header className='flex items-center justify-center flex-col p-4 gap-3'>
        <img src={logo} alt="Dig Master Logo - Pixel ART" className='w-[15rem] h-auto' />
        <h1 className='px-4 py-1 bg-[#030712]/60 rounded-full border-2 border-cyan-800/50'>Made with ❤️ by REFH4CK</h1>
      </header>
    </>
  )
}

