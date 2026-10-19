export default function DropDown(props) {
    return (
        <select 
            name={props.name} id={props.id } 
            value={props.ddVal || "INR"}
            onChange={props.onChange}
        >
            {props.array && props.array.map(([code, name], index) => (
                <option key={index} value={code}>
                    {code} - {name}
                </option>
            ))}
        </select>
    );
}