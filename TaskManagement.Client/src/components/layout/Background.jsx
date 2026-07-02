import React from 'react'

const Background = ({children}) => {
    return (
        <div className="relative min-h-screen w-screen bg-white overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
             radial-gradient(circle at top center, rgba(59, 130, 246, 0.5), transparent 70%)
           `,
                    backgroundColor: "ffffff",
                }}
            />

            <div className="relative z-10 ">
                {children}
            </div>
        </div>
    )
}

export default Background