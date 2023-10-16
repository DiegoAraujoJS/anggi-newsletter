import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return (
    <div>
      <form className={`absolute top-1/3 left-1/3`} onSubmit={(e) => {
        e.preventDefault()
        // Save form value in localStorage as adminPassword.
        const value = e.target.password.value
        localStorage.setItem('adminPassword', value)
        // Redirect to Home
        router.push("/")
      }}>
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          <div className="mt-2">
            <input type="password" id="password" name="password" className="input input-bordered input-primary w-full" />
          </div>
        </div>
        <br/>
        <button type="submit" className="rounded-md bg-palette-1 px-3 py-2 text-sm text-palette-4 shadow-sm block">Ingresar</button>
      </form>
    </div>
  )
}
