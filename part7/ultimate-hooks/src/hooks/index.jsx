import {useState, useEffect} from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}
export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    useEffect(() => {
        axios
        .get(baseUrl)
        .then(response => {
            setResources(response.data)
        })
    }, [baseUrl])
    const create = async (resource) => {
        axios
        .post(baseUrl, resource)
        .then(response => {
            setResources(resources.concat(response.data))
        })
    }
    return [resources, { create }]
}