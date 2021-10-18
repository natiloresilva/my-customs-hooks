import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true)

    const [state, setstate] = useState({ data: null, loading: true, error: null })

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                //El useRef nos ayudará en este caso a saber si me componente está montado o no
                if (isMounted.current) {
                    setstate({
                        loading: false,
                        error: null,
                        data
                    })
                }

            })
            .catch(() => {
                setstate({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la información solicitada'
                })
            })
    }, [url])

    return state

}
