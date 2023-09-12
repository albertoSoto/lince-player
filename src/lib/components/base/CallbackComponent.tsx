import {FC} from "react";
interface ICustomComp {
    name: string;
    // definimos method con TS params. Puede devolver valor
    onExportMethod: (action: string) => void;
}

// usamos un function component
// https://stackoverflow.com/questions/62132089/react-fc-with-forwardedref
const CallbackComponent: FC<ICustomComp> = (props) => {
    // lo traemos de la interfaz
    const {name, onExportMethod} = props;
    const handleState = () => {
        // ejecutamos el callback
        onExportMethod("Toma jeroma");
    }
    return (
        <div>
            <button onClick={handleState}>{name}</button>
        </div>
    )
}

export default CallbackComponent;
