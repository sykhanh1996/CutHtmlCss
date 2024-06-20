import { Input, InputProps } from 'antd'
import { useState } from 'react'
import _ from 'lodash'
import './index.css'

interface Props extends InputProps {
  label?: string
}

export default function FloatInput(props: Props) {
  const { label, placeholder, value, required } = props
  const [focus, setFocus] = useState(false)
  const isOccupied = focus || (value && value !== undefined)

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder'

  const requiredMark = required ? <span className='text-danger'>*</span> : null

  return (
    <div className='float-label' onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      <Input placeholder={placeholder} />
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  )
}
