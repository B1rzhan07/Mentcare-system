import React from "react";
export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] =
    React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "minLength":
                    if (value.length < validations[validation]) {
                        setMinLengthError(true);
                        setError(true);
                    } else {
                        setError(false);
                        setMinLengthError(false);
                    }
                    break;
                case "isEmpty":
                    if (value) {
                        setEmpty(false);
                        setError(false);

                    } else {
                        setEmpty(true);
                        setError(true);
                    }
                    break;
                default:
                    break;
            }
        }
    }, [value, validations]);
    return {
        isEmpty,
        minLengthError,
        error,
    };
};

export const useInput = (initialValue, validations) => {
    const [value, setValue] = React.useState(initialValue);
    const [dirty, setDirty] = React.useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    function onBlur(e) {
        setDirty(true);
    }
    return {
        value,
        onChange,
        onBlur,
        ...valid,
        dirty,

    };
};