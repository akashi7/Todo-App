/* eslint-disable react/prop-types */
import { useField } from 'formik'

export const InputText = ({ label, darkMode, placeholder, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <div className='relative z-0 flex flex-col gap-4'>
        <label
          className={`font-small ${darkMode ? ' text-white' : ' text-black'} `}
        >
          {label}
        </label>
        <input
          type='text'
          placeholder={placeholder}
          {...field}
          {...props}
          className='h-[50px] rounded-lg placeholder:px-3'
        />
      </div>
      {meta.touched && meta.error ? (
        <span className='error'>{meta.error}</span>
      ) : null}
    </>
  )
}
