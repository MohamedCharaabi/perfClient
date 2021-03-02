import React from 'react'
import Select from 'react-select'

function CustomSelect({ style, label, onChange, options }) {
    return (
        <div>
            <Select options={options} onChange={onChange} />
        </div>
    )
}

export default CustomSelect
