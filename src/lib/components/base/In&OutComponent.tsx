import  {FC, forwardRef, Ref, useImperativeHandle, useState} from "react";

interface IInOutComponent {
    name: string;
    onButtonDown: (label: string) => void;
}

// usamos un function component
// https://stackoverflow.com/questions/62132089/react-fc-with-forwardedref
const InOutComponent: FC<IInOutComponent> = (_props: IInOutComponent, ref: Ref<unknown> | undefined) => {
    const {name, onButtonDown} = _props;
    const [label, setLabel] = useState(name);
    const onClickAction = () => {
        onButtonDown(label)
        setLabel(label)
    }
    useImperativeHandle(ref, () => ({
        modifyValue: (value: string) => {
            setLabel(value);
        },
    }), []);
    return (
        <div>
            <span>{label}</span>&#160;
            <button onClick={onClickAction}>
                Restart initial Value
            </button>
        </div>
    )
}

// @ts-ignore
export default forwardRef(InOutComponent);
