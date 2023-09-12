import {Ref, forwardRef, useImperativeHandle, useState} from "react";

interface ICustomComp {
    name: string;
}

const ChildForwardedComponent = (props: ICustomComp, ref: Ref<unknown> | undefined) => {
    const {name} = props;
    const [label, setLabel] = useState(name);
    useImperativeHandle(ref, () => ({
        sayHi: (value: string) => {
            setLabel(value);
        },
    }), []);

    return (
        <div>{label}</div>
    )
}

export default forwardRef(ChildForwardedComponent);
