import { type FC, type HTMLAttributes, type PropsWithChildren } from 'react'

type Props = HTMLAttributes<HTMLButtonElement>

export const Button: FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
    return (
        <button  {...rest}>
            {children}
        </button>
    )
}