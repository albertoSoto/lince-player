// import React from 'react';

interface HelloWorldProps {
    /** The text to display inside the button */
    title: string;
    /** Whether the button can be interacted with */
    disabled?: boolean;
}

export default function HelloWorldTS({ title }: HelloWorldProps) {
    return (
        <div>{title}</div>
    );
}
