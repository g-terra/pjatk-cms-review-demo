import { Alert } from "./alert";

export default function AlertWrapper({ children }) {
    return (
        <>
            <Alert />
            {children}
        </>
    )
}
