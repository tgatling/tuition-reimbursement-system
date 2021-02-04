import { Component, ErrorInfo, ReactNode } from "react";
interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundaryComponent extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(err: Error): State {
        return { hasError: true, error: err };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public componentDidUpdate(previousProps: Props) {
        if (previousProps.children !== this.props.children) {
            this.setState({ hasError: false, error: null });
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>
                        {" "}
                        An error has occured, please contact support if this
                        persists.{" "}
                    </h1>
                    {this.state.error?.name + ": " + this.state.error?.message}
                </>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundaryComponent;
