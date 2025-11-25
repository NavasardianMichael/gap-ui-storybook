import { type FC, type DetailedHTMLProps, type HTMLAttributes, type PropsWithChildren, useState, useEffect } from 'react'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const CodeSnippet: FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(false)
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [isCopied])

    const handleCopy = () => {
        if (isCopied) return
        navigator.clipboard.writeText(children as string)
        setIsCopied(true)
    }

    return (
        <div {...rest} className="p-4 rounded-md bg-gray-100 relative border border-gray-300">
            <pre className='whitespace-pre-wrap wrap-break-word'>
                <code>
                    {children}
                </code>
            </pre>
            <button
                className={`w-fit absolute top-2 right-2 p-1 rounded-md bg-gray-200 ${isCopied ? 'cursor-not-allowed' : 'hover:cursor-pointer hover:bg-gray-300'}`}
                onClick={handleCopy}
                disabled={isCopied}
            >
                {!isCopied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                )}
            </button>
        </div>
    )
}